import { isEInvoiceCellPhoneBarcodeValid } from './e-invoice-cell-phone-barcode'

describe('isEInvoiceCellPhoneBarcodeValid', () => {
  it('should only accept strings with length 8', () => {
    expect(isEInvoiceCellPhoneBarcodeValid({} as string)).toBe(false)
    expect(isEInvoiceCellPhoneBarcodeValid(3030101 as unknown as string)).toBe(
      false
    )
    expect(
      isEInvoiceCellPhoneBarcodeValid(undefined as unknown as string)
    ).toBe(false)
    expect(isEInvoiceCellPhoneBarcodeValid('/ABCD1234')).toBe(false)
    expect(isEInvoiceCellPhoneBarcodeValid('/ABCD12')).toBe(false)
  })

  it('should return false if the input contains invalid char', () => {
    expect(isEInvoiceCellPhoneBarcodeValid('/ABCD12;')).toBe(false)
    expect(isEInvoiceCellPhoneBarcodeValid('/ABCD$12')).toBe(false)
    expect(isEInvoiceCellPhoneBarcodeValid('/ab12345')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isEInvoiceCellPhoneBarcodeValid('/+.-++..')).toBe(true)
    expect(isEInvoiceCellPhoneBarcodeValid('/AAA33AA')).toBe(true)
    expect(isEInvoiceCellPhoneBarcodeValid('/P4SV.-I')).toBe(true)
    expect(isEInvoiceCellPhoneBarcodeValid('/O0O01I1')).toBe(true)
  })
})
