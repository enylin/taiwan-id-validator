/**
 * Verify the input is a valid E-Invoice cell phone barcode (電子發票手機條碼)
 *
 * @param { string } input E-Invoice cell phone barcode
 * @returns { boolean } is `input` a valid e-invoice cell phone barcode
 */
export function isEInvoiceCellPhoneBarcode(input: string): boolean {
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
