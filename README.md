# taiwan-id-validator

## Features

* 台灣身分證字號驗證
* 舊版臺灣地區無戶籍國民、外國人、大陸地區人民及香港或澳門居民之專屬代號
* 新版臺灣地區無戶籍國民、外國人、大陸地區人民及香港或澳門居民之專屬代號
* 公司統一編號驗證
* 自然人憑證編號驗證
* 電子發票手機條碼驗證
* 電子發票捐贈碼驗證

## Quick start

- Via CDN: `<script src="https://unpkg.com/taiwan-id-validator"></script>`
- Install with [npm](https://www.npmjs.com/): `npm install taiwan-id-validator`
- Clone the repo: `git clone https://github.com/enylin/taiwan-id-validator.git`

## Usage

CDN:
```html
<head>
    <title>Taiwan ID Validator</title>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/taiwan-id-validator"></script>
    <script>
        console.log(taiwanIdValidator.isGuiNumberValid('12345675')); // 統一編號
        console.log(taiwanIdValidator.isNationalIdentificationNumberValid('A12345678')); // 身分證字號
        console.log(taiwanIdValidator.isResidentCertificateNumberValid('AA00000009')); // 居留證編號 (舊式與新式)
        console.log(taiwanIdValidator.isNewResidentCertificateNumberValid('A800000014')); // 新式居留證編號
        console.log(taiwanIdValidator.isOriginalResidentCertificateNumberValid('AA00000009')); // 舊式居留證編號
        console.log(taiwanIdValidator.isCitizenDigitalCertificateNumberValid('AA12345678901234')); // 自然人憑證
        console.log(taiwanIdValidator.isEInvoiceCellPhoneBarcodeValid('/U.5+A33')); // 手機條碼
        console.log(taiwanIdValidator.isEInvoiceDonateCodeValid('001')); // 捐贈碼
    </script>
</head>
```

JavaScript:
```js
// index.js

var taiwanIdValidator = require("taiwan-id-validator");

console.log(taiwanIdValidator.isGuiNumberValid('12345675')); // 統一編號
console.log(taiwanIdValidator.isNationalIdentificationNumberValid('A12345678')); // 身分證字號
console.log(taiwanIdValidator.isResidentCertificateNumberValid('AA00000009')); // 居留證編號 (舊式與新式)
console.log(taiwanIdValidator.isNewResidentCertificateNumberValid('A800000014')); // 新式居留證編號
console.log(taiwanIdValidator.isOriginalResidentCertificateNumberValid('AA00000009')); // 舊式居留證編號
console.log(taiwanIdValidator.isCitizenDigitalCertificateNumberValid('AA12345678901234')); // 自然人憑證
console.log(taiwanIdValidator.isEInvoiceCellPhoneBarcodeValid('/U.5+A33')); // 手機條碼
console.log(taiwanIdValidator.isEInvoiceDonateCodeValid('001')); // 捐贈碼

var s = '12345675';

if (taiwanIdValidator.isGuiNumberValid(s)) {
  console.log(s + ' is a valid GUI Number.');
} else {
  console.log(s + ' is not a valid GUI Number.');
}
```

ES6, Typescript:
```js
// index.ts

import {
  isGuiNumberValid, // 統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isNewResidentCertificateNumberValid, // 新式居留證編號
  isOriginalResidentCertificateNumberValid, // 舊式居留證編號
  isCitizenDigitalCertificateNumberValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid // 捐贈碼
} from 'taiwan-id-validator'

console.log(isGuiNumberValid('12345675'))
console.log(isNationalIdentificationNumberValid('A12345678'))
console.log(isResidentCertificateNumberValid('AA00000009')) // 居留證編號 (舊式與新式)
console.log(isNewResidentCertificateNumberValid('A800000014')) // 新式居留證編號
console.log(isOriginalResidentCertificateNumberValid('AA00000009')) // 舊式居留證編號
console.log(isCitizenDigitalCertificateNumberValid('AA12345678901234'))
console.log(isEInvoiceCellPhoneBarcodeValid('AA12345678901234'))
console.log(isEInvoiceDonateCodeValid('AA12345678901234'))

const s = '12345675'

if (isGuiNumberValid(s)) {
  console.log(s + ' is a valid GUI Number.')
} else {
  console.log(s + ' is not a valid GUI Number.')
}
```

## Function alias

```js
const isGUI = isGuiNumberValid
const isNI = isNationalIdentificationNumberValid
const isRC = isResidentCertificateNumberValid
const isNewRC = isNewResidentCertificateNumberValid
const isOriginalRC = isOriginalResidentCertificateNumberValid
const isCDC = isCitizenDigitalCertificateNumberValid
const isCellPhoneBarcode = isEInvoiceCellPhoneBarcodeValid
const isDonateCode = isEInvoiceDonateCodeValid
```

## 新式外來人口統一證號檢查

### 內政部移民署新式外來人口統一證號專案說明

(一)為建立友善外來人口環境，本署參考歐洲在臺商務協會建議，將現行「2碼英文+8碼數字」外來人口統一證號，比照國民身分證號「1碼英文+9碼數字」編碼原則改版(以下簡稱新式統號)，新式統號格式說明如下(如上圖)：\
1、第1碼：區域碼，依申請地區分，比照國人格式。\
2、第2碼：性別碼，8為男性，9為女性。\
3、第10碼：檢查碼。\
(二)本署預計於110年1月2日起核發載有新式統號的證件，另考量部分永久居留外國人未在境內，為避免影響民眾權益，爰規劃換號期間為10年，舊式統號將於120年1月1日起停止使用。若有相關問題，可透過本署署長信箱系統進行反映。

參考資料: 
1. [新式外來人口統一證號專案說明](https://www.immigration.gov.tw/5385/7445/238440/238442/240309/)
1. [新式外來人口統一證號懶人包](https://www.immigration.gov.tw/5382/5385/7445/238440/238442/241508/)
1. [資料標準](https://schema.gov.tw/Commonality/Commonality/Common%20Data)
1. [Introduction to the Replacement Issuance of New UI No. for Foreign Nationals](https://www.roc-taiwan.org/uploads/sites/3/2021/01/Introduction-to-the-Replacement-Issuance-of-New-UI-No.-for-Foreign-Nationals.pdf)
