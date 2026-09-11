# Validation specification sources

This project validates identifiers according to rules published by Taiwan government agencies. The sources below are the references used by the implementation and regression tests.

Last reviewed: 2026-09-11

## National identification number (國民身分證統一編號)

Authority: Ministry of the Interior / government data standards

Rules used by this library:

- 10 characters
- first character: `A-Z` regional code
- second character: `1` for male or `2` for female
- remaining characters: digits, with the final digit used as a checksum
- regional letters use the official `A=10, B=11, ...` mapping (including `I=34`, `O=35`, `W=32`, `X=30`, `Y=31`, `Z=33`)
- the checksum follows the official `1,9,8,7,6,5,4,3,2,1` weighting after expanding the regional letter into two digits

References:

- https://schema.gov.tw/lists/167
- https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg013224/ch04/type2/gov30/num9/OEg.pdf
- https://www.nhi.gov.tw/ch/dl-51056-1f6f8072b3954cbe9fa766d92e081250-1.pdf

## UI number (外來人口統一證號)

Authority: National Immigration Agency, Ministry of the Interior

Rules used by this library:

- legacy format: 2 uppercase letters + 8 digits; the second letter is `A-D`
- current format: 1 uppercase letter + 9 digits
- current-format second digit: `8` for male, `9` for female
- current-format third digit:
  - `0-6`: foreign or stateless person
  - `7`: national without household registration in Taiwan
  - `8`: Hong Kong or Macao resident
  - `9`: mainland China resident
- checksum uses the same regional-code conversion and weighting principle as the National Identification Number; for legacy numbers the second letter is converted with the official letter table and its units digit is used

References:

- https://www.immigration.gov.tw/5385/12162/238449/382804/
- https://www.immigration.gov.tw/5385/7244/7250/20406/7326/247577/
- https://www.immigration.gov.tw/media/49101/%E4%BF%AE%E6%AD%A3%E5%A4%96%E4%BE%86%E4%BA%BA%E5%8F%A3%E7%B5%B1%E4%B8%80%E8%AD%89%E8%99%9F%E6%A0%BC%E5%BC%8F%E5%B0%88%E6%A1%88%E8%A8%88%E7%95%AB%E6%9B%BF%E4%BB%A3%E6%96%B9%E6%A1%88%E6%88%90%E6%9C%AC%E6%95%88%E7%9B%8A%E5%88%86%E6%9E%90%E5%A0%B1%E5%91%8A.pdf
- https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/individual-income-tax/alien-tax-question/other/781zJ3Y
- https://www.nhi.gov.tw/ch/dl-51056-1f6f8072b3954cbe9fa766d92e081250-1.pdf

The NIA states that legacy UI numbers remain usable through 2030-12-31 and are discontinued from 2031-01-01. The validator intentionally keeps legacy-format validation available for existing data and migration use cases; it validates number structure and checksum, not whether an identifier is currently active.

## Business Administration Number (營利事業統一編號)

Authority: Fiscal Information Agency, Ministry of Finance

Rules used by this library:

- 8 digits
- weighting coefficients: `1, 2, 1, 2, 1, 2, 4, 1`
- each product contributes the sum of its decimal digits
- current rule: the resulting sum must be divisible by `5`
- legacy rule: the resulting sum had to be divisible by `10`
- when the seventh digit is `7`, the number is valid if either the calculated sum or `sum + 1` is divisible by the applicable divisor (`5` for the current rule, `10` for the legacy rule)

The Ministry of Finance currently publishes `04595252` and `10458570` as test numbers for systems that have migrated to the revised rule. The official attachment also documents `04595257`, `10458575`, and `10458574` as valid examples.

References:

- https://www.fia.gov.tw/singlehtml/3?cntId=c4d9cff38c8642ef8872774ee9987283
- https://www.fia.gov.tw/singlehtml/3?cntId=4246ca18578e45deaa884285d6863d41
- https://orgws.kcg.gov.tw/001/KcgOrgUploadFiles/400/relfile/73675/293949/32e1daf7-5cbf-4d2e-943b-b6a93d93589c.pdf

## Citizen Digital Certificate barcode (自然人憑證條碼)

Authority: Ministry of Finance E-Invoice Platform

The E-Invoice specification defines the natural-person certificate barcode as 2 uppercase letters followed by 14 digits. This library intentionally validates that interoperable barcode format rather than restricting the prefix to a particular currently-issued card series.

Reference:

- https://www.einvoice.nat.gov.tw/static/ptl/ein_upload/download/2173.pdf

## E-Invoice mobile barcode (電子發票手機條碼)

Authority: Ministry of Finance E-Invoice Platform

Rules used by this library:

- total length: 8 characters
- first character: `/`
- remaining 7 characters: `0-9`, `A-Z`, `+`, `-`, or `.`
- uppercase letters are preserved

Reference:

- https://www.einvoice.nat.gov.tw/static/ptl/ein_upload/download/2173.pdf

## E-Invoice donation code (電子發票捐贈碼)

Authority: Ministry of Finance E-Invoice Platform

Rules used by this library:

- 3 to 7 digits
- leading zero is allowed

Reference:

- https://www.einvoice.nat.gov.tw/static/ptl/ein_upload/download/2173.pdf
