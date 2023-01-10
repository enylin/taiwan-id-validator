import {
  isNationalIdentificationNumber,
  isNewResidentCertificateNumber,
  isOriginalResidentCertificateNumber,
  isResidentCertificateNumber
} from './national-id-number'

describe('isNationalIdentificationNumber', () => {
  it('should only accept strings with length 10', () => {
    expect(isNationalIdentificationNumber({} as string)).toBe(false)
    expect(isNationalIdentificationNumber(123456789 as unknown as string)).toBe(
      false
    )
    expect(isNationalIdentificationNumber(undefined as unknown as string)).toBe(
      false
    )
    expect(isNationalIdentificationNumber('A1234567899')).toBe(false)
    expect(isNationalIdentificationNumber('A12345678')).toBe(false)
  })

  it('should only accept strings Begin with English letter', () => {
    expect(isNationalIdentificationNumber('2123456789')).toBe(false)
    expect(isNationalIdentificationNumber('1123456789')).toBe(false)
  })

  it('should return false if the first number is not 1 or 2', () => {
    expect(isNationalIdentificationNumber('A323456789')).toBe(false)
    expect(isNationalIdentificationNumber('A423456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isNationalIdentificationNumber('A123456789')).toBe(true)
    expect(isNationalIdentificationNumber('F131104093')).toBe(true)
    expect(isNationalIdentificationNumber('O158238845')).toBe(true)
    expect(isNationalIdentificationNumber('N116247806')).toBe(true)
    expect(isNationalIdentificationNumber('L122544270')).toBe(true)
    expect(isNationalIdentificationNumber('C180661564')).toBe(true)
    expect(isNationalIdentificationNumber('Y123456788')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isNationalIdentificationNumber('a123456789')).toBe(false)
    expect(isNationalIdentificationNumber('A123456788')).toBe(false)
    expect(isNationalIdentificationNumber('F131104091')).toBe(false)
    expect(isNationalIdentificationNumber('O158238842')).toBe(false)
  })
})

describe('isOriginalResidentCertificateNumber', () => {
  it('should only accept strings with length 10', () => {
    expect(isOriginalResidentCertificateNumber({} as string)).toBe(false)
    expect(
      isOriginalResidentCertificateNumber(30196818 as unknown as string)
    ).toBe(false)
    expect(
      isOriginalResidentCertificateNumber(undefined as unknown as string)
    ).toBe(false)
    expect(isOriginalResidentCertificateNumber('AA234567899')).toBe(false)
    expect(isOriginalResidentCertificateNumber('AA2345678')).toBe(false)
  })

  it('should only accept strings Begin with 2 English letters', () => {
    expect(isOriginalResidentCertificateNumber('2123456789')).toBe(false)
    expect(isOriginalResidentCertificateNumber('1A23456789')).toBe(false)
    expect(isOriginalResidentCertificateNumber('A123456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isOriginalResidentCertificateNumber('AA00000009')).toBe(true)
    expect(isOriginalResidentCertificateNumber('AB00207171')).toBe(true)
    expect(isOriginalResidentCertificateNumber('AC03095424')).toBe(true)
    expect(isOriginalResidentCertificateNumber('BD01300667')).toBe(true)
    expect(isOriginalResidentCertificateNumber('CC00151114')).toBe(true)
    expect(isOriginalResidentCertificateNumber('HD02717288')).toBe(true)
    expect(isOriginalResidentCertificateNumber('TD00251124')).toBe(true)
    expect(isOriginalResidentCertificateNumber('AD30196818')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isOriginalResidentCertificateNumber('aa00000009')).toBe(false)
    expect(isOriginalResidentCertificateNumber('AA00000000')).toBe(false)
    expect(isOriginalResidentCertificateNumber('FG31104091')).toBe(false)
    expect(isOriginalResidentCertificateNumber('OY58238842')).toBe(false)
  })
})

describe('isNewResidentCertificateNumber', () => {
  it('should only accept strings with length 10', () => {
    expect(isNewResidentCertificateNumber({} as string)).toBe(false)
    expect(isNewResidentCertificateNumber(930196810 as unknown as string)).toBe(
      false
    )
    expect(isNewResidentCertificateNumber(undefined as unknown as string)).toBe(
      false
    )
    expect(isNewResidentCertificateNumber('AA234567899')).toBe(false)
    expect(isNewResidentCertificateNumber('AA2345678')).toBe(false)
  })

  it('should only accept strings Begin with 1 English letters', () => {
    expect(isNewResidentCertificateNumber('2123456789')).toBe(false)
    expect(isNewResidentCertificateNumber('1A23456789')).toBe(false)
    expect(isNewResidentCertificateNumber('AA23456789')).toBe(false)
  })

  it('should return false if the first number is not 8 or 9', () => {
    expect(isNationalIdentificationNumber('A323456789')).toBe(false)
    expect(isNationalIdentificationNumber('A423456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isNewResidentCertificateNumber('A800000014')).toBe(true)
    expect(isNewResidentCertificateNumber('A900207177')).toBe(true)
    expect(isNewResidentCertificateNumber('A803095426')).toBe(true)
    expect(isNewResidentCertificateNumber('B801300667')).toBe(true)
    expect(isNewResidentCertificateNumber('C800151116')).toBe(true)
    expect(isNewResidentCertificateNumber('H802717288')).toBe(true)
    expect(isNewResidentCertificateNumber('T900251126')).toBe(true)
    expect(isNewResidentCertificateNumber('A930196810')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isNewResidentCertificateNumber('a800000009')).toBe(false)
    expect(isNewResidentCertificateNumber('A800000000')).toBe(false)
    expect(isNewResidentCertificateNumber('F931104091')).toBe(false)
    expect(isNewResidentCertificateNumber('O958238842')).toBe(false)
  })
})

describe('isResidentCertificateNumber', () => {
  it('should only accept strings with length 10', () => {
    expect(isResidentCertificateNumber({} as string)).toBe(false)
    expect(isResidentCertificateNumber(58238842 as unknown as string)).toBe(
      false
    )
    expect(isResidentCertificateNumber(undefined as unknown as string)).toBe(
      false
    )
    expect(isResidentCertificateNumber('AA234567899')).toBe(false)
    expect(isResidentCertificateNumber('AA2345678')).toBe(false)
  })

  it('should only accept strings Begin with 2 English letters', () => {
    expect(isResidentCertificateNumber('2123456789')).toBe(false)
    expect(isResidentCertificateNumber('1A23456789')).toBe(false)
    expect(isResidentCertificateNumber('A123456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isResidentCertificateNumber('AA00000009')).toBe(true)
    expect(isResidentCertificateNumber('AB00207171')).toBe(true)
    expect(isResidentCertificateNumber('AC03095424')).toBe(true)
    expect(isResidentCertificateNumber('BD01300667')).toBe(true)
    expect(isResidentCertificateNumber('CC00151114')).toBe(true)
    expect(isResidentCertificateNumber('HD02717288')).toBe(true)
    expect(isResidentCertificateNumber('TD00251124')).toBe(true)
    expect(isResidentCertificateNumber('AD30196818')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isResidentCertificateNumber('aa00000009')).toBe(false)
    expect(isResidentCertificateNumber('AA00000000')).toBe(false)
    expect(isResidentCertificateNumber('FG31104091')).toBe(false)
    expect(isResidentCertificateNumber('OY58238842')).toBe(false)
  })
})
