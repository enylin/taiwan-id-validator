import { isEInvoiceCellPhoneBarcode } from './e-invoice-cell-phone-barcode'

describe('isEInvoiceCellPhoneBarcode', () => {
  it('should only accept strings with length 8', () => {
    expect(isEInvoiceCellPhoneBarcode({} as string)).toBe(false)
    expect(isEInvoiceCellPhoneBarcode(3030101 as unknown as string)).toBe(false)
    expect(isEInvoiceCellPhoneBarcode(undefined as unknown as string)).toBe(
      false
    )
    expect(isEInvoiceCellPhoneBarcode('/ABCD1234')).toBe(false)
    expect(isEInvoiceCellPhoneBarcode('/ABCD12')).toBe(false)
  })

  it('should return false if the input contains invalid char', () => {
    expect(isEInvoiceCellPhoneBarcode('/ABCD12;')).toBe(false)
    expect(isEInvoiceCellPhoneBarcode('/ABCD$12')).toBe(false)
    expect(isEInvoiceCellPhoneBarcode('/ab12345')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isEInvoiceCellPhoneBarcode('/+.-++..')).toBe(true)
    expect(isEInvoiceCellPhoneBarcode('/AAA33AA')).toBe(true)
    expect(isEInvoiceCellPhoneBarcode('/P4SV.-I')).toBe(true)
    expect(isEInvoiceCellPhoneBarcode('/O0O01I1')).toBe(true)
  })
})
