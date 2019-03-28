const GUI_NUMBER_COEFFICIENTS = [1, 2, 1, 2, 1, 2, 4, 1]

export function isGuiNumberValid(input: string | number): boolean {
  try {
    const n = input.toString()
    const regex: RegExp = /^\d{8}$/

    if (!regex.test(n)) {
      throw new Error('GUI number should be a 8-digit string.')
    }

    const checksum = GUI_NUMBER_COEFFICIENTS.reduce(
      (sum, c, index) => {
        const product = c * parseInt(n.charAt(index), 10)
        return sum + product % 10 + Math.floor(product / 10)
      },
      0
    )

    if (
      checksum % 10 === 0 ||
      (parseInt(n.charAt(6), 10) === 7 && (checksum + 1) % 10 === 0)
    ) {
      return true
    }

    return false
  } catch (e) {
    console.error(e)
    return false
  }
}
