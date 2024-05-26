# [2.0.0-0](https://github.com/enylin/taiwan-id-validator/compare/v1.5.0...v2.0.0-0) (2024-05-26)


### Bug Fixes

* **api:** remove redundant national id and ui number functions to simplify codebase ([8c98911](https://github.com/enylin/taiwan-id-validator/commit/8c989113482383df4823db495563184e0f10263d))
* **ban:** rename GUI number to BAN to align with official government terminology ([7e461de](https://github.com/enylin/taiwan-id-validator/commit/7e461de58d1379efef832634bc61b1b63508e782))
* **cdc:** rename isCitizenDigitalCertificateNumber to isCdcNumber to simplify API call ([9b7dc6a](https://github.com/enylin/taiwan-id-validator/commit/9b7dc6a172fc78509d97b652d8911a571a5b59a1))
* **donate-code:** rename isEInvoiceDonateCode to isDonateCode to simplify API call ([4f6e105](https://github.com/enylin/taiwan-id-validator/commit/4f6e1053ef5fda557a19056fd64fe42bb646f427))
* **eslint:** fix typescript type indent rules conflict issue between prettier and eslint ([77860c8](https://github.com/enylin/taiwan-id-validator/commit/77860c83918767d02de16b618038d54bc8ca0f3d))
* **gui:** use object as function parameter to extend options ([8ed1bb7](https://github.com/enylin/taiwan-id-validator/commit/8ed1bb7aadc5c43f6ae06d37c659e03cf32bc6f4))
* **mobile-barcode:** rename isEInvoiceCellPhoneBarcode to align with official government terminology ([2cff03c](https://github.com/enylin/taiwan-id-validator/commit/2cff03ce9d51332153b1e2980fc8d1557fe88780))
* **npm:** update dependencies to address security vulnerabilities ([64a1060](https://github.com/enylin/taiwan-id-validator/commit/64a1060b5d0426fa088a574fab4f67d0ffce3b63))
* remove function aliases ([af9e339](https://github.com/enylin/taiwan-id-validator/commit/af9e33906d6bf722a4f25cf60405b4618f3804e6))
* rename options key name ([79fabe9](https://github.com/enylin/taiwan-id-validator/commit/79fabe9257c7aedaf5dee5d9cc605c9eae92447b))
* use shorter names for functions ([16577ee](https://github.com/enylin/taiwan-id-validator/commit/16577ee693def6f3be8743a8cb4268255595c42e))
* **webpack:** fix critical dependency warning ([12b530f](https://github.com/enylin/taiwan-id-validator/commit/12b530fb63d5dff71cee20d5b2bead2d8890f7b7))


### Features

* **gui:** use new format rule as default validation rule ([ed45d89](https://github.com/enylin/taiwan-id-validator/commit/ed45d893a5d0c3d6667e247f87ad75a6c6757b13))
* **id-card-number:** support more validating options in new ui numbers ([068bb1e](https://github.com/enylin/taiwan-id-validator/commit/068bb1e67c55bec4e22e8891e12e87e6aadc69ee))
* **national-id:** add isIdCardNumber function ([1cf788a](https://github.com/enylin/taiwan-id-validator/commit/1cf788a96f8f46197aeafa2ca8edb1c3c9ec076b))


### BREAKING CHANGES

* **donate-code:** rename isEInvoiceDonateCodeValid to isDonateCode
* **mobile-barcode:** rename isEInvoiceCellPhoneBarcodeValid to isMobileBarcode
* **cdc:** rename isCitizenDigitalCertificateNumberValid to isCdcNumber
* **ban:** rename isGuiNumberValid to isBan
* **api:** Remove isNationalIdentificationNumberValid and isResidentCertificateNumberValid
* remove "valid" part from function names
* all function aliases are removed
* **gui:** should pass object instead of boolean to use new format
* **gui:** use new rule as default rule



# [1.5.0](https://github.com/enylin/taiwan-id-validator/compare/v1.4.1...v1.5.0) (2022-12-28)


### Bug Fixes

* **js:** replace "substr" (deprecated) by "substring" ([0177111](https://github.com/enylin/taiwan-id-validator/commit/01771112e97cffd2ebde2a4fb581fc62034e2160))


### Features

* **credit-card:** support credit card validation ([669f4ff](https://github.com/enylin/taiwan-id-validator/commit/669f4ff87a828f96d5aa4494860008bb60492982))



## [1.4.1](https://github.com/enylin/taiwan-id-validator/compare/v1.4.0...v1.4.1) (2021-12-14)


### Bug Fixes

* make project compatible with es5 environment ([9cb9a44](https://github.com/enylin/taiwan-id-validator/commit/9cb9a440597974649ff79576b1723881b4e1aa26))



# [1.4.0](https://github.com/enylin/taiwan-id-validator/compare/v1.3.1...v1.4.0) (2021-10-28)


### Features

* **gui:** support extended GUI format validation ([617920a](https://github.com/enylin/taiwan-id-validator/commit/617920a8fcd11a782cb813928c2b606cd8281d59))



## [1.3.1](https://github.com/enylin/taiwan-id-validator/compare/v1.3.0...v1.3.1) (2021-09-11)


### Bug Fixes

* **nodejs:** fix self is not defined issue on node js ([961fd8f](https://github.com/enylin/taiwan-id-validator/commit/961fd8fb940a9771e6f78ff0a709e564947a6fd0))



# [1.3.0](https://github.com/enylin/taiwan-id-validator/compare/v1.2.0...v1.3.0) (2021-09-11)



# [1.2.0](https://github.com/enylin/taiwan-id-validator/compare/v1.1.0...v1.2.0) (2021-08-22)


### Features

* **input:** support more types of input ([5ff9b2a](https://github.com/enylin/taiwan-id-validator/commit/5ff9b2a6aab32498918b6ebe92bb6f4e9bdc67f7))



# [1.1.0](https://github.com/enylin/taiwan-id-validator/compare/v1.0.0...v1.1.0) (2021-08-21)

### Bug Fixes

* **cdc:** rename isCitizenDigitalCertificateValid to isCitizenDigitalCertificateNumberValid ([4abeacc](https://github.com/enylin/taiwan-id-validator/commit/4abeacc9b1585833b4cc6d9e8f7dcf5caa9e3268))
* **error:** throw error when input format incorrect ([59a0ce6](https://github.com/enylin/taiwan-id-validator/commit/59a0ce637e277493009e22913da008f8f9cef03b))
* **eslint:** fix eslint "Cannot read property 'loc' of undefined" ([4daef7a](https://github.com/enylin/taiwan-id-validator/commit/4daef7a09afe01fa91e4e5f84018d983e4bda4c1))
* **test:** fix typo ([b5a0a78](https://github.com/enylin/taiwan-id-validator/commit/b5a0a78100d31229dae7ee92a3392b4e7433d60b))


### Features

* **alias:** add function aliases ([a56c256](https://github.com/enylin/taiwan-id-validator/commit/a56c2568ac5bc15c022c00b04792b9a12d3b7e17))
* **resident-certificate:** support new resident certificate format ([245441e](https://github.com/enylin/taiwan-id-validator/commit/245441efdc4b3c5c306712b7d172e1c05870523c))



