/**
 * Verify the input is a valid GUI Number (中華民國統一編號)
 *
 * @param { string | number } input GUI Number
 * @returns { boolean } is `input` a valid GUI number
 */
export function isGuiNumberValid(input: string | number): boolean {
  if (typeof input !== 'string' && typeof input !== 'number') return false

  /**
   * Example: 12345675
   * Step 1:
   * 1 * 1 = 1
   * 2 * 2 = 4
   * 3 * 1 = 3
   * 4 * 2 = 8
   * 5 * 1 = 5
   * 6 * 2 = 12
   * 7 * 4 = 28
   * 5 * 1 = 5
   *
   * Step 2:
   * 1 -> 1
   * 4 -> 4
   * 3 -> 3
   * 8 -> 8
   * 5 -> 5
   * 12 -> 1 + 2 = 3
   * 28 -> 2 + 8 = 10
   * 5 -> 5
   *
   * Step 3:
   * (1 + 4 + 3 + 8 + 5 + 3 + 10 + 5) % 10 = 9
   */

  const GUI_NUMBER_COEFFICIENTS = [1, 2, 1, 2, 1, 2, 4, 1]

  const n = input.toString()
  const regex = /^\d{8}$/

  if (!regex.test(n)) return false

  /**
   * Step 1: 先把統一編號的每個數字分別乘上對應的係數 (1, 2, 1, 2, 1, 2, 4, 1)
   * Step 2: 再把個別乘積的十位數與個位數相加，得出八個小於 10 的數字
   */
  const checksum = GUI_NUMBER_COEFFICIENTS.reduce((sum, c, index) => {
    const product = c * parseInt(n.charAt(index), 10)
    return sum + (product % 10) + Math.floor(product / 10)
  }, 0)

  /**
   * Step 3: 檢查把這 8 個數字相加之後計算此和除以 10 的餘數
   * Step 4:
   *  4-1: 若是餘數為 0，則為正確的統一編號
   *  4-2: 若是餘數為 9，且原統一編號的第七位是 7，則也為正確的統一編號
   */
  return (
    checksum % 10 === 0 ||
    (parseInt(n.charAt(6), 10) === 7 && (checksum + 1) % 10 === 0)
  )
}

/**
 * Verify the input is a valid National identification number (中華民國身分證字號)
 *
 * @param { string } input National identification number
 * @returns { boolean } is `input` a valid national ID number
 */
export function isNationalIdentificationNumberValid(input: string): boolean {
  if (typeof input !== 'string') return false

  const regex = /^[A-Z][1,2]\d{8}$/

  return regex.test(input) && verifyTaiwanIdIntermediateString(input)
}

/**
 * Verify the input is a valid resident certificate number (臺灣地區無戶籍國民、外國人、大陸地區人民及香港或澳門居民之專屬代號)
 *
 * @param { string } input resident certificate number
 * @returns { boolean } is `input` a valid resident certificate number
 */
export function isResidentCertificateNumberValid(input: string): boolean {
  if (typeof input !== 'string') return false

  return (
    isNewResidentCertificateNumberValid(input) ||
    isOriginalResidentCertificateNumberValid(input)
  )
}

/**
 * Verify the input is a valid new resident certificate number (臺灣地區無戶籍國民、外國人、大陸地區人民及香港或澳門居民之專屬代號)
 *
 * @param { string } input resident certificate number
 * @returns { boolean } is `input` a valid new resident certificate number
 */
export function isNewResidentCertificateNumberValid(input: string): boolean {
  if (typeof input !== 'string') return false

  const regex = /^[A-Z][8,9]\d{8}$/

  return regex.test(input) && verifyTaiwanIdIntermediateString(input)
}

/**
 * Verify the input is a original valid resident certificate number (臺灣地區無戶籍國民、外國人、大陸地區人民及香港或澳門居民之專屬代號)
 *
 * @param { string } input resident certificate number
 * @returns { boolean } is `input` a valid original resident certificate number
 */
export function isOriginalResidentCertificateNumberValid(
  input: string
): boolean {
  if (typeof input !== 'string') return false

  const regex = /^[A-Z]{2}\d{8}$/

  return regex.test(input) && verifyTaiwanIdIntermediateString(input)
}

/**
 * Verify the input is a valid citizen digital certificate number (自然人憑證)
 *
 * @param { string } input citizen digital certificate number
 * @returns { boolean } is `input` a valid citizen digital certificate number
 */
export function isCitizenDigitalCertificateNumberValid(input: string): boolean {
  if (typeof input !== 'string') return false

  const n = input.toString()

  // 驗證規則為兩碼英文 + 14 碼數字
  const regex = /^[A-Z]{2}\d{14}$/

  return regex.test(n)
}

/**
 * Verify the input is a valid E-Invoice cell phone barcode (電子發票手機條碼)
 *
 * @param { string } input E-Invoice cell phone barcode
 * @returns { boolean } is `input` a valid e-invoice cell phone barcode
 */
export function isEInvoiceCellPhoneBarcodeValid(input: string): boolean {
  if (typeof input !== 'string') return false

  const n = input.toString()

  /**
   * 總長度為 8 碼
   * 第 1 碼為 /
   * 第 2-8 碼由 0-9 (數字), A-Z (大寫英文字母), .(period), -(hyphen), +(plus) 組成
   */
  const regex = /^\/[\dA-Z.\-+]{7}$/

  return regex.test(n)
}

/**
 * Verify the input is a valid E-Invoice donate code (電子發票捐贈碼)
 *
 * @param { string | number } input E-Invoice donate code
 * @returns { boolean } is `input` a valid e-invoice donate code
 */
export function isEInvoiceDonateCodeValid(input: string | number): boolean {
  if (typeof input !== 'string' && typeof input !== 'number') return false

  const n = input.toString()

  // 總長度為 3-7 碼 0-9 的數字
  const regex = /^[\d]{3,7}$/

  return regex.test(n)
}

/**
 * Verify the intermediate string for isNationalIdentificationNumberValid and isResidentCertificateNumberValid
 *
 * @param { string } input String to verify
 * @returns { boolean } is `input` a valid Taiwan ID intermediate string
 */
function verifyTaiwanIdIntermediateString(input: string): boolean {
  const idArray: string[] = input.split('')
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
    '0', // A
    '1', // B
    '2', // C
    '3', // D
    '4', // E
    '5', // F
    '6', // G
    '7', // H
    '4', // I
    '8', // J
    '9', // K
    '0', // L
    '1', // M
    '2', // N
    '5', // O
    '3', // P
    '4', // Q
    '5', // R
    '6', // S
    '7', // T
    '8', // U
    '9', // V
    '2', // W
    '0', // X
    '1', // Y
    '3' // Z
  ]

  // if is not a number (舊版居留證編號)
  if (isNaN(parseInt(idArray[1], intRadix))) {
    idArray[1] =
      RESIDENT_CERTIFICATE_NUMBER_LIST[input.charCodeAt(1) - 'A'.charCodeAt(0)]
  }

  // Step 2: 第 1 位數字 (只能為 1 or 2) 至第 8 位數字分別乘上 8, 7, 6, 5, 4, 3, 2, 1 後相加，再加上第 9 位數字
  const cb = (sum: number, n: string, index: number) =>
    sum +
    (index === 0
      ? TAIWAN_ID_LOCALE_CODE_LIST[n.charCodeAt(0) - 'A'.charCodeAt(0)]
      : parseInt(n, intRadix) * (index === 9 ? 1 : 9 - index))

  // Step 3: 如果該數字為 10 的倍數，則為正確身分證字號
  return idArray.reduce(cb, 0) % 10 === 0
}

export const isGUI = isGuiNumberValid
export const isNI = isNationalIdentificationNumberValid
export const isRC = isResidentCertificateNumberValid
export const isNewRC = isNewResidentCertificateNumberValid
export const isOriginalRC = isOriginalResidentCertificateNumberValid
export const isCDC = isCitizenDigitalCertificateNumberValid
export const isCellPhoneBarcode = isEInvoiceCellPhoneBarcodeValid
export const isDonateCode = isEInvoiceDonateCodeValid
