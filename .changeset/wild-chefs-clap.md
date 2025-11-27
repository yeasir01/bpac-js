---
"bpac-js": major
---

- Breaking changes in v3.0.0:

  - `BrotherSdk` import path is now `BrotherSDK`
  - Type names normalized
  - Exported types
  - Added `ignoreMissingKeys` feature for PR#21

  **Migration notes:**

  - Update all imports from `BrotherSdk` → `BrotherSDK`
  - Check your TypeScript types, some names have changed
  - If you rely on strict template key validation, `ignoreMissingKeys` may change this behavior