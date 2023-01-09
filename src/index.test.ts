import {
  isCDC,
  isCitizenDigitalCertificateNumberValid
} from './citizen-digital-certificate-number'
import { isCreditCard, isCreditCardNumberValid } from './credit-card-number'
import {
  isCellPhoneBarcode,
  isEInvoiceCellPhoneBarcodeValid
} from './e-invoice-cell-phone-barcode'
import {
  isDonateCode,
  isEInvoiceDonateCodeValid
} from './e-invoice-donate-code'
import { isGUI, isGuiNumberValid } from './gui-number'
import {
  isNI,
  isNationalIdentificationNumberValid,
  isRC,
  isResidentCertificateNumberValid,
  isNewRC,
  isNewResidentCertificateNumberValid,
  isOriginalRC,
  isOriginalResidentCertificateNumberValid
} from './national-id-number'

describe('function alias', () => {
  it('should be identical to the original function', () => {
    expect(isGUI).toBe(isGuiNumberValid)
    expect(isNI).toBe(isNationalIdentificationNumberValid)
    expect(isRC).toBe(isResidentCertificateNumberValid)
    expect(isNewRC).toBe(isNewResidentCertificateNumberValid)
    expect(isOriginalRC).toBe(isOriginalResidentCertificateNumberValid)
    expect(isCDC).toBe(isCitizenDigitalCertificateNumberValid)
    expect(isCellPhoneBarcode).toBe(isEInvoiceCellPhoneBarcodeValid)
    expect(isDonateCode).toBe(isEInvoiceDonateCodeValid)
    expect(isCreditCard).toBe(isCreditCardNumberValid)
  })
})
