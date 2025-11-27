---
"bpac-js": major
---
Breaking change to import path (brotherSdk → brotherSDK), normalized type names, exported types, and added ignoreMissingKeys feature.

Migration notes:  
- Update all imports from `BrotherSdk` → `BrotherSDK`  
- Check your TypeScript types, some names have changed  
- `ignoreMissingKeys` may change template key validation behavior
