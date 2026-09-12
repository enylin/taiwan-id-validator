import { execFileSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createContext, runInContext } from 'node:vm'

const root = resolve(import.meta.dirname, '..')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const tsc = resolve(
  root,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'tsc.cmd' : 'tsc'
)

let tarball
let consumerDirectory

try {
  const packOutput = JSON.parse(
    execFileSync(npm, ['pack', '--json', '--ignore-scripts'], {
      cwd: root,
      encoding: 'utf8'
    })
  )

  const packResult = Array.isArray(packOutput)
    ? packOutput[0]
    : (packOutput['taiwan-id-validator'] ?? Object.values(packOutput)[0])

  if (!packResult) throw new Error('npm pack returned no package metadata')

  tarball = resolve(root, packResult.filename)

  const packedPaths = new Set(packResult.files.map(file => file.path))
  const requiredFiles = [
    'dist/index.js',
    'dist/index.cjs',
    'dist/index.d.ts',
    'dist/cjs/index.d.cts',
    'dist/validation-result.d.ts',
    'dist/cjs/validation-result.d.cts',
    'dist/index.global.min.js',
    'docs/specification-sources.md',
    'CHANGELOG.md',
    'README.md',
    'LICENSE'
  ]

  for (const path of requiredFiles) {
    if (!packedPaths.has(path)) {
      throw new Error(`Published package is missing ${path}`)
    }
  }

  if ([...packedPaths].some(path => path.startsWith('src/'))) {
    throw new Error('Published package must not contain source files')
  }

  if (
    [...packedPaths].some(
      path => path.startsWith('dist/cjs/') && path.endsWith('.d.ts')
    )
  ) {
    throw new Error('CommonJS declarations must use the .d.cts extension')
  }

  consumerDirectory = await mkdtemp(join(tmpdir(), 'taiwan-id-validator-'))

  await writeFile(
    join(consumerDirectory, 'package.json'),
    JSON.stringify({ name: 'package-smoke-test', private: true, type: 'module' })
  )

  execFileSync(npm, ['install', '--ignore-scripts', tarball], {
    cwd: consumerDirectory,
    stdio: 'inherit'
  })

  await writeFile(
    join(consumerDirectory, 'esm.mjs'),
    `import { isBan, isIdCardNumber, validateBan, validateCdcNumber, validateDonateCode, validateMobileBarcode, validateIdCardNumber } from 'taiwan-id-validator'\n\nconst detailedValidators = [validateBan, validateCdcNumber, validateDonateCode, validateMobileBarcode, validateIdCardNumber]\nif (!isBan('04595257') || !isIdCardNumber('A123456789') || !detailedValidators.every(value => typeof value === 'function') || !validateBan('04595252').valid) process.exit(1)\n`
  )
  execFileSync(process.execPath, ['esm.mjs'], {
    cwd: consumerDirectory,
    stdio: 'inherit'
  })

  await writeFile(
    join(consumerDirectory, 'cjs.cjs'),
    `const { isBan, isIdCardNumber, validateBan } = require('taiwan-id-validator')\nconst pkg = require('taiwan-id-validator/package.json')\n\nif (!isBan('04595257') || !isIdCardNumber('A123456789') || validateBan('12345678').reason !== 'INVALID_CHECKSUM' || pkg.name !== 'taiwan-id-validator') process.exit(1)\n`
  )
  execFileSync(process.execPath, ['cjs.cjs'], {
    cwd: consumerDirectory,
    stdio: 'inherit'
  })

  await writeFile(
    join(consumerDirectory, 'types.ts'),
    `import { validateBan, type BanValidationFailureReason, type BanValidationResult, type IdCardValidationOptions } from 'taiwan-id-validator'\n\nconst options: IdCardValidationOptions = { nationalId: true }\nconst result: BanValidationResult = validateBan('12345678')\nif (!result.valid) {\n  const reason: BanValidationFailureReason = result.reason\n  void reason\n}\nvoid options\n`
  )
  execFileSync(
    tsc,
    [
      '--noEmit',
      '--strict',
      '--target',
      'ES2022',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      'types.ts'
    ],
    { cwd: consumerDirectory, stdio: 'inherit' }
  )

  await writeFile(
    join(consumerDirectory, 'types.cts'),
    `import { validateIdCardNumber, type IdCardCategory, type IdCardValidationResult } from 'taiwan-id-validator'\n\nconst result: IdCardValidationResult = validateIdCardNumber('A123456789')\nif (result.valid) {\n  const category: IdCardCategory = result.category\n  void category\n}\n`
  )
  execFileSync(
    tsc,
    [
      '--noEmit',
      '--strict',
      '--target',
      'ES2022',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      'types.cts'
    ],
    { cwd: consumerDirectory, stdio: 'inherit' }
  )

  const browserBundle = await readFile(
    resolve(root, 'dist/index.global.min.js'),
    'utf8'
  )

  const globalContext = {}
  createContext(globalContext)
  runInContext(browserBundle, globalContext)

  if (
    typeof globalContext.taiwanIdValidator?.isBan !== 'function' ||
    typeof globalContext.taiwanIdValidator?.validateBan !== 'function' ||
    !globalContext.taiwanIdValidator.isBan('04595257') ||
    !globalContext.taiwanIdValidator.validateBan('04595252').valid
  ) {
    throw new Error('Browser bundle does not expose detailed validation')
  }

  let amdExports
  const amdContext = {
    define(dependencies, factory) {
      const exports = {}
      if (!Array.isArray(dependencies) || dependencies[0] !== 'exports') {
        throw new Error('Unexpected AMD dependency list')
      }
      factory(exports)
      amdExports = exports
    }
  }
  amdContext.define.amd = {}
  createContext(amdContext)
  runInContext(browserBundle, amdContext)

  if (
    typeof amdExports?.isBan !== 'function' ||
    typeof amdExports?.validateBan !== 'function' ||
    !amdExports.isBan('04595257') ||
    amdExports.validateBan('12345678').reason !== 'INVALID_CHECKSUM'
  ) {
    throw new Error('Browser UMD bundle does not support detailed AMD loading')
  }
} finally {
  if (tarball) await rm(tarball, { force: true })
  if (consumerDirectory) {
    await rm(consumerDirectory, { recursive: true, force: true })
  }
}
