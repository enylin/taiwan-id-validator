import { isEInvoiceDonateCodeValid } from './e-invoice-donate-code'

describe('isEInvoiceDonateCodeValid', () => {
  it('should only accept strings with length 3-7', () => {
    expect(isEInvoiceDonateCodeValid({} as string)).toBe(false)
    expect(isEInvoiceDonateCodeValid(undefined as unknown as string)).toBe(
      false
    )
    expect(isEInvoiceDonateCodeValid('00')).toBe(false)
    expect(isEInvoiceDonateCodeValid('12345678')).toBe(false)
    expect(isEInvoiceDonateCodeValid(12345678)).toBe(false)
    expect(isEInvoiceDonateCodeValid('ab3456')).toBe(false)
  })

  it('should return false if the input is incorrect', () => {
    expect(isEInvoiceDonateCodeValid('001')).toBe(true)
    expect(isEInvoiceDonateCodeValid('10001')).toBe(true)
    expect(isEInvoiceDonateCodeValid('2134567')).toBe(true)
    expect(isEInvoiceDonateCodeValid(123)).toBe(true)
    expect(isEInvoiceDonateCodeValid(10001)).toBe(true)
    expect(isEInvoiceDonateCodeValid(2134567)).toBe(true)
  })
})
