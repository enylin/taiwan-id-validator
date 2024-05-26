## taiwan-id-validator

![NPM](https://img.shields.io/npm/l/taiwan-id-validator)
![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/enylin/taiwan-id-validator/test.yml)
[![codecov](https://codecov.io/gh/enylin/taiwan-id-validator/graph/badge.svg?token=5MTC59QF18)](https://codecov.io/gh/enylin/taiwan-id-validator)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/enylin/line-pay-merchant)
![npm](https://img.shields.io/npm/dt/taiwan-id-validator)
![npm](https://img.shields.io/npm/v/taiwan-id-validator)

## Features

* 中華民國身分證字號驗證驗證
* 新/舊版臺灣地區無戶籍國民、外國人、大陸地區人民及香港或澳門居民之專屬代號驗證
* 營利事業統一編號驗證 (支援新/舊版統一編號檢查)
* 自然人憑證編號驗證
* 電子發票手機條碼驗證
* 電子發票捐贈碼驗證

## Table of Contents

- [taiwan-id-validator](#taiwan-id-validator)
- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Quick start](#quick-start)
  - [Browser](#browser)
  - [Node.js](#nodejs)
- [API](#api)
  - [Functions](#functions)
    - [isIdCardNumber(input, options)](#isidcardnumberinput-options)
    - [isBan(input, options)](#isbaninput-options)
    - [isDonateCode(input)](#isdonatecodeinput)
    - [isMobileBarcode(input)](#ismobilebarcodeinput)
    - [isCdcNumber(input)](#iscdcnumberinput)
  - [Types](#types)
    - [IdCardValidationOptions](#idcardvalidationoptions)
    - [UiNumberValidationOptions](#uinumbervalidationoptions)
    - [NewUiValidationOptions](#newuivalidationoptions)
    - [BanValidationOptions](#banvalidationoptions)
- [Migration from v1](#migration-from-v1)
- [Additional Information](#additional-information)
  - [外僑的統一證號由何機關配賦及如何編排？](#外僑的統一證號由何機關配賦及如何編排)
  - [新式統一編號](#新式統一編號)

## Quick start

### Browser

Include `taiwan-id-validator` in a script tag.

Usage:

```html
<head>
  <title>Taiwan ID Validator</title>
  <meta charset="utf-8" />
  <script src="https://unpkg.com/taiwan-id-validator"></script>
  <script>
    const input = 'A123456789'

    if (taiwanIdValidator.isIdCardNumber(input)) { // 身分證字號、新/舊式統號
      console.log(input + ' is a valid Taiwan ID Card Number.')
    } else {
      console.log(input + ' is not a valid Taiwan ID Card Number.')
    }
  </script>
</head>
```

### Node.js

Install with [npm](https://www.npmjs.com/):

```sh
npm install taiwan-id-validator
```

Usage:

```js
import { isIdCardNumber } from 'taiwan-id-validator'

const input = 'A123456789'

if (isIdCardNumber(input)) { // 身分證字號、新/舊式統號
  console.log(input + ' is a valid Taiwan ID Card Number.')
} else {
  console.log(input + ' is not a valid Taiwan ID Card Number.')
}
```

## API

### Functions

#### isIdCardNumber(input, options)

| Name | Type | Description |
|----------|----------|----------|
| input    | string   | The identification number to verify. This includes National Identification Numbers ([身分證字號](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E5%9C%8B%E6%B0%91%E8%BA%AB%E5%88%86%E8%AD%89#%E5%9C%8B%E6%B0%91%E8%BA%AB%E5%88%86%E8%AD%89%E7%B5%B1%E4%B8%80%E7%B7%A8%E8%99%9F)), and Unified Identification Numbers ([外來人口統一證號](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E5%B1%85%E7%95%99%E8%AD%89#%E5%A4%96%E4%BE%86%E4%BA%BA%E5%8F%A3%E7%B5%B1%E4%B8%80%E8%AD%89%E8%99%9F)). |
| options<br>(optional)    | [IdCardValidationOptions](#IdCardValidationOptions)   | Options specifying which types of identification numbers to check<br>Default: `{ nationalId: true, uiNumber: true }` |

<details>
<summary>Example</summary>

```typescript
isIdCardNumber('A123456789'); // true
isIdCardNumber('A123456789', { nationalId: false }); // false
isIdCardNumber('A800000014', {
  nationalId: false,
  uiNumber: {
    oldFormat: false,
    newFormat: {
      foreignOrStateless: true,
      statelessResident: false,
      hkMacaoResident: false,
      mainlandChinaResident: false
    }
  }
}) // true
```
</details>

#### isBan(input, options)

| Name | Type | Description |
|----------|----------|----------|
| input    | string \| number   | The Business Administration Number (營利事業統一編號) to verify |
| options<br>(optional)    | [BanValidationOptions](#BanValidationOptions)   | Options specifying the validation rules for BAN Numbers<br>Default: `{}` |

<details>
<summary>Example</summary>

```typescript
isBan('12345675'); // true
isBan('12345675', { applyOldRules: true }); // true
isBan('12345678'); // false
```
</details>

#### isDonateCode(input)

| Name | Type | Description |
|----------|----------|----------|
| input    | string \| number   | The E-Invoice Donate Code (電子發票捐贈碼) to verify |

<details>
<summary>Example</summary>

```typescript
isDonateCode('123'); // true
isDonateCode('abc123'); // false
```
</details>

#### isMobileBarcode(input)

| Name | Type | Description |
|----------|----------|----------|
| input    | string   | The E-Invoice Mobile Barcode to verify |

<details>
<summary>Example</summary>

```typescript
isMobileBarcode('/+.-++..'); // true
isMobileBarcode('/12345678'); // false
```
</details>

#### isCdcNumber(input)

| Name | Type | Description |
|----------|----------|----------|
| input    | string   | The Citizen Digital Certificate Number to verify |

<details>
<summary>Example</summary>

```typescript
isCdcNumber('AB12345678901234'); // true
isCdcNumber('A12345678901234'); // false
```
</details>

### Types

#### IdCardValidationOptions

| Name | Type | Description |
|----------|----------|----------|
| nationalId<br/>(optional) | boolean | Indicates whether to validate national identification numbers (身分證字號)<br>Default: `true` |
| uiNumber<br/>(optional) | [UiNumberValidationOptions](#UiNumberValidationOptions) \| boolean | Indicates whether to validate UI number (統一證號).<br>If a boolean value is provided instead of an object, all options within this object will inherit this boolean value.<br>Default: `true` |

#### UiNumberValidationOptions

| Name | Type | Description |
|----------|----------|----------|
| oldFormat<br/>(optional) | boolean | Indicates whether to validate old format UI numbers (舊式統一證號)<br>Default: `true` |
| newFormat<br/>(optional) | [NewUiValidationOptions](#NewUiValidationOptions) \| boolean | Indicates whether to validate new format UI numbers (新式統一證號).<br>If a boolean value is provided instead of an object, all options within this object will inherit this boolean value.<br>Default: `true` |

#### NewUiValidationOptions

| Name | Type | Description |
|----------|----------|----------|
| foreignOrStateless<br/>(optional) | boolean | Indicates whether to validate foreigners or stateless persons (外國人或無國籍人士)<br>Default: `true` |
| statelessResident<br/>(optional) | boolean | Indicates whether to validate stateless residents (無戶籍國民)<br>Default: `true` |
| hkMacaoResident<br/>(optional) | boolean | Indicates whether to validate Hong Kong or Macao residents (香港澳門居民)<br>Default: `true` |
| mainlandChinaResident<br/>(optional) | boolean | Indicates whether to validate Mainland China residents (大陸地區居民)<br>Default: `true` |

#### BanValidationOptions

| Name | Type | Description |
|----------|----------|----------|
| applyOldRules<br/>(optional) | boolean | Indicates whether to validate the input using the old format rules.<br>Default: `false` |

## Migration from v1

- 為了跟政府單位使用詞彙統一並避免與統一證號英文 `UI number` 產生混淆，將 `isGuiNumber` 改為 `isBan`。
- 營利事業統一編號已於2023年4月更新檢查邏輯，`isBan` 預設使用新版邏輯，若要使用舊版邏輯可使用 `applyOldRules` 選項。可參考[新式外來人口統一證號專案說明](https://www.immigration.gov.tw/5385/7445/238440/238442/240309/)
- 因外來人口統一證號與國民身分證字號使用情境以及驗證程式邏輯雷同，將原本 `isNationalIdentificationNumberValid`、`isResidentCertificateNumberValid`、`isNewResidentCertificateNumberValid`、`isOriginalResidentCertificateNumberValid` 四個函數合併為 `isIdCardNumber`，並增加參數控制驗證範圍。
- `isEInvoiceCellPhoneBarcode`、`isCitizenDigitalCertificateNumber`、`isEInvoiceDonateCode` 也都修改成較精簡名稱以利程式開發及閱讀。

## Additional Information

### 外僑的統一證號由何機關配賦及如何編排？

自96年1月2日起：

1.由內政部移民署針對港、澳、大陸地區人民及華僑於核發臺灣地區居留證時，配賦統一證號。

2.由內政部移民署針對一般之外僑於核發外僑居留證時，配賦統一證號。

3.未曾取得前述機關所發證件，而有申報所得稅需要之已入境外國人或在臺無戶籍本國人，一般外僑可由當事人或被委託人檢附護照，向當地移民署提出申請，港、澳、大陸地區人民及華僑則檢附臺灣地區入出境許可證件，向移民署及其所屬臺中、高雄及花蓮服務處提出申請發給「中華民國統一證號基資表」。

內政部移民署自110年1月2日起，辦理現行外來人口統一證號(以下簡稱舊式統號)全面換發為新式統一證號(以下簡稱新式統號)，有關統一證號之編排方式如下：

舊式統號：「統一證號」計有10個欄位，第1碼為區域碼，第2碼依據性別及核發機關分別為AB，CD，第3碼至第9碼為流水號，第10碼為檢查碼。

新式統號：「統一證號」計有10個欄位，第1碼為區域碼，第2碼為性別碼(8為男生，9為女生)，第3碼為身分碼(數字0-6為外國人或無國籍人士、7為無戶籍國民、8為香港澳門居民、9為大陸地區人民)，第4碼至第9碼為流水號，第10碼為檢查碼。

參考資料: 
1. [新式外來人口統一證號專案說明](https://www.immigration.gov.tw/5385/7445/238440/238442/240309/)
1. [新式外來人口統一證號懶人包](https://www.immigration.gov.tw/5382/5385/7445/238440/238442/241508/)
1. [外僑的統一證號由何機關配賦及如何編排？](https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/individual-income-tax/alien-tax-question/other/781zJ3Y)
1. [Introduction to the Replacement Issuance of New UI No. for Foreign Nationals](https://www.roc-taiwan.org/uploads/sites/3/2021/01/Introduction-to-the-Replacement-Issuance-of-New-UI-No.-for-Foreign-Nationals.pdf)

### 新式統一編號

一、營利事業統一編號（下稱統一編號）供營利事業及扣繳單位配號使用，預估空號將於113年用罄。\
二、為擴增統一編號號碼並與現行配賦之統一編號相容（新舊統一編號格式相同），後續請公私部門配合修改統一編號檢核程式，主要係修正「檢查邏輯由可被『10』整除改為可被『5』整除」，相關說明詳如附件。\
三、全國公私部門倘有使用統一編號檢核程式，請於112年3月31日前完成統一編號檢核程式修改作業，相關系統文件請併同檢視修正。\
四、預計112年4月以後，將視舊號餘存狀況逐步釋出新產製之統一編號。

參考資料：
- [營利事業統一編號檢查碼邏輯修正說明](https://www.fia.gov.tw/singlehtml/3?cntId=c4d9cff38c8642ef8872774ee9987283)
- [附件-營利事業統一編號檢查碼邏輯修正說明](https://www.fia.gov.tw/download/ff9c37611e9e46dab952676d24dc0b67)
