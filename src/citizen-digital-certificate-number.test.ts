import { isCdcNumber } from './citizen-digital-certificate-number'

describe('isCdcNumber', () => {
  it('should only accept strings with length 16', () => {
    expect(isCdcNumber({} as string)).toBe(false)
    expect(isCdcNumber(47809425348791 as unknown as string)).toBe(false)
    expect(isCdcNumber(undefined as unknown as string)).toBe(false)
    expect(isCdcNumber('AB123456789012345')).toBe(false)
    expect(isCdcNumber('AB1234567890123')).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isCdcNumber('AB12345678901234')).toBe(true)
    expect(isCdcNumber('RP47809425348791')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isCdcNumber('ab12345678901234')).toBe(false)
    expect(isCdcNumber('A112345678901234')).toBe(false)
    expect(isCdcNumber('9B12345678901234')).toBe(false)
    expect(isCdcNumber('AA123456789012J4')).toBe(false)
  })
})
