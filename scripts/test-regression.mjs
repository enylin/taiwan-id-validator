import { execFileSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const baselinePackage = 'taiwan-id-validator@2.0.0'
const regressionValidators = new Set([
  'isBan',
  'isCdcNumber',
  'isDonateCode',
  'isMobileBarcode',
  'isIdCardNumber'
])
const approvedDeltas = JSON.parse(
  await readFile(resolve(root, 'scripts/regulatory-deltas.json'), 'utf8')
)

validateApprovedDeltas(approvedDeltas)

let baselineDirectory

try {
  baselineDirectory = await mkdtemp(join(tmpdir(), 'taiwan-id-validator-v2-baseline-'))
  await writeFile(
    join(baselineDirectory, 'package.json'),
    JSON.stringify({ name: 'taiwan-id-validator-regression-baseline', private: true })
  )

  // Keep the published baseline outside this repository's dependency graph
  // instead of adding a self-referencing devDependency alias. The trade-off is
  // one registry lookup on each regression run in exchange for a simpler lockfile.
  execFileSync(
    npm,
    [
      'install',
      '--ignore-scripts',
      '--no-package-lock',
      '--no-save',
      baselinePackage
    ],
    { cwd: baselineDirectory, stdio: 'inherit' }
  )

  const current = await import(pathToFileURL(resolve(root, 'dist/index.js')).href)
  const baseline = await import(
    pathToFileURL(
      resolve(
        baselineDirectory,
        'node_modules/taiwan-id-validator/dist/index.js'
      )
    ).href
  )

  const matchedDeltaIds = new Set()
  const unexpectedDifferences = []

  function compare(validator, input, options) {
    const baselineValue = baseline[validator](input, options)
    const currentValue = current[validator](input, options)

    if (baselineValue === currentValue) return

    const context = {
      validator,
      input,
      options,
      baseline: baselineValue,
      current: currentValue
    }

    const approved = approvedDeltas.find(delta => matchesDelta(delta, context))
    if (approved) {
      matchedDeltaIds.add(approved.id)
      return
    }

    if (unexpectedDifferences.length < 20) unexpectedDifferences.push(context)
  }

  for (const input of generateBanInputs()) {
    compare('isBan', input)
    compare('isBan', input, { applyOldRules: false })
    compare('isBan', input, { applyOldRules: true })
  }

  for (const input of generateCdcInputs()) compare('isCdcNumber', input)
  for (const input of generateDonateCodeInputs()) compare('isDonateCode', input)
  for (const input of generateMobileBarcodeInputs()) {
    compare('isMobileBarcode', input)
  }

  const idOptions = generateIdCardOptions()
  if (idOptions.length !== 765) {
    throw new Error(`Expected 765 ID option configurations, got ${idOptions.length}`)
  }

  for (const input of generateIdCardInputs(baseline.isIdCardNumber)) {
    for (const options of idOptions) {
      compare('isIdCardNumber', input, options)
    }
  }

  const staleDeltas = approvedDeltas.filter(delta => !matchedDeltaIds.has(delta.id))
  if (staleDeltas.length > 0) {
    throw new Error(
      `Approved regulatory deltas did not match the regression corpus: ${staleDeltas
        .map(delta => delta.id)
        .join(', ')}`
    )
  }

  if (unexpectedDifferences.length > 0) {
    throw new Error(
      `Unexpected behavioral differences from ${baselinePackage}:\n${JSON.stringify(
        unexpectedDifferences,
        null,
        2
      )}`
    )
  }
} finally {
  if (baselineDirectory) {
    await rm(baselineDirectory, { recursive: true, force: true })
  }
}

function validateApprovedDeltas(deltas) {
  if (!Array.isArray(deltas)) {
    throw new Error('scripts/regulatory-deltas.json must contain an array')
  }

  const seenIds = new Set()

  for (const [index, delta] of deltas.entries()) {
    if (!delta || typeof delta !== 'object' || Array.isArray(delta)) {
      throw new Error(`Regulatory delta at index ${index} must be an object`)
    }

    for (const field of ['id', 'validator', 'source', 'effectiveDate']) {
      if (typeof delta[field] !== 'string' || delta[field].length === 0) {
        throw new Error(
          `Regulatory delta at index ${index} must define a non-empty ${field}`
        )
      }
    }

    if (seenIds.has(delta.id)) {
      throw new Error(`Duplicate regulatory delta id: ${delta.id}`)
    }
    seenIds.add(delta.id)

    if (!regressionValidators.has(delta.validator)) {
      throw new Error(
        `Regulatory delta ${delta.id} uses unsupported validator ${delta.validator}`
      )
    }

    if (typeof delta.baseline !== 'boolean' || typeof delta.current !== 'boolean') {
      throw new Error(
        `Regulatory delta ${delta.id} must define boolean baseline and current values`
      )
    }

    if (delta.baseline === delta.current) {
      throw new Error(
        `Regulatory delta ${delta.id} must describe an actual behavioral difference`
      )
    }

    if (delta.input !== undefined && typeof delta.input !== 'string') {
      throw new Error(`Regulatory delta ${delta.id} input must be a string`)
    }

    if (delta.inputPattern !== undefined) {
      if (typeof delta.inputPattern !== 'string') {
        throw new Error(`Regulatory delta ${delta.id} inputPattern must be a string`)
      }

      try {
        new RegExp(delta.inputPattern)
      } catch {
        throw new Error(`Regulatory delta ${delta.id} has an invalid inputPattern`)
      }
    }

    if (
      delta.options !== undefined &&
      (!delta.options || typeof delta.options !== 'object' || Array.isArray(delta.options))
    ) {
      throw new Error(`Regulatory delta ${delta.id} options must be an object`)
    }
  }
}

function matchesDelta(delta, context) {
  if (delta.validator !== context.validator) return false
  if (delta.baseline !== context.baseline || delta.current !== context.current) {
    return false
  }

  if (delta.input !== undefined && delta.input !== context.input) return false
  if (
    delta.inputPattern !== undefined &&
    !new RegExp(delta.inputPattern).test(context.input)
  ) {
    return false
  }

  if (
    delta.options !== undefined &&
    !isDeepStrictEqual(delta.options, context.options)
  ) {
    return false
  }

  return true
}

function generateBanInputs() {
  const inputs = new Set([
    '',
    '1234567',
    '12345678',
    '123456789',
    '12AB5678',
    '04595252',
    '04595257',
    '10458570',
    '10458575'
  ])

  for (let value = 0; value < 100_000_000; value += 10_007) {
    inputs.add(value.toString().padStart(8, '0'))
  }

  return inputs
}

function generateCdcInputs() {
  const inputs = new Set([
    '',
    'AB12345',
    'AB12345678901234',
    'RP47809425348791',
    'ab12345678901234',
    'ABC2345678901234',
    '9B12345678901234'
  ])

  for (const first of ['A', 'I', 'O', 'W', 'Z', 'a']) {
    for (const second of ['A', 'B', 'Z', '1']) {
      for (const suffix of ['00000000000000', '12345678901234']) {
        inputs.add(`${first}${second}${suffix}`)
      }
    }
  }

  return inputs
}

function generateDonateCodeInputs() {
  const inputs = new Set(['', '00', '001', '12A', '10001', '2134567', '12345678'])

  for (let length = 1; length <= 8; length += 1) {
    inputs.add('1'.repeat(length))
    inputs.add(`${'0'.repeat(Math.max(0, length - 1))}A`)
  }

  return inputs
}

function generateMobileBarcodeInputs() {
  const inputs = new Set([
    '',
    '/+.-++..',
    '/AAA33AA',
    '/ABC_123',
    'ABC12345',
    '/ab12345',
    '/ABCD12',
    '/ABCD1234'
  ])
  const characters = ['0', 'A', 'Z', '+', '-', '.', '_', 'a']

  for (const character of characters) {
    inputs.add(`/${character.repeat(7)}`)
    inputs.add(`X${character.repeat(7)}`)
  }

  return inputs
}

function generateIdCardInputs(baselineValidator) {
  const inputs = new Set([
    '',
    'A12345678',
    'A123456789',
    'A123456788',
    'AB23456789',
    'A800000014',
    'A870000015',
    'A880000018',
    'A890000011',
    'A323456789',
    'a123456789'
  ])
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const secondCharacters = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'Z'
  ]
  const checksumBodies = ['123456', '654321']

  for (const first of letters) {
    for (const second of secondCharacters) {
      for (let third = 0; third <= 9; third += 1) {
        const prefix = `${first}${second}${third}`
        inputs.add(`${prefix}0000000`)

        if (!isSupportedIdSecondCharacter(second)) continue

        for (const body of checksumBodies) {
          addChecksumPair(inputs, baselineValidator, `${prefix}${body}`)
        }
      }
    }
  }

  return inputs
}

function isSupportedIdSecondCharacter(character) {
  return ['1', '2', '8', '9', 'A', 'B', 'C', 'D'].includes(character)
}

function addChecksumPair(inputs, baselineValidator, body) {
  let validCandidate

  for (let checkDigit = 0; checkDigit <= 9; checkDigit += 1) {
    const candidate = `${body}${checkDigit}`
    if (baselineValidator(candidate)) {
      validCandidate = candidate
      break
    }
  }

  if (!validCandidate) {
    throw new Error(`Could not generate a checksum-valid ID for ${body}`)
  }

  inputs.add(validCandidate)

  const validCheckDigit = Number(validCandidate.at(-1))
  const invalidCandidate = `${body}${(validCheckDigit + 1) % 10}`
  if (baselineValidator(invalidCandidate)) {
    throw new Error(`Expected generated checksum-invalid ID: ${invalidCandidate}`)
  }
  inputs.add(invalidCandidate)
}

function generateIdCardOptions() {
  const optionalBooleans = [undefined, true, false]
  const newFormatObjects = []

  for (const foreignOrStateless of optionalBooleans) {
    for (const nationalWithoutHouseholdRegistration of optionalBooleans) {
      for (const hkMacaoResident of optionalBooleans) {
        for (const mainlandChinaResident of optionalBooleans) {
          newFormatObjects.push(
            compactObject({
              foreignOrStateless,
              nationalWithoutHouseholdRegistration,
              hkMacaoResident,
              mainlandChinaResident
            })
          )
        }
      }
    }
  }

  const newFormatValues = [true, false, ...newFormatObjects]
  const uiNumberObjects = []

  for (const oldFormat of optionalBooleans) {
    uiNumberObjects.push(compactObject({ oldFormat }))
    for (const newFormat of newFormatValues) {
      uiNumberObjects.push(compactObject({ oldFormat, newFormat }))
    }
  }

  const uiNumberValues = [true, false, ...uiNumberObjects]
  const options = []

  for (const nationalId of optionalBooleans) {
    options.push(compactObject({ nationalId }))
    for (const uiNumber of uiNumberValues) {
      options.push(compactObject({ nationalId, uiNumber }))
    }
  }

  return options
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined)
  )
}
