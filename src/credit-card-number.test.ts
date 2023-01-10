import { isCreditCardNumber } from './credit-card-number'

describe('isCreditCardNumber', () => {
  it('should only accept strings with length 12 ~ 19', () => {
    expect(isCreditCardNumber({} as string)).toBe(false)
    expect(isCreditCardNumber(123456789 as unknown as string)).toBe(false)
    expect(isCreditCardNumber(undefined as unknown as string)).toBe(false)
    expect(isCreditCardNumber('1234567890')).toBe(false)
    expect(isCreditCardNumber('12345678901234567890')).toBe(false)
  })

  it('should return false if the input contains invalid char', () => {
    expect(isCreditCardNumber('123456789012345a')).toBe(false)
    expect(isCreditCardNumber('123456789012345;')).toBe(false)
    expect(isCreditCardNumber('123456789012345$')).toBe(false)
  })

  it('should return true if the input card number belongs to American Express', () => {
    expect(
      isCreditCardNumber('348282246310002', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('371449635398431', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Diners Club', () => {
    expect(
      isCreditCardNumber('30569309025904', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('38520000023237', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Discover', () => {
    expect(
      isCreditCardNumber('6011111111111117', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('6011000990139424', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to JCB', () => {
    expect(
      isCreditCardNumber('3530111333300000', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('3566002020360505', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to MasterCard', () => {
    expect(
      isCreditCardNumber('5555555555554444', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('5105105105105100', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Visa', () => {
    expect(
      isCreditCardNumber('4111111111111111', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('4012888888881881', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to UnionPay', () => {
    expect(
      isCreditCardNumber('6221260000000000', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('6221260000000091', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Maestro', () => {
    expect(
      isCreditCardNumber('6759649826438453', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('6759649826438461', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Switch', () => {
    expect(
      isCreditCardNumber('6331101999990016', { applyIssuerRules: true })
    ).toBe(true)
    expect(
      isCreditCardNumber('6331101999990024', { applyIssuerRules: true })
    ).toBe(true)
  })

  it('should return false if the input card number does not belong to any issuer', () => {
    expect(
      isCreditCardNumber('1234567890123456', { applyIssuerRules: true })
    ).toBe(false)
    expect(
      isCreditCardNumber('1234567890123464', { applyIssuerRules: true })
    ).toBe(false)
  })

  it('should return true if applyIssuerRules is false', () => {
    expect(
      isCreditCardNumber('1234567890123452', { applyIssuerRules: false })
    ).toBe(true)
    expect(isCreditCardNumber('0123456789012347', {})).toBe(true)
  })

  it('should return false if the input card number is invalid', () => {
    expect(isCreditCardNumber('1234567890123456')).toBe(false)
    expect(isCreditCardNumber('0123456789012345')).toBe(false)
  })
})
