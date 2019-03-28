import { isGuiNumberValid } from '../src/index'

describe('isGuiNumValid', () => {
  it('should only accpet 8-digit string', () => {
    expect(isGuiNumberValid(12345678)).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isGuiNumberValid('12345678')).toBe(true)
    expect(isGuiNumberValid('12345679')).toBe(true) // 6th char is 7
  })

  it('should return false if the input is incorrect', () => {
    expect(isGuiNumberValid('1234567')).toBe(false)
    expect(isGuiNumberValid('123456789')).toBe(false)
    expect(isGuiNumberValid('12345668')).toBe(false)
  })
})