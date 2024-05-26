/**
 * Verify the input is a valid Citizen Digital Certificate Number (自然人憑證)
 *
 * @param { string } input - Citizen Digital Certificate Number
 * @returns { boolean } is `input` a valid Citizen Digital Certificate Number
 * @example
 * isCdcNumber('AB12345678901234') // true
 * isCdcNumber('A12345678901234') // false
 */
export function isCdcNumber(input: string): boolean {
  if (typeof input !== 'string') return false

  const n = input.toString()

  // 驗證規則為兩碼英文 + 14 碼數字
  const regex = /^[A-Z]{2}\d{14}$/

  return regex.test(n)
}
