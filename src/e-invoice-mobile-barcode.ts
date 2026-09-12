import type { ValidationResult } from './validation-result.js'

export type MobileBarcodeValidationFailureReason =
  | 'INVALID_INPUT_TYPE'
  | 'INVALID_LENGTH'
  | 'INVALID_PREFIX'
  | 'INVALID_CHARACTER'

export type MobileBarcodeValidationResult =
  ValidationResult<MobileBarcodeValidationFailureReason>

const E_INVOICE_MOBILE_BARCODE_PATTERN = /^\/[\dA-Z.\-+]{7}$/

/** Verify an E-Invoice Mobile Barcode (電子發票手機條碼). */
export function isMobileBarcode(input: string): boolean {
  return getMobileBarcodeFailureReason(input) === null
}

/** Validate an E-Invoice Mobile Barcode and return the failure reason. */
export function validateMobileBarcode(
  input: unknown
): MobileBarcodeValidationResult {
  const reason = getMobileBarcodeFailureReason(input)
  return reason === null ? { valid: true } : { valid: false, reason }
}

function getMobileBarcodeFailureReason(
  input: unknown
): MobileBarcodeValidationFailureReason | null {
  if (typeof input !== 'string') return 'INVALID_INPUT_TYPE'
  if (input.length !== 8) return 'INVALID_LENGTH'
  if (input[0] !== '/') return 'INVALID_PREFIX'
  if (!E_INVOICE_MOBILE_BARCODE_PATTERN.test(input)) return 'INVALID_CHARACTER'

  return null
}
