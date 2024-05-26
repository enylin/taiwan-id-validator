import { isDonateCode } from './e-invoice-donate-code'

describe('isDonateCode', () => {
  it('should only accept strings with length 3-7', () => {
    expect(isDonateCode({} as string)).toBe(false)
    expect(isDonateCode(undefined as unknown as string)).toBe(false)
    expect(isDonateCode('00')).toBe(false)
    expect(isDonateCode('12345678')).toBe(false)
    expect(isDonateCode(12345678)).toBe(false)
    expect(isDonateCode('ab3456')).toBe(false)
  })

  it('should return false if the input is incorrect', () => {
    expect(isDonateCode('001')).toBe(true)
    expect(isDonateCode('10001')).toBe(true)
    expect(isDonateCode('2134567')).toBe(true)
    expect(isDonateCode(123)).toBe(true)
    expect(isDonateCode(10001)).toBe(true)
    expect(isDonateCode(2134567)).toBe(true)
  })
})
