import { isEInvoiceDonateCode } from './e-invoice-donate-code'

describe('isEInvoiceDonateCode', () => {
  it('should only accept strings with length 3-7', () => {
    expect(isEInvoiceDonateCode({} as string)).toBe(false)
    expect(isEInvoiceDonateCode(undefined as unknown as string)).toBe(false)
    expect(isEInvoiceDonateCode('00')).toBe(false)
    expect(isEInvoiceDonateCode('12345678')).toBe(false)
    expect(isEInvoiceDonateCode(12345678)).toBe(false)
    expect(isEInvoiceDonateCode('ab3456')).toBe(false)
  })

  it('should return false if the input is incorrect', () => {
    expect(isEInvoiceDonateCode('001')).toBe(true)
    expect(isEInvoiceDonateCode('10001')).toBe(true)
    expect(isEInvoiceDonateCode('2134567')).toBe(true)
    expect(isEInvoiceDonateCode(123)).toBe(true)
    expect(isEInvoiceDonateCode(10001)).toBe(true)
    expect(isEInvoiceDonateCode(2134567)).toBe(true)
  })
})
