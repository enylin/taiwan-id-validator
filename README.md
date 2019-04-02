# taiwan-id-validator

* 台灣身分證字號驗證
* 公司統一編號驗證
* 自然人憑證驗證

## Installation

```bash
npm i -S taiwan-id-validator
```

## Usage

```js
// index.js

import {
  isGuiNumberValid,
  isNationalIdentificationNumberValid,
  isCitizenDigitalCertificateValid
} from 'taiwan-id-validator'

console.log(isGuiNumberValid('12345675'))
console.log(isNationalIdentificationNumberValid('A12345678'))
console.log(isCitizenDigitalCertificateValid('AA12345678901234'))
```