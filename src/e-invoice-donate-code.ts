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

export const isDonateCode = isEInvoiceDonateCodeValid
