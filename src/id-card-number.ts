import { zipWith, multiply, add, objectKeys } from './helper'

export type NewUiValidationOptions =
  | Partial<{
      /**
       * Foreigners or stateless persons (外國人或無國籍人士)
       */
      foreignOrStateless: boolean
      /**
       * Stateless residents (無戶籍國民)
       */
      statelessResident: boolean
      /**
       * Hong Kong or Macao residents (香港澳門居民)
       */
      hkMacaoResident: boolean
      /**
       * Mainland China residents (大陸地區居民)
       */
      mainlandChinaResident: boolean
    }>
  | boolean

export type UiNumberValidationOptions =
  | Partial<{
      /**
       * Old format UI number (舊版統一證號)
       */
      oldFormat: boolean
      /**
       * New format UI number (新版統一證號)
       */
      newFormat: NewUiValidationOptions
    }>
  | boolean

export type IdCardValidationOptions = Partial<{
  /**
   * National identification number (身分證字號)
   */
  nationalId: boolean
  /**
   * UI number (統一證號)
   */
  uiNumber: UiNumberValidationOptions
}>

type Tree<T> = {
  [key: string]: T | Tree<T>
}

/**
 * Tree structure containing RegExp patterns for identification numbers
 */
const idCardRegExps: Tree<RegExp> = {
  nationalId: /[A-Z][1,2]\d{8}/,
  uiNumber: {
    oldFormat: /[A-Z][A-D]\d{8}/,
    newFormat: {
      foreignOrStateless: /[A-Z][89][0-6]\d{7}/,
      statelessResident: /[A-Z][89][7]\d{7}/,
      hkMacaoResident: /[A-Z][89][8]\d{7}/,
      mainlandChinaResident: /[A-Z][89][9]\d{7}/
    }
  }
}

/**
 * Collect all the RegExp patterns from a tree structure.
 * If the validation options are specified, only the patterns with the corresponding options will be collected.
 * If the validation options are not specified, all patterns will be collected.
 * Default options are `true` if not specified.
 *
 * @param { Tree<RegExp> } regexTree - The tree structure containing RegExp patterns
 * @param { Tree<boolean> | boolean } validationOptions - The tree structure containing validation options
 * @returns { RegExp[] } An array of RegExp patterns to be used for validation
 */
const collectPatterns: (
  regexTree: Tree<RegExp>,
  validationOptions: Tree<boolean> | boolean
) => RegExp[] = (regexTree, validationOptions) =>
  objectKeys(regexTree).reduce((patterns, key) => {
    const currentRegex = regexTree[key]

    const currentOptions =
      typeof validationOptions === 'boolean'
        ? validationOptions
        : validationOptions[key] ?? true // default to true if not specified

    return currentRegex instanceof RegExp
      ? currentOptions
        ? patterns.concat(currentRegex)
        : patterns
      : patterns.concat(collectPatterns(currentRegex, currentOptions))
  }, [] as RegExp[])

/**
 * Verify the input is a valid identification number based on provided options.
 *
 * @param { string } input - The identification number to verify
 * @param { IdCardValidationOptions } [options] - Options specifying which types of identification numbers to check
 * @returns `true` if the input is a valid identification number according to the specified options, otherwise `false`
 * @example
 * isIdCardNumber('A123456789') // true
 * isIdCardNumber('A123456789', { nationalId: false }) // false
 */
export function isIdCardNumber(
  input: string,
  options: IdCardValidationOptions = {
    nationalId: true,
    uiNumber: true
  }
): boolean {
  if (typeof input !== 'string') return false

  // collect all the patterns based on the options
  const patterns: RegExp[] = collectPatterns(idCardRegExps, options)

  // create a regex that matches any of the patterns
  const joinedRegexString = patterns.map(r => r.source).join('|')
  const regex = new RegExp(`^(${joinedRegexString})$`)

  return regex.test(input) && verifyTaiwanIdIntermediateString(input)
}

/**
 * Verify the intermediate string for isNationalIdentificationNumber and isResidentCertificateNumber
 *
 * @param { string } input - String to verify
 * @returns { boolean } is `input` a valid Taiwan ID intermediate string
 * @example
 * verifyTaiwanIdIntermediateString('A123456789') // true
 * verifyTaiwanIdIntermediateString('A123456788') // false
 */
function verifyTaiwanIdIntermediateString(input: string): boolean {
  const intRadix = 10

  /**
   *  A=10 台北市     J=18 新竹縣     S=26 高雄縣
   *  B=11 台中市     K=19 苗栗縣     T=27 屏東縣
   *  C=12 基隆市     L=20 台中縣     U=28 花蓮縣
   *  D=13 台南市     M=21 南投縣     V=29 台東縣
   *  E=14 高雄市     N=22 彰化縣     W=32 金門縣*
   *  F=15 台北縣     O=35 新竹市*    X=30 澎湖縣
   *  G=16 宜蘭縣     P=23 雲林縣     Y=31 陽明山
   *  H=17 桃園縣     Q=24 嘉義縣     Z=33 連江縣*
   *  I=34 嘉義市*    R=25 台南縣
   *
   *  Step 1: 英文字母按照上表轉換為數字之後，十位數 * 1 + 個位數 * 9 相加
   */
  const TAIWAN_ID_LOCALE_CODE_LIST = [
    1, // A -> 10 -> 1 * 1 + 9 * 0 = 1
    10, // B -> 11 -> 1 * 1 + 9 * 1 = 10
    19, // C -> 12 -> 1 * 1 + 9 * 2 = 19
    28, // D
    37, // E
    46, // F
    55, // G
    64, // H
    39, // I -> 34 -> 1 * 3 + 9 * 4 = 39
    73, // J
    82, // K
    2, // L
    11, // M
    20, // N
    48, // O -> 35 -> 1 * 3 + 9 * 5 = 48
    29, // P
    38, // Q
    47, // R
    56, // S
    65, // T
    74, // U
    83, // V
    21, // W -> 32 -> 1 * 3 + 9 * 2 = 21
    3, // X
    12, // Y
    30 // Z -> 33 -> 1 * 3 + 9 * 3 = 30
  ]

  const RESIDENT_CERTIFICATE_NUMBER_LIST = [
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
  ]

  const getCharOrder = (s: string, i: number) =>
    s.charCodeAt(i) - 'A'.charCodeAt(0)

  const firstDigit = TAIWAN_ID_LOCALE_CODE_LIST[getCharOrder(input, 0)]

  const secondDigit = isNaN(parseInt(input[1], intRadix)) // if is not a number (舊版居留證編號)
    ? RESIDENT_CERTIFICATE_NUMBER_LIST[getCharOrder(input, 1)]
    : parseInt(input[1], intRadix)

  const rest = input
    .substring(2)
    .split('')
    .map(n => parseInt(n, intRadix))

  const idInDigits = [firstDigit, secondDigit, ...rest]

  // Step 2: 第 1 位數字 (只能為 1 or 2) 至第 8 位數字分別乘上 8, 7, 6, 5, 4, 3, 2, 1 後相加，再加上第 9 位數字

  const ID_COEFFICIENTS = [1, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  const sum = zipWith(idInDigits, ID_COEFFICIENTS, multiply).reduce(add, 0)

  // Step 3: 如果該數字為 10 的倍數，則為正確身分證字號

  return sum % 10 === 0
}
