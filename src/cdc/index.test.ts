import { isCitizenDigitalCertificateNumberValid, isCDC } from './index'

describe('isCitizenDigitalCertificateNumberValid', () => {
  it('should only accept strings with length 16', () => {
    expect(isCitizenDigitalCertificateNumberValid({} as string)).toBe(false)
    expect(
      isCitizenDigitalCertificateNumberValid(
        47809425348791 as unknown as string
      )
    ).toBe(false)
    expect(
      isCitizenDigitalCertificateNumberValid(undefined as unknown as string)
    ).toBe(false)
    expect(isCitizenDigitalCertificateNumberValid('AB123456789012345')).toBe(
      false
    )
    expect(isCitizenDigitalCertificateNumberValid('AB1234567890123')).toBe(
      false
    )
  })

  it('should return true if the input is correct', () => {
    expect(isCitizenDigitalCertificateNumberValid('AB12345678901234')).toBe(
      true
    )
    expect(isCitizenDigitalCertificateNumberValid('RP47809425348791')).toBe(
      true
    )
  })

  it('should return false if the input is incorrect', () => {
    expect(isCitizenDigitalCertificateNumberValid('ab12345678901234')).toBe(
      false
    )
    expect(isCitizenDigitalCertificateNumberValid('A112345678901234')).toBe(
      false
    )
    expect(isCitizenDigitalCertificateNumberValid('9B12345678901234')).toBe(
      false
    )
    expect(isCitizenDigitalCertificateNumberValid('AA123456789012J4')).toBe(
      false
    )
  })
})

describe('function alias', () => {
  it('should be identical to the original function', () => {
    expect(isCDC).toBe(isCitizenDigitalCertificateNumberValid)
  })
})
