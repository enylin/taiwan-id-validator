import { isIdCardNumber } from './id-card-number'

describe('isIdCardNumber', () => {
  describe('National ID tests', () => {
    const nationalIdOptions = {
      nationalId: true,
      uiNumber: false
    }

    it('should validate a correct national ID number', () => {
      expect(isIdCardNumber('A123456789', nationalIdOptions)).toBe(true)
      expect(isIdCardNumber('F131104093', nationalIdOptions)).toBe(true)
      expect(isIdCardNumber('O158238845', nationalIdOptions)).toBe(true)
      expect(isIdCardNumber('N116247806', nationalIdOptions)).toBe(true)
      expect(isIdCardNumber('L122544270', nationalIdOptions)).toBe(true)
      expect(isIdCardNumber('C180661564', nationalIdOptions)).toBe(true)
      expect(isIdCardNumber('Y123456788', nationalIdOptions)).toBe(true)
    })

    it('should invalidate an incorrect national ID number', () => {
      expect(isIdCardNumber('A12345678', nationalIdOptions)).toBe(false)
      expect(isIdCardNumber('a123456789', nationalIdOptions)).toBe(false)
      expect(isIdCardNumber('A123456788', nationalIdOptions)).toBe(false)
      expect(isIdCardNumber('F131104091', nationalIdOptions)).toBe(false)
      expect(isIdCardNumber('O158238842', nationalIdOptions)).toBe(false)
    })

    it('should invalidate a national ID number when nationalId option is false', () => {
      expect(
        isIdCardNumber('A123456789', {
          nationalId: false,
          uiNumber: false
        })
      ).toBe(false)
    })
  })

  describe('Old format UI number tests', () => {
    const oldFormatUiNumberOptions = {
      nationalId: false,
      uiNumber: {
        newFormat: false,
        oldFormat: true
      }
    }

    it('should validate a correct old format UI number', () => {
      expect(isIdCardNumber('AB23456789', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('AA00000009', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('AB00207171', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('AC03095424', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('BD01300667', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('CC00151114', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('HD02717288', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('TD00251124', oldFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('AD30196818', oldFormatUiNumberOptions)).toBe(true)
    })

    it('should invalidate an incorrect old format UI number', () => {
      expect(isIdCardNumber('AA1234567', oldFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('aa00000009', oldFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('AA00000000', oldFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('FG31104091', oldFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('OY58238842', oldFormatUiNumberOptions)).toBe(false)
    })

    it('should only accept strings begin with 2 English letters where the second letter is in [A-D]', () => {
      expect(isIdCardNumber('2123456789', oldFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('1A23456789', oldFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('A123456789', oldFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('AE23456785', oldFormatUiNumberOptions)).toBe(false)
    })
  })

  describe('New format UI number tests', () => {
    const newFormatUiNumberOptions = {
      nationalId: false,
      uiNumber: {
        newFormat: true,
        oldFormat: false
      }
    }
    it('should only accept strings begin with 1 English letters', () => {
      expect(isIdCardNumber('2123456789', newFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('1A23456789', newFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('AA23456789', newFormatUiNumberOptions)).toBe(false)
    })

    it('should invalidate a UI number when the first number is not 8 or 9', () => {
      expect(isIdCardNumber('A323456789', newFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('A423456789', newFormatUiNumberOptions)).toBe(false)
    })

    it('should validate a correct new format UI number', () => {
      expect(isIdCardNumber('A800000014', newFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('A900207177', newFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('A803095426', newFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('B801300667', newFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('C800151116', newFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('H802717288', newFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('T900251126', newFormatUiNumberOptions)).toBe(true)
      expect(isIdCardNumber('A930196810', newFormatUiNumberOptions)).toBe(true)
    })

    it('should invalidate an incorrect new format UI number', () => {
      expect(isIdCardNumber('a800000009', newFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('A800000000', newFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('F931104091', newFormatUiNumberOptions)).toBe(false)
      expect(isIdCardNumber('O958238842', newFormatUiNumberOptions)).toBe(false)
    })

    it('should validate a correct new format UI number for foreign or stateless resident', () => {
      expect(
        isIdCardNumber('A800000014', {
          nationalId: false,
          uiNumber: {
            oldFormat: false,
            newFormat: {
              foreignOrStateless: true,
              statelessResident: false,
              hkMacaoResident: false,
              mainlandChinaResident: false
            }
          }
        })
      ).toBe(true)
    })

    it('should validate a correct new format UI number for stateless resident', () => {
      expect(
        isIdCardNumber('A870000015', {
          nationalId: false,
          uiNumber: {
            oldFormat: false,
            newFormat: {
              foreignOrStateless: false,
              statelessResident: true,
              hkMacaoResident: false,
              mainlandChinaResident: false
            }
          }
        })
      ).toBe(true)
    })

    it('should validate a correct new format UI number for HK/Macao resident', () => {
      expect(
        isIdCardNumber('A880000018', {
          nationalId: false,
          uiNumber: {
            oldFormat: false,
            newFormat: {
              foreignOrStateless: false,
              statelessResident: false,
              hkMacaoResident: true,
              mainlandChinaResident: false
            }
          }
        })
      ).toBe(true)
    })

    it('should validate a correct new format UI number for mainland China resident', () => {
      expect(
        isIdCardNumber('A890000011', {
          nationalId: false,
          uiNumber: {
            oldFormat: false,
            newFormat: {
              foreignOrStateless: false,
              statelessResident: false,
              hkMacaoResident: false,
              mainlandChinaResident: true
            }
          }
        })
      ).toBe(true)
    })

    it('should invalidate an incorrect new format UI number', () => {
      expect(
        isIdCardNumber('A8923456', {
          nationalId: false,
          uiNumber: {
            oldFormat: false,
            newFormat: true
          }
        })
      ).toBe(false)
    })
  })

  describe('Default options tests', () => {
    it('should validate a national ID number by default', () => {
      expect(isIdCardNumber('A123456789')).toBe(true)
    })

    it('should invalidate an ID number with an incorrect format and default options', () => {
      expect(isIdCardNumber('A123456780')).toBe(false)
    })

    it('should validate an old format UI number by default', () => {
      expect(isIdCardNumber('AB23456789')).toBe(true)
    })

    it('should validate a new format UI number for foreign or stateless resident by default', () => {
      expect(isIdCardNumber('A800000014')).toBe(true)
    })

    it('should validate a new format UI number for stateless resident by default', () => {
      expect(isIdCardNumber('A870000015')).toBe(true)
    })

    it('should validate a new format UI number for HK/Macao resident by default', () => {
      expect(isIdCardNumber('A880000018')).toBe(true)
    })

    it('should validate a new format UI number for mainland China resident by default', () => {
      expect(isIdCardNumber('A890000011')).toBe(true)
    })
  })

  // General tests
  it('should invalidate an ID number with an incorrect format', () => {
    expect(isIdCardNumber('1234567890')).toBe(false)
  })

  it('should validate a national ID number by default', () => {
    expect(isIdCardNumber('A123456789')).toBe(true)
  })

  it('should invalidate an empty string', () => {
    expect(isIdCardNumber('')).toBe(false)
  })

  it('should invalidate a non-string input', () => {
    expect(isIdCardNumber(123456789 as unknown as string)).toBe(false)
  })

  it('should only accept strings with length 10', () => {
    expect(isIdCardNumber({} as string)).toBe(false)
    expect(isIdCardNumber(123456789 as unknown as string)).toBe(false)
    expect(isIdCardNumber(undefined as unknown as string)).toBe(false)
    expect(isIdCardNumber('A1234567899')).toBe(false)
    expect(isIdCardNumber('A12345678')).toBe(false)
  })

  it('should only accept strings Begin with English letter', () => {
    expect(isIdCardNumber('2123456789')).toBe(false)
    expect(isIdCardNumber('1123456789')).toBe(false)
  })

  it('should return false if the first number is not in [1, 2, 8, 9]', () => {
    expect(isIdCardNumber('A323456789')).toBe(false)
    expect(isIdCardNumber('A423456789')).toBe(false)
    expect(isIdCardNumber('A523456789')).toBe(false)
    expect(isIdCardNumber('A623456789')).toBe(false)
    expect(isIdCardNumber('A723456789')).toBe(false)
  })
})
