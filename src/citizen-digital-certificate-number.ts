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
