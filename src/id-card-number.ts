export type NewUiValidationOptions =
  | Partial<{
      /** Foreigners or stateless persons (外國人或無國籍人士) */
      foreignOrStateless: boolean
      /** Nationals without household registration in Taiwan (臺灣地區無戶籍國民) */
      nationalWithoutHouseholdRegistration: boolean
      /** Hong Kong or Macao residents (香港澳門居民) */
      hkMacaoResident: boolean
      /** Mainland China residents (大陸地區人民) */
      mainlandChinaResident: boolean
    }>
  | boolean

export type UiNumberValidationOptions =
  | Partial<{
      /** Old format UI number (舊式統一證號) */
      oldFormat: boolean
      /** New format UI number (新式統一證號) */
      newFormat: NewUiValidationOptions
    }>
  | boolean

export type IdCardValidationOptions = Partial<{
  /** National identification number (國民身分證統一編號) */
  nationalId: boolean
  /** UI number (外來人口統一證號) */
  uiNumber: UiNumberValidationOptions
}>

const NATIONAL_ID_PATTERN = /^[A-Z][12]\d{8}$/
const LEGACY_UI_NUMBER_PATTERN = /^[A-Z][A-D]\d{8}$/

const CURRENT_UI_NUMBER_PATTERNS = {
  foreignOrStateless: /^[A-Z][89][0-6]\d{7}$/,
  nationalWithoutHouseholdRegistration: /^[A-Z][89]7\d{7}$/,
  hkMacaoResident: /^[A-Z][89]8\d{7}$/,
  mainlandChinaResident: /^[A-Z][89]9\d{7}$/
} as const

const TAIWAN_ID_LOCALE_CHECKSUMS = [
  1, // A = 10
  10, // B = 11
  19, // C = 12
  28, // D = 13
  37, // E = 14
  46, // F = 15
  55, // G = 16
  64, // H = 17
  39, // I = 34
  73, // J = 18
  82, // K = 19
  2, // L = 20
  11, // M = 21
  20, // N = 22
  48, // O = 35
  29, // P = 23
  38, // Q = 24
  47, // R = 25
  56, // S = 26
  65, // T = 27
  74, // U = 28
  83, // V = 29
  21, // W = 32
  3, // X = 30
  12, // Y = 31
  30 // Z = 33
] as const

const LEGACY_UI_SECOND_LETTER_VALUES = [
  0, // A
  1, // B
  2, // C
  3, // D
  4, // E
  5, // F
  6, // G
  7, // H
  4, // I
  8, // J
  9, // K
  0, // L
  1, // M
  2, // N
  5, // O
  3, // P
  4, // Q
  5, // R
  6, // S
  7, // T
  8, // U
  9, // V
  2, // W
  0, // X
  1, // Y
  3 // Z
] as const

const ID_COEFFICIENTS = [1, 8, 7, 6, 5, 4, 3, 2, 1, 1] as const

/**
 * Verify an identification number according to the enabled Taiwan National ID
 * and UI number formats.
 */
export function isIdCardNumber(
  input: string,
  options: IdCardValidationOptions = {}
): boolean {
  if (typeof input !== 'string') return false

  if ((options.nationalId ?? true) && NATIONAL_ID_PATTERN.test(input)) {
    return hasValidChecksum(input)
  }

  const uiNumber = options.uiNumber ?? true
  if (uiNumber === false) return false

  const oldFormatEnabled =
    typeof uiNumber === 'boolean' ? uiNumber : (uiNumber.oldFormat ?? true)

  if (oldFormatEnabled && LEGACY_UI_NUMBER_PATTERN.test(input)) {
    return hasValidChecksum(input)
  }

  const newFormat =
    typeof uiNumber === 'boolean' ? uiNumber : (uiNumber.newFormat ?? true)

  if (newFormat === false) return false

  const matchesCurrentFormat =
    typeof newFormat === 'boolean'
      ? Object.values(CURRENT_UI_NUMBER_PATTERNS).some(pattern =>
          pattern.test(input)
        )
      : Object.entries(CURRENT_UI_NUMBER_PATTERNS).some(
          ([key, pattern]) =>
            (newFormat[key as keyof typeof CURRENT_UI_NUMBER_PATTERNS] ??
              true) &&
            pattern.test(input)
        )

  return matchesCurrentFormat && hasValidChecksum(input)
}

function hasValidChecksum(input: string): boolean {
  const firstLetterIndex = input.charCodeAt(0) - 65
  const firstValue = TAIWAN_ID_LOCALE_CHECKSUMS[firstLetterIndex]

  const secondCharacter = input[1]
  const secondValue = /\d/.test(secondCharacter)
    ? Number(secondCharacter)
    : LEGACY_UI_SECOND_LETTER_VALUES[secondCharacter.charCodeAt(0) - 65]

  const digits = [
    firstValue,
    secondValue,
    ...input.slice(2).split('').map(Number)
  ]

  const checksum = digits.reduce(
    (sum, digit, index) => sum + digit * ID_COEFFICIENTS[index],
    0
  )

  return checksum % 10 === 0
}
