const E_INVOICE_MOBILE_BARCODE_PATTERN = /^\/[\dA-Z.\-+]{7}$/

/** Verify an E-Invoice Mobile Barcode (電子發票手機條碼). */
export function isMobileBarcode(input: string): boolean {
  return (
    typeof input === 'string' && E_INVOICE_MOBILE_BARCODE_PATTERN.test(input)
  )
}
