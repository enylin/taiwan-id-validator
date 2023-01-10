import { isCitizenDigitalCertificateNumber } from './citizen-digital-certificate-number'

describe('isCitizenDigitalCertificateNumber', () => {
  it('should only accept strings with length 16', () => {
    expect(isCitizenDigitalCertificateNumber({} as string)).toBe(false)
    expect(
      isCitizenDigitalCertificateNumber(47809425348791 as unknown as string)
    ).toBe(false)
    expect(
      isCitizenDigitalCertificateNumber(undefined as unknown as string)
    ).toBe(false)
    expect(isCitizenDigitalCertificateNumber('AB123456789012345')).toBe(false)
    expect(isCitizenDigitalCertificateNumber('AB1234567890123')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isCitizenDigitalCertificateNumber('AB12345678901234')).toBe(true)
    expect(isCitizenDigitalCertificateNumber('RP47809425348791')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isCitizenDigitalCertificateNumber('ab12345678901234')).toBe(false)
    expect(isCitizenDigitalCertificateNumber('A112345678901234')).toBe(false)
    expect(isCitizenDigitalCertificateNumber('9B12345678901234')).toBe(false)
    expect(isCitizenDigitalCertificateNumber('AA123456789012J4')).toBe(false)
  })
})
