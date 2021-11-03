import officialOrganizationList from './organization.json'
import { Organization } from './type'

function createOrganizationTable(
  organizations: Organization[]
): Map<string, Organization> {
  const m: Map<string, Organization> = new Map<string, Organization>()
  organizations.forEach(o => m.set(o.donateCode, o))
  return m
}

let organizationTable: Map<string, Organization> | null = null

/**
 * Verify the input is a valid E-Invoice cell phone barcode (電子發票手機條碼)
 *
 * @param { string } input E-Invoice cell phone barcode
 * @returns { boolean } is `input` a valid e-invoice cell phone barcode
 */
export function isEInvoiceCellPhoneBarcodeValid(input: string): boolean {
  if (typeof input !== 'string') return false

  const n = input.toString()

  /**
   * 總長度為 8 碼
   * 第 1 碼為 /
   * 第 2-8 碼由 0-9 (數字), A-Z (大寫英文字母), .(period), -(hyphen), +(plus) 組成
   */
  const regex = /^\/[\dA-Z.\-+]{7}$/

  return regex.test(n)
}

/**
 * Verify the input is a valid E-Invoice donate code (電子發票捐贈碼)
 *
 * @param { string | number } input E-Invoice donate code
 * @param { Organization[] | null } organizationList All valid donate code. Skip if null is set. Default: use organization list from the source: https://www.einvoice.nat.gov.tw/APCONSUMER/BTC603W/
 * @returns { boolean } is `input` a valid e-invoice donate code
 */
export function isEInvoiceDonateCodeValid(
  input: string | number,
  organizationList?: Organization[] | null
): boolean {
  if (typeof input !== 'string' && typeof input !== 'number') return false

  const n = input.toString()

  // 總長度為 3-7 碼 0-9 的數字
  const regex = /^[\d]{3,7}$/

  if (organizationList === null) return regex.test(n)

  if (organizationList !== undefined)
    return organizationList.some(o => o.donateCode === n)

  if (organizationTable === null)
    organizationTable = createOrganizationTable(officialOrganizationList)

  return organizationTable.has(n)
}

export const isCellPhoneBarcode = isEInvoiceCellPhoneBarcodeValid
export const isDonateCode = isEInvoiceDonateCodeValid
