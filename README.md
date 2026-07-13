# express-check-any-for-import-implement 🛠️

> **Inspects JavaScript files to verify whether specific variables are imported, and tracks exactly where they are referenced/used inside the code.**

[![npm version](https://img.shields.io/npm/v/express-check-any-for-import-implement.svg?style=flat-square&color=38bdf8)](https://www.npmjs.com/package/express-check-any-for-import-implement)
[![license](https://img.shields.io/npm/l/express-check-any-for-import-implement.svg?style=flat-square&color=34d399)](LICENSE)

---

## 📖 Overview

`express-check-any-for-import-implement` builds on top of `express-check-any-for-import`. It allows developers to check if a particular variable (like `'express'`, `'routerFromapi'`, or `'dotenv'`) is imported in a target file, and if so, search all subsequent lines in that file to output the occurrences and line numbers where the variable is referenced.

---

## ✨ Features

*   **🔍 Import Verification**: Uses `express-check-any-for-import` to resolve whether a variable is part of the file's import declarations.
*   **📍 Accurate Reference Tracking**: Searches subsequent code lines (lines following the import block) using word boundary markers (`\b`) to locate valid usages and references.
*   **⚡ Lightweight Integration**: Re-uses the parsing helpers dynamically from the import package to keep the package footprint minimal.

---

## 🚀 Installation

```bash
npm install express-check-any-for-import-implement
```

Make sure the companion package `express-check-any-for-import` is also installed in your dependencies.

---

## 🛠️ Programmatic Usage

### `load({ jsFileContent, inCheckLines, showLog })`

The main runner function `load` verifies and returns reference data for the requested variable:

```javascript
import load from 'express-check-any-for-import-implement';

const result = load({
  jsFileContent: `
    import express from 'express';
    const app = express();
  `,
  inCheckLines: 'express',
  showLog: true
});

console.log(result);
```

### Result Object Structure

If the variable is **imported**:
```json
{
  "imported": true,
  "startLine": 2,
  "endLine": 2,
  "usages": [
    {
      "lineNumber": 3,
      "lineContent": "const app = express();"
    }
  ]
}
```

If the variable is **not imported**:
```json
{
  "imported": false
}
```

---

## 📜 Full Example

Given the test fixture file `app.js`:
```javascript
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import express from "express";
const app = express();
```

Executing `load` on the content for the variable `'express'`:
```javascript
const result = load({
    jsFileContent: fs.readFileSync('app.js', 'utf8'),
    inCheckLines: 'express',
    showLog: true
});
```

Produces the following log:
```text
Variable "express" is imported (Lines 4-4).
Usages found: [ { lineNumber: 5, lineContent: 'const app = express();' } ]
```

And returns:
```json
{
  "imported": true,
  "startLine": 4,
  "endLine": 4,
  "usages": [
    {
      "lineNumber": 5,
      "lineContent": "const app = express();"
    }
  ]
}
```

---

## ⚖️ License

MIT License. Designed with ❤️ by [KeshavSoft](https://github.com/keshavsoft).
