# taiwan-id-validator

[![CI](https://github.com/enylin/taiwan-id-validator/actions/workflows/ci.yml/badge.svg)](https://github.com/enylin/taiwan-id-validator/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/taiwan-id-validator.svg)](https://www.npmjs.com/package/taiwan-id-validator)
[![npm downloads](https://img.shields.io/npm/dt/taiwan-id-validator.svg)](https://www.npmjs.com/package/taiwan-id-validator)
[![codecov](https://codecov.io/gh/enylin/taiwan-id-validator/graph/badge.svg)](https://codecov.io/gh/enylin/taiwan-id-validator)
[![license](https://img.shields.io/npm/l/taiwan-id-validator.svg)](LICENSE)

A small, zero-runtime-dependency TypeScript library for validating commonly used Taiwan identification and E-Invoice numbers.

## Supported validators

- National Identification Number (國民身分證統一編號)
- Legacy and current UI Number (外來人口統一證號)
- Business Administration Number, BAN (營利事業統一編號)
- Citizen Digital Certificate barcode (自然人憑證條碼)
- E-Invoice Mobile Barcode (電子發票手機條碼)
- E-Invoice Donation Code (電子發票捐贈碼 / 愛心碼)

The validation rules are tracked against government sources in [docs/specification-sources.md](docs/specification-sources.md).

## Installation

```sh
npm install taiwan-id-validator
```

The package publishes ESM, CommonJS, TypeScript declarations, and a browser UMD bundle.

## Quick start

### ESM

```ts
import { isBan, isIdCardNumber } from 'taiwan-id-validator'

isIdCardNumber('A123456789') // true
isBan('04595257') // true
```

### CommonJS

```js
const { isBan } = require('taiwan-id-validator')

isBan('04595257') // true
```

### Browser / CDN

```html
<script src="https://unpkg.com/taiwan-id-validator@2"></script>
<script>
  taiwanIdValidator.isIdCardNumber('A123456789')
</script>
```

The browser UMD build preserves the `taiwanIdValidator` global and also supports AMD loaders such as RequireJS.

## Boolean API

Use the `isXxx` functions when only a yes/no answer is needed.

### `isIdCardNumber(input, options?)`

Validates National Identification Numbers and UI Numbers.

```ts
import { isIdCardNumber } from 'taiwan-id-validator'

isIdCardNumber('A123456789')
isIdCardNumber('AB23456789')
isIdCardNumber('A800000014')
```

By default, all supported National ID and UI Number formats are enabled.

```ts
isIdCardNumber('A123456789', {
  nationalId: true,
  uiNumber: false
})
```

Current-format UI Numbers can be filtered by status category:

```ts
isIdCardNumber('A870000015', {
  nationalId: false,
  uiNumber: {
    oldFormat: false,
    newFormat: {
      foreignOrStateless: false,
      nationalWithoutHouseholdRegistration: true,
      hkMacaoResident: false,
      mainlandChinaResident: false
    }
  }
})
```

#### `IdCardValidationOptions`

```ts
export type IdCardValidationOptions = {
  nationalId?: boolean
  uiNumber?: UiNumberValidationOptions | boolean
}

export type UiNumberValidationOptions = {
  oldFormat?: boolean
  newFormat?: NewUiValidationOptions | boolean
}

export type NewUiValidationOptions = {
  foreignOrStateless?: boolean
  nationalWithoutHouseholdRegistration?: boolean
  hkMacaoResident?: boolean
  mainlandChinaResident?: boolean
}
```

### `isBan(input, options?)`

Validates an 8-digit Business Administration Number.

```ts
import { isBan } from 'taiwan-id-validator'

isBan('04595257') // true
isBan('12345675', { applyOldRules: true }) // true
```

The current checksum rule is used by default. `applyOldRules` is available for validating legacy data.

```ts
export type BanValidationOptions = {
  applyOldRules?: boolean
}
```

BAN values are identifiers, so v2 accepts strings only. This preserves leading zeroes.

### `isCdcNumber(input)`

Validates the 16-character Citizen Digital Certificate barcode format used by the E-Invoice specification.

```ts
import { isCdcNumber } from 'taiwan-id-validator'

isCdcNumber('AB12345678901234') // true
```

### `isMobileBarcode(input)`

Validates an E-Invoice Mobile Barcode.

```ts
import { isMobileBarcode } from 'taiwan-id-validator'

isMobileBarcode('/+.-++..') // true
```

### `isDonateCode(input)`

Validates a 3 to 7 digit E-Invoice Donation Code.

```ts
import { isDonateCode } from 'taiwan-id-validator'

isDonateCode('001') // true
```

Donation codes are identifiers, so v2 accepts strings only and preserves leading zeroes.

## Detailed validation API

Use the parallel `validateXxx` functions when a caller needs the reason for a failure or the detected ID category. Detailed validators accept `unknown`, which makes them suitable for request bodies, form values, and other external-data boundaries.

```ts
import { validateBan } from 'taiwan-id-validator'

const result = validateBan('12345678')

if (!result.valid) {
  result.reason // 'INVALID_CHECKSUM'
}
```

The shared result type is:

```ts
export type ValidationResult<Reason extends string> =
  | { valid: true }
  | { valid: false; reason: Reason }
```

`valid` means that the input passed both the validator rules and any caller-supplied options. It does not mean that an identifier is currently issued, registered, active, or owned by a particular person or account.

### Failure reasons

Each detailed validator exposes its own closed failure-reason union. Failure reasons and their precedence are stable public API for the v2 major version, so exhaustive `switch` statements and `satisfies Record<Reason, ...>` are supported.

| Validator | Failure reasons in precedence order |
| --- | --- |
| `validateBan` | `INVALID_INPUT_TYPE`, `INVALID_LENGTH`, `INVALID_CHARACTER`, `INVALID_CHECKSUM` |
| `validateCdcNumber` | `INVALID_INPUT_TYPE`, `INVALID_LENGTH`, `INVALID_FORMAT` |
| `validateDonateCode` | `INVALID_INPUT_TYPE`, `INVALID_LENGTH`, `INVALID_CHARACTER` |
| `validateMobileBarcode` | `INVALID_INPUT_TYPE`, `INVALID_LENGTH`, `INVALID_PREFIX`, `INVALID_CHARACTER` |
| `validateIdCardNumber` | `INVALID_INPUT_TYPE`, `INVALID_LENGTH`, `INVALID_FORMAT`, `INVALID_CHECKSUM`, `CATEGORY_NOT_ALLOWED` |

For example:

```ts
import {
  validateBan,
  type BanValidationFailureReason
} from 'taiwan-id-validator'

const messages = {
  INVALID_INPUT_TYPE: 'Input must be a string',
  INVALID_LENGTH: 'Length is incorrect',
  INVALID_CHARACTER: 'Input contains an unsupported character',
  INVALID_CHECKSUM: 'Checksum is incorrect'
} satisfies Record<BanValidationFailureReason, string>

const result = validateBan('12AB5678')
if (!result.valid) console.log(messages[result.reason])
```

### ID categories

`validateIdCardNumber` also returns the detected category once the input structure identifies one:

```ts
import { validateIdCardNumber } from 'taiwan-id-validator'

validateIdCardNumber('A123456789')
// { valid: true, category: 'NATIONAL_ID' }

validateIdCardNumber('A123456788')
// { valid: false, reason: 'INVALID_CHECKSUM', category: 'NATIONAL_ID' }

validateIdCardNumber('A800000014', { uiNumber: false })
// {
//   valid: false,
//   reason: 'CATEGORY_NOT_ALLOWED',
//   category: 'UI_NUMBER_FOREIGN_OR_STATELESS'
// }
```

The public category union is:

```ts
export type IdCardCategory =
  | 'NATIONAL_ID'
  | 'UI_NUMBER_LEGACY'
  | 'UI_NUMBER_FOREIGN_OR_STATELESS'
  | 'UI_NUMBER_NATIONAL_WITHOUT_HOUSEHOLD_REGISTRATION'
  | 'UI_NUMBER_HK_MACAO_RESIDENT'
  | 'UI_NUMBER_MAINLAND_CHINA_RESIDENT'
```

| Category | Corresponding option |
| --- | --- |
| `NATIONAL_ID` | `nationalId` |
| `UI_NUMBER_LEGACY` | `uiNumber.oldFormat` |
| `UI_NUMBER_FOREIGN_OR_STATELESS` | `uiNumber.newFormat.foreignOrStateless` |
| `UI_NUMBER_NATIONAL_WITHOUT_HOUSEHOLD_REGISTRATION` | `uiNumber.newFormat.nationalWithoutHouseholdRegistration` |
| `UI_NUMBER_HK_MACAO_RESIDENT` | `uiNumber.newFormat.hkMacaoResident` |
| `UI_NUMBER_MAINLAND_CHINA_RESIDENT` | `uiNumber.newFormat.mainlandChinaResident` |

`INVALID_CHECKSUM` takes precedence over `CATEGORY_NOT_ALLOWED`. A structurally recognized but checksum-invalid identifier is therefore reported as a checksum failure even if its category is disabled by options.

### Result-object compatibility

The documented fields and their semantics are public API. Result objects are intentionally extensible, however: future minor releases may add optional informational metadata fields. Consumers should not depend on the exact set of object keys or use exact-object equality as an API contract.

The closed `reason` and `IdCardCategory` unions are different: their member sets, precedence, and structure-to-category mapping remain stable throughout v2. If a future official format or checksum specification requires a behavioral change, it must be explicitly documented and versioned according to its compatibility impact rather than being introduced as an undocumented reclassification.

Changes to whether an identifier is currently active are outside this library's structural-validation scope. For example, legacy UI Numbers remain structurally validatable for stored data even after their official active-use period ends.

### Input normalization

The library validates the input it receives and does not trim, uppercase, or otherwise normalize it. Applications may normalize user input before validation when that matches their UX policy.

For example, `a123456789` is not silently converted to uppercase and currently returns `INVALID_FORMAT`.

## Migration from v1

v2 intentionally simplifies the public API.

| v1 | v2 |
| --- | --- |
| `isGuiNumberValid` / `isGUI` | `isBan` |
| `isNationalIdentificationNumberValid` / `isNI` | `isIdCardNumber` |
| `isResidentCertificateNumberValid` / `isRC` | `isIdCardNumber` |
| `isNewResidentCertificateNumberValid` / `isNewRC` | `isIdCardNumber` |
| `isOriginalResidentCertificateNumberValid` / `isOriginalRC` | `isIdCardNumber` |
| `isCitizenDigitalCertificateNumberValid` / `isCDC` | `isCdcNumber` |
| `isEInvoiceCellPhoneBarcodeValid` / `isCellPhoneBarcode` | `isMobileBarcode` |
| `isEInvoiceDonateCodeValid` / v1 alias `isDonateCode` | `isDonateCode` |
| `isCreditCardNumberValid` / `isCreditCard` | Removed |

Other breaking changes:

- `isBan` accepts a string instead of `string | number`.
- v1 `isGuiNumberValid` used the legacy `% 10` BAN checksum rule by default. v2 `isBan` uses the current `% 5` rule by default; pass `{ applyOldRules: true }` when validating legacy data.
- `isDonateCode` accepts a string instead of `string | number`. This includes the same-named v1 alias, which previously pointed to `isEInvoiceDonateCodeValid` and accepted numbers.
- Credit card validation was removed because it is outside the Taiwan identifier domain and issuer ranges change independently of this library.
- The browser bundle now targets ES2018. v1's explicit ES5 compatibility is no longer provided.

## Migration from the v2 prerelease

The `2.0.0-0` prerelease used the option name `statelessResident` for new-format UI Numbers whose third digit is `7`. The official category is 臺灣地區無戶籍國民, so the final v2 API renames it to:

```ts
nationalWithoutHouseholdRegistration
```

## Compatibility

The maintained development and CI baseline is Node.js 24 LTS with npm 12. The published package itself remains zero-runtime-dependency and does not impose a Node.js `engines` restriction on consumers.

The browser build targets ES2018 and is published as UMD through the `unpkg` and `jsdelivr` package fields.

## Development

Use Node.js 24. The repository includes an `.nvmrc`, so nvm users can run:

```sh
nvm use
npm ci
npm run check
npm run test:cov
npm run test:package
```

`test:package` builds and packs the package, validates the published shape through ESM, CommonJS, TypeScript NodeNext, browser-global, AMD, and package-metadata consumers, then runs the v2 behavioral regression gate.

The regression gate compares the current package against the actually published `taiwan-id-validator@2.0.0` dist bundle. The v2 contract is zero unexplained behavioral differences. A future official format or checksum change that intentionally changes existing boolean behavior must be reviewed separately and recorded in `scripts/regulatory-deltas.json` with its authoritative source and effective date. The v2.0.0 package is intentionally retained as the baseline oracle.

### TypeScript 7 transition

The project typechecks with TypeScript 7. TypeScript 7 currently does not expose the compiler API used by parts of the ecosystem, so the development dependencies use TypeScript's recommended side-by-side transition:

- `@typescript/native` aliases the TypeScript 7 package and provides the `tsc` CLI used for source typechecking.
- `typescript` aliases `@typescript/typescript6`, which provides the TypeScript 6 compatibility API and the `tsc6` CLI.
- Declaration files are emitted with `tsc6`, while the published declarations are verified with the TypeScript 7 `tsc` CLI in NodeNext mode.

This compatibility alias should be removed once the relevant tooling supports the TypeScript 7 compiler API directly.

## Release

Releases are published from GitHub Releases through npm Trusted Publishing. The release tag must match the package version, for example `v2.0.0`.

Before the first release, configure a GitHub Actions Trusted Publisher for the `taiwan-id-validator` package in npm with:

- Organization or user: `enylin`
- Repository: `taiwan-id-validator`
- Workflow filename: `release.yml` (filename only, not the full `.github/workflows/` path)
- Allowed action: `npm publish`

The release workflow uses OIDC and does not require a long-lived `NPM_TOKEN`.

## Validation sources

See [docs/specification-sources.md](docs/specification-sources.md) for the government references and the date on which each rule set was last reviewed.

## License

MIT
