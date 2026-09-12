import type { ValidationResult } from './validation-result.js'

export type DonateCodeValidationFailureReason =
  'INVALID_INPUT_TYPE' | 'INVALID_LENGTH' | 'INVALID_CHARACTER'

export type DonateCodeValidationResult =
  ValidationResult<DonateCodeValidationFailureReason>

const E_INVOICE_DONATION_CODE_PATTERN = /^\d{3,7}$/

/** Verify an E-Invoice Donation Code (電子發票捐贈碼). */
export function isDonateCode(input: string): boolean {
  return getDonateCodeFailureReason(input) === null
}

/** Validate an E-Invoice Donation Code and return the failure reason. */
export function validateDonateCode(input: unknown): DonateCodeValidationResult {
  const reason = getDonateCodeFailureReason(input)
  return reason === null ? { valid: true } : { valid: false, reason }
}

function getDonateCodeFailureReason(
  input: unknown
): DonateCodeValidationFailureReason | null {
  if (typeof input !== 'string') return 'INVALID_INPUT_TYPE'
  if (input.length < 3 || input.length > 7) return 'INVALID_LENGTH'
  if (!E_INVOICE_DONATION_CODE_PATTERN.test(input)) return 'INVALID_CHARACTER'

  return null
}
