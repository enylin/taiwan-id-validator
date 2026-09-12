import type { ValidationResult } from './validation-result.js'

export type BanValidationOptions = {
  /** Validate `input` with the legacy checksum rule. */
  applyOldRules?: boolean
}

export type BanValidationFailureReason =
  | 'INVALID_INPUT_TYPE'
  | 'INVALID_LENGTH'
  | 'INVALID_CHARACTER'
  | 'INVALID_CHECKSUM'

export type BanValidationResult = ValidationResult<BanValidationFailureReason>

const BAN_PATTERN = /^\d{8}$/
const BAN_COEFFICIENTS = [1, 2, 1, 2, 1, 2, 4, 1] as const

/** Verify a Business Administration Number (營利事業統一編號). */
export function isBan(
  input: string,
  options: BanValidationOptions = {}
): boolean {
  return getBanFailureReason(input, options) === null
}

/** Validate a Business Administration Number and return the failure reason. */
export function validateBan(
  input: unknown,
  options: BanValidationOptions = {}
): BanValidationResult {
  const reason = getBanFailureReason(input, options)
  return reason === null ? { valid: true } : { valid: false, reason }
}

function getBanFailureReason(
  input: unknown,
  options: BanValidationOptions
): BanValidationFailureReason | null {
  if (typeof input !== 'string') return 'INVALID_INPUT_TYPE'
  if (input.length !== 8) return 'INVALID_LENGTH'
  if (!BAN_PATTERN.test(input)) return 'INVALID_CHARACTER'

  return hasValidChecksum(input, options) ? null : 'INVALID_CHECKSUM'
}

function hasValidChecksum(
  input: string,
  options: BanValidationOptions
): boolean {
  const checksum = input.split('').reduce((sum, character, index) => {
    const product = Number(character) * BAN_COEFFICIENTS[index]
    return sum + Math.floor(product / 10) + (product % 10)
  }, 0)

  const divisor = options.applyOldRules ? 10 : 5
  const seventhDigitIsSeven = input[6] === '7'

  return (
    checksum % divisor === 0 ||
    (seventhDigitIsSeven && (checksum + 1) % divisor === 0)
  )
}
