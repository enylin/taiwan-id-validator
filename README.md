# taiwan-id-validator

## Features

* 台灣身分證字號驗證
* 台灣外僑及大陸人士在臺居留證、旅行證統一證號驗證
* 公司統一編號驗證
* 自然人憑證編號驗證
* 電子發票手機條碼驗證
* 電子發票捐贈碼驗證

## Installation

```bash
npm i -S taiwan-id-validator
```

## Usage

```js
// index.js

var taiwanIdValidator = require("taiwan-id-validator");

console.log(taiwanIdValidator.isGuiNumberValid('12345675')); // 統一編號
console.log(taiwanIdValidator.isNationalIdentificationNumberValid('A12345678')); // 身分證字號
console.log(taiwanIdValidator.isResidentCertificateNumberValid('AA00000009')); // 居留證編號
console.log(taiwanIdValidator.isCitizenDigitalCertificateValid('AA12345678901234')); // 自然人憑證
console.log(taiwanIdValidator.isEInvoiceCellPhoneBarcodeValid('/U.5+A33')); // 手機條碼
console.log(taiwanIdValidator.isEInvoiceDonateCodeValid('001')); // 捐贈碼

var s = '12345675';

if (taiwanIdValidator.isGuiNumberValid(s)) {
  console.log(s + ' is a valid GUI Number.');
} else {
  console.log(s + ' is not a valid GUI Number.');
}
```

## ES6, Typescript

```js
// index.js

import {
  isGuiNumberValid, // 統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isCitizenDigitalCertificateValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid // 捐贈碼
} from 'taiwan-id-validator'

console.log(isGuiNumberValid('12345675'))
console.log(isNationalIdentificationNumberValid('A12345678'))
console.log(isResidentCertificateNumberValid('AA00000009'))
console.log(isCitizenDigitalCertificateValid('AA12345678901234'))
console.log(isEInvoiceCellPhoneBarcodeValid('AA12345678901234'))
console.log(isEInvoiceDonateCodeValid('AA12345678901234'))

const s = '12345675'

if (isGuiNumberValid(s)) {
  console.log(s + ' is a valid GUI Number.')
} else {
  console.log(s + ' is not a valid GUI Number.')
}
```