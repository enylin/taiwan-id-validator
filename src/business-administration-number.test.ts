import { isBan } from './business-administration-number'

describe('isBan', () => {
  it('should only accept an 8-digit string', () => {
    expect(isBan({} as string)).toBe(false)
    expect(isBan(undefined as unknown as string)).toBe(false)
    expect(isBan(12345676 as unknown as string)).toBe(false)
  })

  it('should return true if the input is correct', () => {
    expect(isBan('12345670')).toBe(true)
    expect(isBan('12345671')).toBe(true)
    expect(isBan('12345675')).toBe(true)
    expect(isBan('12345676')).toBe(true) // 7th char is 7
    expect(isBan('04595257')).toBe(true)
  })

  it('should validate official current-rule examples', () => {
    expect(isBan('04595252')).toBe(true)
    expect(isBan('10458575')).toBe(true)
    expect(isBan('10458574')).toBe(true)
    expect(isBan('10458570')).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isBan('1234567')).toBe(false)
    expect(isBan('123456769')).toBe(false)
    expect(isBan('12345678')).toBe(false)
    expect(isBan('12345672')).toBe(false)
    expect(isBan('04595253')).toBe(false)
  })
})

describe('isBan using old rules', () => {
  const applyOldRules = true

  it('should return true if the input is correct', () => {
    expect(isBan('12345675', { applyOldRules })).toBe(true)
    expect(isBan('12345676', { applyOldRules })).toBe(true) // 7th char is 7
    expect(isBan('04595257', { applyOldRules })).toBe(true)
    expect(isBan('10458575', { applyOldRules })).toBe(true)
    expect(isBan('10458574', { applyOldRules })).toBe(true)
  })

  it('should return false if the input is incorrect', () => {
    expect(isBan('1234567', { applyOldRules })).toBe(false)
    expect(isBan('123456769', { applyOldRules })).toBe(false)
    expect(isBan('12345678', { applyOldRules })).toBe(false)
    expect(isBan('12345670', { applyOldRules })).toBe(false)
    expect(isBan('12345671', { applyOldRules })).toBe(false)
    expect(isBan('04595252', { applyOldRules })).toBe(false)
    expect(isBan('10458570', { applyOldRules })).toBe(false)
  })
})
