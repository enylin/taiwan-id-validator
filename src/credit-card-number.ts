export type CreditCardValidationOptions = {
  /**
   * validate `input` with regex
   * (Warning! Card issuers might introduce new card number patterns. Use this in production might cause unexpected results.)
   */
  checkIssuer?: boolean
}

/**
 * Verify the input is a valid credit card number (信用卡卡號)
 *
 * @param { string | number } input credit card number
 * @param { CreditCardValidationOptions } creditCardValidationOptions credit card validation options
 * @returns { boolean } is `input` a valid credit card number
 */
export function isCreditCardNumberValid(
  input: string,
  options: CreditCardValidationOptions = {}
): boolean {
  if (typeof input !== 'string') return false

  const regex = /^[0-9]{12,19}$/

  if (!regex.test(input)) return false

  // ref:
  //   https://stackoverflow.com/questions/9315647/regex-credit-card-number-tests
  //   https://en.wikipedia.org/wiki/Payment_card_number
  const issuerRegexes = [
    /^3[47][0-9]{13}$/, // American Express
    /^(6541|6556)[0-9]{12}$/, // BCGlobal
    /^389[0-9]{11}$/, // Carte Blanche
    /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/, // Diner's Club
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/, // Discover
    /^63[7-9][0-9]{13}$/, // Insta Payment
    /^(?:2131|1800|35\d{3})\d{11}$/, // JCB
    /^9[0-9]{15}$/, // KoreanLocalCard
    /^(6304|6706|6709|6771)[0-9]{12,15}$/, // Laser
    /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/, // Maestro
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/, // Mastercard
    /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/, // Solo
    /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/, // Switch
    /^(62[0-9]{14,17})$/, // Union Pay
    /^4[0-9]{12}(?:[0-9]{3})?$/, // Visa
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/ // Visa Master
  ]

  const { checkIssuer = false } = options

  if (checkIssuer && !issuerRegexes.some(regex => regex.test(input)))
    return false

  // Luhn algorithm
  // ref: https://en.wikipedia.org/wiki/Luhn_algorithm
  const digits = input.split('').map(d => parseInt(d, 10))
  const sum = digits.reverse().reduce((acc, d, i) => {
    if (i % 2 === 0) return acc + d
    return acc + (d * 2 > 9 ? d * 2 - 9 : d * 2)
  }, 0)

  return sum % 10 === 0
}
