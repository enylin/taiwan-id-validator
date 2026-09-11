const E_INVOICE_DONATION_CODE_PATTERN = /^\d{3,7}$/

/** Verify an E-Invoice Donation Code (電子發票捐贈碼). */
export function isDonateCode(input: string): boolean {
  return (
    typeof input === 'string' && E_INVOICE_DONATION_CODE_PATTERN.test(input)
  )
}
