import type { ValidationResult } from './validation-result.js'

export type CdcNumberValidationFailureReason =
  'INVALID_INPUT_TYPE' | 'INVALID_LENGTH' | 'INVALID_FORMAT'

export type CdcNumberValidationResult =
  ValidationResult<CdcNumberValidationFailureReason>

const CITIZEN_DIGITAL_CERTIFICATE_PATTERN = /^[A-Z]{2}\d{14}$/

/** Verify a Citizen Digital Certificate barcode (自然人憑證條碼). */
export function isCdcNumber(input: string): boolean {
  return getCdcNumberFailureReason(input) === null
}

/** Validate a Citizen Digital Certificate barcode and return the failure reason. */
export function validateCdcNumber(input: unknown): CdcNumberValidationResult {
  const reason = getCdcNumberFailureReason(input)
  return reason === null ? { valid: true } : { valid: false, reason }
}

function getCdcNumberFailureReason(
  input: unknown
): CdcNumberValidationFailureReason | null {
  if (typeof input !== 'string') return 'INVALID_INPUT_TYPE'
  if (input.length !== 16) return 'INVALID_LENGTH'
  if (!CITIZEN_DIGITAL_CERTIFICATE_PATTERN.test(input)) return 'INVALID_FORMAT'

  return null
}
