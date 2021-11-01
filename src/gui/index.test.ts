import { isGuiNumberValid, isGUI } from './index'

describe('isGuiNumValid', () => {
  it('should only accept 8-digit of string or number', () => {
    expect(isGuiNumberValid({} as number)).toBe(false)
    expect(isGuiNumberValid(undefined as unknown as string)).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isGuiNumberValid(12345676)).toBe(true)
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
    expect(isGuiNumberValid('12345670')).toBe(false)
    expect(isGuiNumberValid('04595252')).toBe(false)
  })
})

describe('isGuiNumValid extended format', () => {
  it('should return true if the input is correct', () => {
    expect(isGuiNumberValid(12345676)).toBe(true)
    expect(isGuiNumberValid('12345675', true)).toBe(true)
    expect(isGuiNumberValid('12345676', true)).toBe(true) // 6th char is 7
    expect(isGuiNumberValid('12345670', true)).toBe(true)
    expect(isGuiNumberValid('04595257', true)).toBe(true)
    expect(isGuiNumberValid('04595252', true)).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isGuiNumberValid('1234567', true)).toBe(false)
    expect(isGuiNumberValid(1234567, true)).toBe(false)
    expect(isGuiNumberValid('123456769', true)).toBe(false)
    expect(isGuiNumberValid(123456769, true)).toBe(false)
    expect(isGuiNumberValid('12345678', true)).toBe(false)
  })
})

describe('function alias', () => {
  it('should be identical to the original function', () => {
    expect(isGUI).toBe(isGuiNumberValid)
  })
})
