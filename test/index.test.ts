import {
  isGuiNumberValid,
  isNationalIdentificationNumberValid,
  isOriginalResidentCertificateNumberValid,
  isNewResidentCertificateNumberValid,
  isResidentCertificateNumberValid,
  isCitizenDigitalCertificateNumberValid,
  isEInvoiceCellPhoneBarcodeValid,
  isEInvoiceDonateCodeValid,
  isGUI,
  isNI,
  isRC,
  isNewRC,
  isOriginalRC,
  isCDC,
  isCellPhoneBarcode,
  isDonateCode,
  isCreditCardNumberValid,
  isCreditCard
} from '../src/index'

describe('isGuiNumValid', () => {
  it('should only accept 8-digit of string or number', () => {
    expect(isGuiNumberValid({} as number)).toBe(false)
    expect(isGuiNumberValid(undefined as unknown as string)).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isGuiNumberValid(12345676)).toBe(true)
    expect(isGuiNumberValid('12345670')).toBe(true)
    expect(isGuiNumberValid('12345671')).toBe(true)
    expect(isGuiNumberValid('12345675')).toBe(true)
    expect(isGuiNumberValid('12345676')).toBe(true) // 6th char is 7
    expect(isGuiNumberValid('04595257')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isGuiNumberValid('1234567')).toBe(false)
    expect(isGuiNumberValid(1234567)).toBe(false)
    expect(isGuiNumberValid('123456769')).toBe(false)
    expect(isGuiNumberValid(123456769)).toBe(false)
    expect(isGuiNumberValid('12345678')).toBe(false)
    expect(isGuiNumberValid('12345672')).toBe(false)
    expect(isGuiNumberValid('04595253')).toBe(false)
  })
})

describe('isGuiNumValid extended format', () => {
  it('should return true if the input is correct', () => {
    expect(isGuiNumberValid(12345676)).toBe(true)
    expect(isGuiNumberValid('12345675', false)).toBe(true)
    expect(isGuiNumberValid('12345676', false)).toBe(true) // 6th char is 7
    expect(isGuiNumberValid('04595257', false)).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isGuiNumberValid('1234567', false)).toBe(false)
    expect(isGuiNumberValid(1234567, false)).toBe(false)
    expect(isGuiNumberValid('123456769', false)).toBe(false)
    expect(isGuiNumberValid(123456769, false)).toBe(false)
    expect(isGuiNumberValid('12345678', false)).toBe(false)
    expect(isGuiNumberValid('12345670', false)).toBe(false)
    expect(isGuiNumberValid('12345671', false)).toBe(false)
    expect(isGuiNumberValid('04595252', false)).toBe(false)
  })
})

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

describe('isNationalIdentificationNumberValid', () => {
  it('should only accept strings with length 12 ~ 19', () => {
    expect(isCreditCardNumberValid({} as string)).toBe(false)
    expect(
      isCreditCardNumberValid(123456789 as unknown as string)
    ).toBe(false)
    expect(
      isCreditCardNumberValid(undefined as unknown as string)
    ).toBe(false)
    expect(isCreditCardNumberValid('1234567890')).toBe(false)
    expect(isCreditCardNumberValid('12345678901234567890')).toBe(false)
  })

  it('should return false if the input contains invalid char', () => {
    expect(isCreditCardNumberValid('123456789012345a')).toBe(false)
    expect(isCreditCardNumberValid('123456789012345;')).toBe(false)
    expect(isCreditCardNumberValid('123456789012345$')).toBe(false)
  })

  it('should return true if the input card number belongs to American Express', () => {
    expect(isCreditCardNumberValid('348282246310002', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('371449635398431', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to Diners Club', () => {
    expect(isCreditCardNumberValid('30569309025904', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('38520000023237', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to Discover', () => {
    expect(isCreditCardNumberValid('6011111111111117', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('6011000990139424', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to JCB', () => {
    expect(isCreditCardNumberValid('3530111333300000', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('3566002020360505', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to MasterCard', () => {
    expect(isCreditCardNumberValid('5555555555554444', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('5105105105105100', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to Visa', () => {
    expect(isCreditCardNumberValid('4111111111111111', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('4012888888881881', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to UnionPay', () => {
    expect(isCreditCardNumberValid('6221260000000000', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('6221260000000091', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to Maestro', () => {
    expect(isCreditCardNumberValid('6759649826438453', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('6759649826438461', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return true if the input card number belongs to Switch', () => {
    expect(isCreditCardNumberValid('6331101999990016', { checkIssuerRegexes: true })).toBe(true)
    expect(isCreditCardNumberValid('6331101999990024', { checkIssuerRegexes: true })).toBe(true)
  })

  it('should return false if the input card number does not belong to any issuer', () => {
    expect(isCreditCardNumberValid('1234567890123456', { checkIssuerRegexes: true })).toBe(false)
    expect(isCreditCardNumberValid('1234567890123464', { checkIssuerRegexes: true })).toBe(false)
  })

  it('should return true if checkIssuerRegexes is false', () => {
    expect(isCreditCardNumberValid('1234567890123452', { checkIssuerRegexes: false })).toBe(true)
    expect(isCreditCardNumberValid('0123456789012347', {})).toBe(true)
  })

  it('should return false if the input card number is invalid', () => {
    expect(isCreditCardNumberValid('1234567890123456')).toBe(false)
    expect(isCreditCardNumberValid('0123456789012345')).toBe(false)
  })
})

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
