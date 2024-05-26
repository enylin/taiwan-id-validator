import { isMobileBarcode } from './e-invoice-mobile-barcode'

describe('isMobileBarcode', () => {
  it('should only accept strings with length 8', () => {
    expect(isMobileBarcode({} as string)).toBe(false)
    expect(isMobileBarcode(3030101 as unknown as string)).toBe(false)
    expect(isMobileBarcode(undefined as unknown as string)).toBe(false)
    expect(isMobileBarcode('/ABCD1234')).toBe(false)
    expect(isMobileBarcode('/ABCD12')).toBe(false)
  })

  it('should return false if the input contains invalid char', () => {
    expect(isMobileBarcode('/ABCD12;')).toBe(false)
    expect(isMobileBarcode('/ABCD$12')).toBe(false)
    expect(isMobileBarcode('/ab12345')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isMobileBarcode('/+.-++..')).toBe(true)
    expect(isMobileBarcode('/AAA33AA')).toBe(true)
    expect(isMobileBarcode('/P4SV.-I')).toBe(true)
    expect(isMobileBarcode('/O0O01I1')).toBe(true)
  })
})
