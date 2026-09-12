import { isBan, validateBan } from './business-administration-number'
import {
  isCdcNumber,
  validateCdcNumber
} from './citizen-digital-certificate-number'
import { isDonateCode, validateDonateCode } from './e-invoice-donate-code'
import {
  isMobileBarcode,
  validateMobileBarcode
} from './e-invoice-mobile-barcode'
import { isIdCardNumber, validateIdCardNumber } from './id-card-number'

describe('detailed validation', () => {
  describe('validateBan', () => {
    it('returns deterministic failure reasons in precedence order', () => {
      expect(validateBan(12345678)).toMatchObject({
        valid: false,
        reason: 'INVALID_INPUT_TYPE'
      })
      expect(validateBan('ABC')).toMatchObject({
        valid: false,
        reason: 'INVALID_LENGTH'
      })
      expect(validateBan('12AB5678')).toMatchObject({
        valid: false,
        reason: 'INVALID_CHARACTER'
      })
      expect(validateBan('12345678')).toMatchObject({
        valid: false,
        reason: 'INVALID_CHECKSUM'
      })
    })

    it('returns valid for current and legacy checksum rules', () => {
      expect(validateBan('04595252')).toMatchObject({ valid: true })
      expect(validateBan('04595257', { applyOldRules: true })).toMatchObject({
        valid: true
      })
    })

    it('stays aligned with isBan', () => {
      for (const input of ['04595252', '04595253', '12345678', '12AB5678']) {
        expect(validateBan(input).valid).toBe(isBan(input))
      }
    })
  })

  describe('validateCdcNumber', () => {
    it('returns deterministic failure reasons in precedence order', () => {
      expect(validateCdcNumber(123)).toMatchObject({
        valid: false,
        reason: 'INVALID_INPUT_TYPE'
      })
      expect(validateCdcNumber('AB123')).toMatchObject({
        valid: false,
        reason: 'INVALID_LENGTH'
      })
      expect(validateCdcNumber('ABC2345678901234')).toMatchObject({
        valid: false,
        reason: 'INVALID_FORMAT'
      })
    })

    it('returns valid for a correctly formatted barcode', () => {
      expect(validateCdcNumber('AB12345678901234')).toMatchObject({
        valid: true
      })
    })

    it('stays aligned with isCdcNumber', () => {
      for (const input of ['AB12345678901234', 'ab12345678901234', 'AB12345']) {
        expect(validateCdcNumber(input).valid).toBe(isCdcNumber(input))
      }
    })
  })

  describe('validateDonateCode', () => {
    it('returns deterministic failure reasons in precedence order', () => {
      expect(validateDonateCode(123)).toMatchObject({
        valid: false,
        reason: 'INVALID_INPUT_TYPE'
      })
      expect(validateDonateCode('A')).toMatchObject({
        valid: false,
        reason: 'INVALID_LENGTH'
      })
      expect(validateDonateCode('12A')).toMatchObject({
        valid: false,
        reason: 'INVALID_CHARACTER'
      })
    })

    it('returns valid for a correctly formatted donation code', () => {
      expect(validateDonateCode('001')).toMatchObject({ valid: true })
    })

    it('stays aligned with isDonateCode', () => {
      for (const input of ['001', '12A', '00', '12345678']) {
        expect(validateDonateCode(input).valid).toBe(isDonateCode(input))
      }
    })
  })

  describe('validateMobileBarcode', () => {
    it('returns deterministic failure reasons in precedence order', () => {
      expect(validateMobileBarcode(123)).toMatchObject({
        valid: false,
        reason: 'INVALID_INPUT_TYPE'
      })
      expect(validateMobileBarcode('ABC')).toMatchObject({
        valid: false,
        reason: 'INVALID_LENGTH'
      })
      expect(validateMobileBarcode('ABC12345')).toMatchObject({
        valid: false,
        reason: 'INVALID_PREFIX'
      })
      expect(validateMobileBarcode('/ABC_123')).toMatchObject({
        valid: false,
        reason: 'INVALID_CHARACTER'
      })
    })

    it('returns valid for a correctly formatted mobile barcode', () => {
      expect(validateMobileBarcode('/+.-++..')).toMatchObject({ valid: true })
    })

    it('stays aligned with isMobileBarcode', () => {
      for (const input of ['/+.-++..', 'ABC12345', '/ABC_123', '/ABCD12']) {
        expect(validateMobileBarcode(input).valid).toBe(isMobileBarcode(input))
      }
    })
  })

  describe('validateIdCardNumber', () => {
    it.each([
      ['A123456789', 'NATIONAL_ID'],
      ['AB23456789', 'UI_NUMBER_LEGACY'],
      ['A800000014', 'UI_NUMBER_FOREIGN_OR_STATELESS'],
      ['A870000015', 'UI_NUMBER_NATIONAL_WITHOUT_HOUSEHOLD_REGISTRATION'],
      ['A880000018', 'UI_NUMBER_HK_MACAO_RESIDENT'],
      ['A890000011', 'UI_NUMBER_MAINLAND_CHINA_RESIDENT']
    ] as const)('classifies %s as %s', (input, category) => {
      expect(validateIdCardNumber(input)).toMatchObject({
        valid: true,
        category
      })
    })

    it('returns uncategorized failure reasons before checksum validation', () => {
      expect(validateIdCardNumber(1234567890)).toMatchObject({
        valid: false,
        reason: 'INVALID_INPUT_TYPE'
      })
      expect(validateIdCardNumber('A123')).toMatchObject({
        valid: false,
        reason: 'INVALID_LENGTH'
      })
      expect(validateIdCardNumber('A323456789')).toMatchObject({
        valid: false,
        reason: 'INVALID_FORMAT'
      })
    })

    it('keeps the detected category when checksum validation fails', () => {
      expect(validateIdCardNumber('A123456788')).toMatchObject({
        valid: false,
        reason: 'INVALID_CHECKSUM',
        category: 'NATIONAL_ID'
      })
    })

    it('returns CATEGORY_NOT_ALLOWED only for an otherwise valid number', () => {
      expect(
        validateIdCardNumber('A123456789', {
          nationalId: false,
          uiNumber: false
        })
      ).toMatchObject({
        valid: false,
        reason: 'CATEGORY_NOT_ALLOWED',
        category: 'NATIONAL_ID'
      })

      expect(
        validateIdCardNumber('A800000014', {
          uiNumber: false
        })
      ).toMatchObject({
        valid: false,
        reason: 'CATEGORY_NOT_ALLOWED',
        category: 'UI_NUMBER_FOREIGN_OR_STATELESS'
      })

      expect(
        validateIdCardNumber('A800000014', {
          uiNumber: {
            newFormat: {
              foreignOrStateless: false
            }
          }
        })
      ).toMatchObject({
        valid: false,
        reason: 'CATEGORY_NOT_ALLOWED',
        category: 'UI_NUMBER_FOREIGN_OR_STATELESS'
      })
    })

    it('checks checksum before category options', () => {
      expect(
        validateIdCardNumber('A800000000', {
          uiNumber: false
        })
      ).toMatchObject({
        valid: false,
        reason: 'INVALID_CHECKSUM',
        category: 'UI_NUMBER_FOREIGN_OR_STATELESS'
      })
    })

    it('treats explicit undefined options the same as omitted values', () => {
      expect(validateIdCardNumber('A123456789', undefined)).toEqual(
        validateIdCardNumber('A123456789', {})
      )
      expect(
        validateIdCardNumber('A123456789', { nationalId: undefined })
      ).toEqual(validateIdCardNumber('A123456789', {}))
      expect(
        validateIdCardNumber('A800000014', { uiNumber: undefined })
      ).toEqual(validateIdCardNumber('A800000014', {}))
      expect(
        validateIdCardNumber('AB23456789', {
          uiNumber: { oldFormat: undefined }
        })
      ).toEqual(
        validateIdCardNumber('AB23456789', {
          uiNumber: {}
        })
      )
      expect(
        validateIdCardNumber('A800000014', {
          uiNumber: { newFormat: undefined }
        })
      ).toEqual(
        validateIdCardNumber('A800000014', {
          uiNumber: {}
        })
      )
      expect(
        validateIdCardNumber('A800000014', {
          uiNumber: {
            newFormat: { foreignOrStateless: undefined }
          }
        })
      ).toEqual(
        validateIdCardNumber('A800000014', {
          uiNumber: { newFormat: {} }
        })
      )
      expect(
        validateIdCardNumber('A870000015', {
          uiNumber: {
            newFormat: { nationalWithoutHouseholdRegistration: undefined }
          }
        })
      ).toEqual(
        validateIdCardNumber('A870000015', {
          uiNumber: { newFormat: {} }
        })
      )
      expect(
        validateIdCardNumber('A880000018', {
          uiNumber: {
            newFormat: { hkMacaoResident: undefined }
          }
        })
      ).toEqual(
        validateIdCardNumber('A880000018', {
          uiNumber: { newFormat: {} }
        })
      )
      expect(
        validateIdCardNumber('A890000011', {
          uiNumber: {
            newFormat: { mainlandChinaResident: undefined }
          }
        })
      ).toEqual(
        validateIdCardNumber('A890000011', {
          uiNumber: { newFormat: {} }
        })
      )
    })

    it('stays aligned with isIdCardNumber', () => {
      const inputs = [
        'A123456789',
        'A123456788',
        'AB23456789',
        'A800000014',
        'A323456789'
      ]
      const options = [
        {},
        { nationalId: false },
        { uiNumber: false },
        { uiNumber: { oldFormat: false } },
        {
          uiNumber: {
            newFormat: { foreignOrStateless: false }
          }
        }
      ]

      for (const input of inputs) {
        for (const option of options) {
          expect(validateIdCardNumber(input, option).valid).toBe(
            isIdCardNumber(input, option)
          )
        }
      }
    })
  })
})
