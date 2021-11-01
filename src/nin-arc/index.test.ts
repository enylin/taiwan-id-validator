import {
  isNationalIdentificationNumberValid,
  isOriginalResidentCertificateNumberValid,
  isNewResidentCertificateNumberValid,
  isResidentCertificateNumberValid,
  isNI,
  isRC,
  isOriginalRC,
  isNewRC
} from './index'

describe('isNationalIdentificationNumberValid', () => {
  it('should only accept strings with length 10', () => {
    expect(isNationalIdentificationNumberValid({} as string)).toBe(false)
    expect(
      isNationalIdentificationNumberValid(123456789 as unknown as string)
    ).toBe(false)
    expect(
      isNationalIdentificationNumberValid(undefined as unknown as string)
    ).toBe(false)
    expect(isNationalIdentificationNumberValid('A1234567899')).toBe(false)
    expect(isNationalIdentificationNumberValid('A12345678')).toBe(false)
  })

  it('should only accept strings Begin with English letter', () => {
    expect(isNationalIdentificationNumberValid('2123456789')).toBe(false)
    expect(isNationalIdentificationNumberValid('1123456789')).toBe(false)
  })

  it('should return false if the first number is not 1 or 2', () => {
    expect(isNationalIdentificationNumberValid('A323456789')).toBe(false)
    expect(isNationalIdentificationNumberValid('A423456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isNationalIdentificationNumberValid('A123456789')).toBe(true)
    expect(isNationalIdentificationNumberValid('F131104093')).toBe(true)
    expect(isNationalIdentificationNumberValid('O158238845')).toBe(true)
    expect(isNationalIdentificationNumberValid('N116247806')).toBe(true)
    expect(isNationalIdentificationNumberValid('L122544270')).toBe(true)
    expect(isNationalIdentificationNumberValid('C180661564')).toBe(true)
    expect(isNationalIdentificationNumberValid('Y123456788')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isNationalIdentificationNumberValid('a123456789')).toBe(false)
    expect(isNationalIdentificationNumberValid('A123456788')).toBe(false)
    expect(isNationalIdentificationNumberValid('F131104091')).toBe(false)
    expect(isNationalIdentificationNumberValid('O158238842')).toBe(false)
  })
})

describe('isOriginalResidentCertificateNumberValid', () => {
  it('should only accept strings with length 10', () => {
    expect(isOriginalResidentCertificateNumberValid({} as string)).toBe(false)
    expect(
      isOriginalResidentCertificateNumberValid(30196818 as unknown as string)
    ).toBe(false)
    expect(
      isOriginalResidentCertificateNumberValid(undefined as unknown as string)
    ).toBe(false)
    expect(isOriginalResidentCertificateNumberValid('AA234567899')).toBe(false)
    expect(isOriginalResidentCertificateNumberValid('AA2345678')).toBe(false)
  })

  it('should only accept strings Begin with 2 English letters', () => {
    expect(isOriginalResidentCertificateNumberValid('2123456789')).toBe(false)
    expect(isOriginalResidentCertificateNumberValid('1A23456789')).toBe(false)
    expect(isOriginalResidentCertificateNumberValid('A123456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isOriginalResidentCertificateNumberValid('AA00000009')).toBe(true)
    expect(isOriginalResidentCertificateNumberValid('AB00207171')).toBe(true)
    expect(isOriginalResidentCertificateNumberValid('AC03095424')).toBe(true)
    expect(isOriginalResidentCertificateNumberValid('BD01300667')).toBe(true)
    expect(isOriginalResidentCertificateNumberValid('CC00151114')).toBe(true)
    expect(isOriginalResidentCertificateNumberValid('HD02717288')).toBe(true)
    expect(isOriginalResidentCertificateNumberValid('TD00251124')).toBe(true)
    expect(isOriginalResidentCertificateNumberValid('AD30196818')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isOriginalResidentCertificateNumberValid('aa00000009')).toBe(false)
    expect(isOriginalResidentCertificateNumberValid('AA00000000')).toBe(false)
    expect(isOriginalResidentCertificateNumberValid('FG31104091')).toBe(false)
    expect(isOriginalResidentCertificateNumberValid('OY58238842')).toBe(false)
  })
})

describe('isNewResidentCertificateNumberValid', () => {
  it('should only accept strings with length 10', () => {
    expect(isNewResidentCertificateNumberValid({} as string)).toBe(false)
    expect(
      isNewResidentCertificateNumberValid(930196810 as unknown as string)
    ).toBe(false)
    expect(
      isNewResidentCertificateNumberValid(undefined as unknown as string)
    ).toBe(false)
    expect(isNewResidentCertificateNumberValid('AA234567899')).toBe(false)
    expect(isNewResidentCertificateNumberValid('AA2345678')).toBe(false)
  })

  it('should only accept strings Begin with 1 English letters', () => {
    expect(isNewResidentCertificateNumberValid('2123456789')).toBe(false)
    expect(isNewResidentCertificateNumberValid('1A23456789')).toBe(false)
    expect(isNewResidentCertificateNumberValid('AA23456789')).toBe(false)
  })

  it('should return false if the first number is not 8 or 9', () => {
    expect(isNationalIdentificationNumberValid('A323456789')).toBe(false)
    expect(isNationalIdentificationNumberValid('A423456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isNewResidentCertificateNumberValid('A800000014')).toBe(true)
    expect(isNewResidentCertificateNumberValid('A900207177')).toBe(true)
    expect(isNewResidentCertificateNumberValid('A803095426')).toBe(true)
    expect(isNewResidentCertificateNumberValid('B801300667')).toBe(true)
    expect(isNewResidentCertificateNumberValid('C800151116')).toBe(true)
    expect(isNewResidentCertificateNumberValid('H802717288')).toBe(true)
    expect(isNewResidentCertificateNumberValid('T900251126')).toBe(true)
    expect(isNewResidentCertificateNumberValid('A930196810')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isNewResidentCertificateNumberValid('a800000009')).toBe(false)
    expect(isNewResidentCertificateNumberValid('A800000000')).toBe(false)
    expect(isNewResidentCertificateNumberValid('F931104091')).toBe(false)
    expect(isNewResidentCertificateNumberValid('O958238842')).toBe(false)
  })
})

describe('isResidentCertificateNumberValid', () => {
  it('should only accept strings with length 10', () => {
    expect(isResidentCertificateNumberValid({} as string)).toBe(false)
    expect(
      isResidentCertificateNumberValid(58238842 as unknown as string)
    ).toBe(false)
    expect(
      isResidentCertificateNumberValid(undefined as unknown as string)
    ).toBe(false)
    expect(isResidentCertificateNumberValid('AA234567899')).toBe(false)
    expect(isResidentCertificateNumberValid('AA2345678')).toBe(false)
  })

  it('should only accept strings Begin with 2 English letters', () => {
    expect(isResidentCertificateNumberValid('2123456789')).toBe(false)
    expect(isResidentCertificateNumberValid('1A23456789')).toBe(false)
    expect(isResidentCertificateNumberValid('A123456789')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isResidentCertificateNumberValid('AA00000009')).toBe(true)
    expect(isResidentCertificateNumberValid('AB00207171')).toBe(true)
    expect(isResidentCertificateNumberValid('AC03095424')).toBe(true)
    expect(isResidentCertificateNumberValid('BD01300667')).toBe(true)
    expect(isResidentCertificateNumberValid('CC00151114')).toBe(true)
    expect(isResidentCertificateNumberValid('HD02717288')).toBe(true)
    expect(isResidentCertificateNumberValid('TD00251124')).toBe(true)
    expect(isResidentCertificateNumberValid('AD30196818')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isResidentCertificateNumberValid('aa00000009')).toBe(false)
    expect(isResidentCertificateNumberValid('AA00000000')).toBe(false)
    expect(isResidentCertificateNumberValid('FG31104091')).toBe(false)
    expect(isResidentCertificateNumberValid('OY58238842')).toBe(false)
  })
})

describe('function alias', () => {
  it('should be identical to the original function', () => {
    expect(isNI).toBe(isNationalIdentificationNumberValid)
    expect(isRC).toBe(isResidentCertificateNumberValid)
    expect(isNewRC).toBe(isNewResidentCertificateNumberValid)
    expect(isOriginalRC).toBe(isOriginalResidentCertificateNumberValid)
  })
})
