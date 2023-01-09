import { isCreditCardNumberValid } from './credit-card-number'

describe('isCreditCardNumberValid', () => {
  it('should only accept strings with length 12 ~ 19', () => {
    expect(isCreditCardNumberValid({} as string)).toBe(false)
    expect(isCreditCardNumberValid(123456789 as unknown as string)).toBe(false)
    expect(isCreditCardNumberValid(undefined as unknown as string)).toBe(false)
    expect(isCreditCardNumberValid('1234567890')).toBe(false)
    expect(isCreditCardNumberValid('12345678901234567890')).toBe(false)
  })

  it('should return false if the input contains invalid char', () => {
    expect(isCreditCardNumberValid('123456789012345a')).toBe(false)
    expect(isCreditCardNumberValid('123456789012345;')).toBe(false)
    expect(isCreditCardNumberValid('123456789012345$')).toBe(false)
  })

  it('should return true if the input card number belongs to American Express', () => {
    expect(
      isCreditCardNumberValid('348282246310002', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('371449635398431', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Diners Club', () => {
    expect(
      isCreditCardNumberValid('30569309025904', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('38520000023237', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Discover', () => {
    expect(
      isCreditCardNumberValid('6011111111111117', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('6011000990139424', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to JCB', () => {
    expect(
      isCreditCardNumberValid('3530111333300000', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('3566002020360505', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to MasterCard', () => {
    expect(
      isCreditCardNumberValid('5555555555554444', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('5105105105105100', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Visa', () => {
    expect(
      isCreditCardNumberValid('4111111111111111', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('4012888888881881', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to UnionPay', () => {
    expect(
      isCreditCardNumberValid('6221260000000000', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('6221260000000091', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Maestro', () => {
    expect(
      isCreditCardNumberValid('6759649826438453', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('6759649826438461', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return true if the input card number belongs to Switch', () => {
    expect(
      isCreditCardNumberValid('6331101999990016', { checkIssuer: true })
    ).toBe(true)
    expect(
      isCreditCardNumberValid('6331101999990024', { checkIssuer: true })
    ).toBe(true)
  })

  it('should return false if the input card number does not belong to any issuer', () => {
    expect(
      isCreditCardNumberValid('1234567890123456', { checkIssuer: true })
    ).toBe(false)
    expect(
      isCreditCardNumberValid('1234567890123464', { checkIssuer: true })
    ).toBe(false)
  })

  it('should return true if checkIssuer is false', () => {
    expect(
      isCreditCardNumberValid('1234567890123452', { checkIssuer: false })
    ).toBe(true)
    expect(isCreditCardNumberValid('0123456789012347', {})).toBe(true)
  })

  it('should return false if the input card number is invalid', () => {
    expect(isCreditCardNumberValid('1234567890123456')).toBe(false)
    expect(isCreditCardNumberValid('0123456789012345')).toBe(false)
  })
})
