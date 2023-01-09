import { isGuiNumberValid } from './gui-number'

describe('isGuiNumber', () => {
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

describe('isGuiNumValid using old format', () => {
  const checkOldFormatOnly = true

  it('should return true if the input is correct', () => {
    expect(isGuiNumberValid(12345676)).toBe(true)
    expect(isGuiNumberValid('12345675', { checkOldFormatOnly })).toBe(true)
    expect(isGuiNumberValid('12345676', { checkOldFormatOnly })).toBe(true) // 6th char is 7
    expect(isGuiNumberValid('04595257', { checkOldFormatOnly })).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isGuiNumberValid('1234567', { checkOldFormatOnly })).toBe(false)
    expect(isGuiNumberValid(1234567, { checkOldFormatOnly })).toBe(false)
    expect(isGuiNumberValid('123456769', { checkOldFormatOnly })).toBe(false)
    expect(isGuiNumberValid(123456769, { checkOldFormatOnly })).toBe(false)
    expect(isGuiNumberValid('12345678', { checkOldFormatOnly })).toBe(false)
    expect(isGuiNumberValid('12345670', { checkOldFormatOnly })).toBe(false)
    expect(isGuiNumberValid('12345671', { checkOldFormatOnly })).toBe(false)
    expect(isGuiNumberValid('04595252', { checkOldFormatOnly })).toBe(false)
  })
})
