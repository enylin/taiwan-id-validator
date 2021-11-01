import { zipWith, add, multiply } from '../helper'

/**
 * Verify the input is a valid GUI Number (中華民國統一編號)
 *
 * @param { string | number } input GUI Number
 * @param { boolean } extended check input using extended format: https://www.fia.gov.tw/singlehtml/6?cntId=aaa97a9dcf2649d5bdd317f554e24f75
 * @returns { boolean } is `input` a valid GUI number
 */
export function isGuiNumberValid(
  input: string | number,
  extended = false
): boolean {
  if (typeof input !== 'string' && typeof input !== 'number') return false

  /**
   * Example: 12345675
   * Step 1:
   * 1 * 1 = 1
   * 2 * 2 = 4
   * 3 * 1 = 3
   * 4 * 2 = 8
   * 5 * 1 = 5
   * 6 * 2 = 12
   * 7 * 4 = 28
   * 5 * 1 = 5
   *
   * Step 2:
   * 1 -> 1
   * 4 -> 4
   * 3 -> 3
   * 8 -> 8
   * 5 -> 5
   * 12 -> 1 + 2 = 3
   * 28 -> 2 + 8 = 10
   * 5 -> 5
   *
   * Step 3:
   * (1 + 4 + 3 + 8 + 5 + 3 + 10 + 5) % 10 = 9
   */

  const GUI_NUMBER_COEFFICIENTS = [1, 2, 1, 2, 1, 2, 4, 1]

  const n = input.toString()
  const regex = /^\d{8}$/

  if (!regex.test(n)) return false

  /**
   * Step 1: 先把統一編號的每個數字分別乘上對應的係數 (1, 2, 1, 2, 1, 2, 4, 1)
   * Step 2: 再把個別乘積的十位數與個位數相加，得出八個小於 10 的數字
   */

  const intRadix = 10
  const checksum = zipWith(
    multiply,
    GUI_NUMBER_COEFFICIENTS,
    n.split('').map(c => parseInt(c, intRadix))
  )
    .map(n => (n % 10) + Math.floor(n / 10))
    .reduce(add, 0)

  /**
   * Step 3: 檢查把這 8 個數字相加之後計算此和除以 5 or 10 的餘數
   * Step 4:
   *  4-1: 若是餘數為 0，則為正確的統一編號
   *  4-2: 若是餘數為 9，且原統一編號的第七位是 7，則也為正確的統一編號
   */

  const divisor = extended ? 5 : 10

  return (
    checksum % divisor === 0 ||
    (parseInt(n.charAt(6), intRadix) === 7 && (checksum + 1) % divisor === 0)
  )
}

export const isGUI = isGuiNumberValid
