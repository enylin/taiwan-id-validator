export type BanValidationOptions = {
  /** Validate `input` with the legacy checksum rule. */
  applyOldRules?: boolean
}

const BAN_PATTERN = /^\d{8}$/
const BAN_COEFFICIENTS = [1, 2, 1, 2, 1, 2, 4, 1] as const

/** Verify a Business Administration Number (營利事業統一編號). */
export function isBan(
  input: string,
  options: BanValidationOptions = {}
): boolean {
  if (typeof input !== 'string' || !BAN_PATTERN.test(input)) return false

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
