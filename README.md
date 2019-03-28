# taiwan-id-validator

台灣身分證字號驗證與公司統一編號驗證

## Installation

```bash
npm i -S taiwan-id-validator
```

## Usage

After that you can use suitable loaders to access `dependencies`, `resolvers` and `container`.  

```js
// index.js
import { isGuiNumberValid } from 'taiwan-id-validator'

console.log(isGuiNumberValid('12345678'))
```