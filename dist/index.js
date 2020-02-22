'use strict'
exports.__esModule = true
/**
 * Verify the input is a valid GUI Number (中華民國統一編號)
 * 規則:
 * Step 1: 把統一編號的每個數字分別乘上對應的係數 (1, 2, 1, 2, 1, 2, 4, 1)
 * Step 2: 把個別乘積的十位數與個位數相加，得出八個小於 10 的數字
 * Step 3: 檢查把這 8 個數字相加之後計算此和除以 10 的餘數
 * Step 4:
 *  4-1: 若是餘數為 0，則為正確的統一編號
 *  4-2: 若是餘數為 9，且原統一編號的第七位是 7，則也為正確的統一編號
 *
 * 範例: 12345675
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
 *
 * @param { string | number } input GUI Number
 * @returns { boolean }
 */
function isGuiNumberValid(input) {
  var GUI_NUMBER_COEFFICIENTS = [1, 2, 1, 2, 1, 2, 4, 1]
  try {
    var n_1 = input.toString()
    var regex = /^\d{8}$/
    if (!regex.test(n_1)) {
      throw new Error('GUI number should be a 8-digit string.')
    }
    var checksum = GUI_NUMBER_COEFFICIENTS.reduce(function(sum, c, index) {
      var product = c * parseInt(n_1.charAt(index), 10) // Step 1
      return sum + (product % 10) + Math.floor(product / 10) // Step 2
    }, 0)
    if (
      // Step 3 & Step 4
      checksum % 10 === 0 ||
      (parseInt(n_1.charAt(6), 10) === 7 && (checksum + 1) % 10 === 0)
    ) {
      return true
    }
    return false
  } catch (e) {
    console.debug(e.message)
    return false
  }
}
exports.isGuiNumberValid = isGuiNumberValid
/**
 *  Verify the input is a valid National identification number (中華民國身分證字號)
 *  A=10 台北市     J=18 新竹縣     S=26 高雄縣
 *  B=11 台中市     K=19 苗栗縣     T=27 屏東縣
 *  C=12 基隆市     L=20 台中縣     U=28 花蓮縣
 *  D=13 台南市     M=21 南投縣     V=29 台東縣
 *  E=14 高雄市     N=22 彰化縣     W=32 金門縣*
 *  F=15 台北縣     O=35 新竹市*    X=30 澎湖縣
 *  G=16 宜蘭縣     P=23 雲林縣     Y=31 陽明山
 *  H=17 桃園縣     Q=24 嘉義縣     Z=33 連江縣*
 *  I=34 嘉義市*    R=25 台南縣
 *
 *  Step 1: 英文字母按照上表轉換為數字之後，十位數 * 1 + 個位數 * 9 相加
 *  Step 2: 第 1 位數字 (只能為 1 or 2) 至第 8 位數字分別乘上 8, 7, 6, 5, 4, 3, 2, 1 後相加，再加上第 9 位數字
 *  Step 3: 如果該數字為 10 的倍數，則為正確身分證字號
 * @param { string } input National identification number
 * @returns { boolean }
 */
function isNationalIdentificationNumberValid(input) {
  try {
    if (typeof input !== 'string') {
      throw new Error('Input type should be string.')
    }
    var regex = /^[A-Z][1,2]\d{8}$/
    if (!regex.test(input)) {
      throw new Error('National identification number format incorrect.')
    }
    return verifyTaiwanIdIntermediateString(input)
  } catch (e) {
    console.debug(e.message)
    return false
  }
}
exports.isNationalIdentificationNumberValid = isNationalIdentificationNumberValid
/**
 *  Verify the input is a valid Resident certificate number (外僑及大陸人士在台居留證、旅行證統一證號)
 *  A=10 台北市     J=18 新竹縣     S=26 高雄縣
 *  B=11 台中市     K=19 苗栗縣     T=27 屏東縣
 *  C=12 基隆市     L=20 台中縣     U=28 花蓮縣
 *  D=13 台南市     M=21 南投縣     V=29 台東縣
 *  E=14 高雄市     N=22 彰化縣     W=32 金門縣*
 *  F=15 台北縣     O=35 新竹市*    X=30 澎湖縣
 *  G=16 宜蘭縣     P=23 雲林縣     Y=31 陽明山
 *  H=17 桃園縣     Q=24 嘉義縣     Z=33 連江縣*
 *  I=34 嘉義市*    R=25 台南縣
 *
 *  Step 1: 第一位英文字母按照上表轉換為數字之後，十位數 * 1 + 個位數 * 9 相加，第二位英文字母按上表轉換為對應數值的個位數
 *  Step 2: 第 1 位數字 (由第二位英文所轉換) 至第 8 位數字分別乘上 8, 7, 6, 5, 4, 3, 2, 1 後相加，再加上第 9 位數字
 *  Step 3: 如果該數字為 10 的倍數，則為正確居留證號
 * @param { string } input Resident certificate number
 * @returns { boolean }
 */
function isResidentCertificateNumberValid(input) {
  try {
    if (typeof input !== 'string') {
      throw new Error('Input type should be string.')
    }
    var regex = /^[A-Z]{2}\d{8}$/
    if (!regex.test(input)) {
      throw new Error('Resident certificate number format incorrect.')
    }
    return verifyTaiwanIdIntermediateString(input)
  } catch (e) {
    console.debug(e.message)
    return false
  }
}
exports.isResidentCertificateNumberValid = isResidentCertificateNumberValid
/**
 * Verify the input is a valid citizen digital certificate (自然人憑證)
 * 驗證規則為兩碼英文 + 14 碼數字
 * @param { string } input citizen digital certificate
 * @returns { boolean }
 */
function isCitizenDigitalCertificateValid(input) {
  try {
    if (typeof input !== 'string') {
      throw new Error('Input type should be string.')
    }
    var n = input.toString()
    var regex = /^[A-Z]{2}\d{14}$/
    if (!regex.test(n)) {
      throw new Error('Citizen digital certificate format incorrect.')
    }
    return true
  } catch (e) {
    console.debug(e.message)
    return false
  }
}
exports.isCitizenDigitalCertificateValid = isCitizenDigitalCertificateValid
/**
 * Verify the input is a valid E-Invoice cell phone barcode (電子發票手機條碼)
 * 總長度為 8 碼
 * 第 1 碼為 /
 * 第 2~8 碼由 0~9 (數字), A-Z (大寫英文字母), .(period), -(hyphen), +(plus) 組成
 * @param { string } input E-Invoice cell phone barcode
 * @returns { boolean }
 */
function isEInvoiceCellPhoneBarcodeValid(input) {
  try {
    if (typeof input !== 'string') {
      throw new Error('Input type should be string.')
    }
    var n = input.toString()
    var regex = /^\/[\dA-Z.\-+]{7}$/
    if (!regex.test(n)) {
      throw new Error('E-Invoice cell phone barcode format incorrect.')
    }
    return true
  } catch (e) {
    console.debug(e.message)
    return false
  }
}
exports.isEInvoiceCellPhoneBarcodeValid = isEInvoiceCellPhoneBarcodeValid
/**
 * Verify the input is a valid E-Invoice donate code (電子發票捐贈碼)
 * 總長度為 3~7 碼 0~9 的數字
 * @param { string } input E-Invoice donate code
 * @returns { boolean }
 */
function isEInvoiceDonateCodeValid(input) {
  try {
    if (typeof input !== 'string') {
      throw new Error('Input type should be string.')
    }
    var n = input.toString()
    var regex = /^[\d]{3,7}$/
    if (!regex.test(n)) {
      throw new Error('E-Invoice donate code format incorrect.')
    }
    return true
  } catch (e) {
    console.debug(e.message)
    return false
  }
}
exports.isEInvoiceDonateCodeValid = isEInvoiceDonateCodeValid
/**
 * Verify the intermediate string for isNationalIdentificationNumberValid and isResidentCertificateNumberValid
 * @param { string } input String to verify
 * @returns { boolean }
 */
function verifyTaiwanIdIntermediateString(input) {
  var idArray = input.split('')
  var intRadix = 10
  var TAIWAN_ID_LOCALE_CODE_LIST = [
    1,
    10,
    19,
    28,
    37,
    46,
    55,
    64,
    39,
    73,
    82,
    2,
    11,
    20,
    48,
    29,
    38,
    47,
    56,
    65,
    74,
    83,
    21,
    3,
    12,
    30 // Z -> 33 -> 1 * 3 + 9 * 3 = 30
  ]
  var RESIDENT_CERTIFICATE_NUMBER_LIST = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '4',
    '8',
    '9',
    '0',
    '1',
    '2',
    '5',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '2',
    '0',
    '1',
    '3' // Z
  ]
  // if is not a number (居留證編號)
  if (isNaN(parseInt(idArray[1], intRadix))) {
    idArray[1] =
      RESIDENT_CERTIFICATE_NUMBER_LIST[input.charCodeAt(1) - 'A'.charCodeAt(0)]
  }
  var result = idArray.reduce(function(sum, n, index) {
    if (index === 0) {
      return (
        sum +
        TAIWAN_ID_LOCALE_CODE_LIST[idArray[0].charCodeAt(0) - 'A'.charCodeAt(0)]
      )
    } else if (index === 9) {
      return sum + parseInt(idArray[9], intRadix)
    }
    return sum + parseInt(idArray[index], intRadix) * (9 - index)
  }, 0)
  if (result % 10 === 0) {
    return true
  }
  return false
}
//# sourceMappingURL=index.js.map
