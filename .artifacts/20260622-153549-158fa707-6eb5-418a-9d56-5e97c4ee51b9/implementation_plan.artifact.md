# Fix syntax error in page.tsx

The build is failing because of a typo in `AnimatePresence` component tag. It is currently written as `AnPresence` (opening tag probably correct, but error shows closing tag issue or mismatched names).

## Proposed Changes

### [Frontend] (file:///C:/Users/PC/Desktop/probix2/src/app/page.tsx)

#### [page.tsx](file:///C:/Users/PC/Desktop/probix2/src/app/page.tsx)

- Correct `AnPresence` to `AnimatePresence`.
- Ensure opening and closing tags match.

## Verification Plan

### Manual Verification
- I will use `analyze_file` to check for syntax errors after the fix.
- I will ask the user to verify if the build error persists (since I cannot run the full dev server and see real-time build output in this environment without specific triggers, but `analyze_file` should catch the parsing error).
