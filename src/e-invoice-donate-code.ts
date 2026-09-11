/**
 * Verify the input is a valid E-Invoice Donate Code (電子發票捐贈碼)
 *
 * @param { string } input - E-Invoice Donate Code
 * @returns { boolean } is `input` a valid E-Invoice Donate Code
 * @example
 * isDonateCode('123') // true
 * isDonateCode('abc123') // false
 */
export function isDonateCode(input: string): boolean {
  if (typeof input !== 'string') return false

  // 總長度為 3-7 碼 0-9 的數字
  const regex = /^\d{3,7}$/

  return regex.test(input)
}
