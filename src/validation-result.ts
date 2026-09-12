export type ValidationResult<Reason extends string> =
  { valid: true } | { valid: false; reason: Reason }
