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
    `import { isBan, isIdCardNumber } from 'taiwan-id-validator'\n\nif (!isBan('04595257') || !isIdCardNumber('A123456789')) process.exit(1)\n`
  )
  execFileSync(process.execPath, ['esm.mjs'], {
    cwd: consumerDirectory,
    stdio: 'inherit'
  })

  await writeFile(
    join(consumerDirectory, 'cjs.cjs'),
    `const { isBan, isIdCardNumber } = require('taiwan-id-validator')\nconst pkg = require('taiwan-id-validator/package.json')\n\nif (!isBan('04595257') || !isIdCardNumber('A123456789') || pkg.name !== 'taiwan-id-validator') process.exit(1)\n`
  )
  execFileSync(process.execPath, ['cjs.cjs'], {
    cwd: consumerDirectory,
    stdio: 'inherit'
  })

  await writeFile(
    join(consumerDirectory, 'types.ts'),
    `import { isBan, type IdCardValidationOptions } from 'taiwan-id-validator'\n\nconst options: IdCardValidationOptions = { nationalId: true }\nconst valid: boolean = isBan('04595257')\nvoid options\nvoid valid\n`
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
    `import { isBan, type BanValidationOptions } from 'taiwan-id-validator'\n\nconst options: BanValidationOptions = { applyOldRules: true }\nconst valid: boolean = isBan('04595257', options)\nvoid valid\n`
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
    !globalContext.taiwanIdValidator.isBan('04595257')
  ) {
    throw new Error('Browser bundle does not expose taiwanIdValidator')
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

  if (typeof amdExports?.isBan !== 'function' || !amdExports.isBan('04595257')) {
    throw new Error('Browser UMD bundle does not support AMD loading')
  }
} finally {
  if (tarball) await rm(tarball, { force: true })
  if (consumerDirectory) {
    await rm(consumerDirectory, { recursive: true, force: true })
  }
}
