const CITIZEN_DIGITAL_CERTIFICATE_PATTERN = /^[A-Z]{2}\d{14}$/

/** Verify a Citizen Digital Certificate barcode (自然人憑證條碼). */
export function isCdcNumber(input: string): boolean {
  return (
    typeof input === 'string' && CITIZEN_DIGITAL_CERTIFICATE_PATTERN.test(input)
  )
}
