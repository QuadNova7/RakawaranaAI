---
description: Runs a 4-cycle test, review, and improve loop.
---

1. **Cycle 1 - Test (Fast Baseline)**: Run the full test suite and return the raw terminal output. *(Recommended model: Gemini 3.5 Flash)*
2. **Cycle 1 - Review**: Identify simple syntax errors, missing imports, and basic test failures.
3. **Cycle 1 - Improve**: Apply immediate code fixes to clear out low-hanging fruit and get tests running.
4. **Cycle 2 - Test (Core Logic)**: Re-run the tests to verify the baseline fixes from Cycle 1. *(Recommended model: Claude 4.6 Sonnet)*
5. **Cycle 2 - Review**: Perform a detailed architectural review of any remaining failures, focusing on logic flow and structural bugs. **Stop and ask the user for approval before continuing.**
6. **Cycle 2 - Improve**: Implement structural and logical corrections based precisely on the review.
7. **Cycle 3 - Test (Broad Context Refactoring)**: Execute the test suite again against the updated codebase. *(Recommended model: Gemini 3.1 Pro)*
8. **Cycle 3 - Review**: Analyze the code for regressions, unhandled edge cases, or cross-file dependencies using your large context window.
9. **Cycle 3 - Improve**: Refactor the code and patch any complex edge-case failures.
10. **Cycle 4 - Test (Heavy Verification & Polish)**: Run the final, comprehensive test evaluation. *(Recommended model: Claude 4.6 Opus)*
11. **Cycle 4 - Review**: Conduct a master-level review. Look for subtle race conditions, memory leaks, and deep architectural flaws. **Stop and ask the user for approval before continuing.**
12. **Cycle 4 - Improve**: Execute final production-grade hardening, optimization, and code polish to close out the loop.