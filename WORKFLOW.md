# AI-Assisted Workflow Comparison

## Round 1: Vague Prompt

For Round 1, I used a fresh AI session with the intentionally vague prompt: “Build a settings form with validation for this project.” The AI produced a working settings form, but it also created several documentation files (`COMPLETION_SUMMARY.md`, `FORM_TESTING.md`, and `SETTINGS_FORM.md`) and modified `README.md`. This increased the review surface beyond the actual feature.

## Round 2: Precise Prompt

For Round 2, I used a fresh session and provided project context, requirements, constraints, edge cases, accessibility expectations, and an explicit explore → plan → code → test workflow. The AI inspected the existing project before implementing changes and added automated validation tests. The final changes were limited to `settings.js` and `tests/settings-form.test.js`.

## Specific Differences

The branch diff shows `settings.js` changed substantially:  Round 2 introduced testable validation behavior for required values, invalid email addresses, optional empty fields, and successful valid settings.

## Correctness and Edge Cases

Round 2 provided stronger evidence of correctness because four tests passed with zero failures. The tests covered required fields, invalid email input, optional fields, and valid submission. This was more reliable than relying mainly on manual inspection of the Round 1 result.

## Accessibility and Review Effort

The precise prompt explicitly requested proper labels, accessible controls, and clear validation messages, giving the AI clearer acceptance criteria. Round 1 required more review because the AI made unrelated documentation changes. Round 2 was easier to review because its changes were more focused and included automated tests.

## AI Mistake I Caught

During Round 2, the AI initially wanted to create or modify `package.json` for testing. I rejected that unnecessary project change and instructed it to use the existing lightweight testing approach unless a dependency was genuinely required. The final verification used `node --test` and produced four passing tests without modifying `package.json`.

## What I Learned

A vague prompt can produce a usable result, but it leaves important decisions to the AI and increases review effort. A precise prompt takes longer to write but gives the AI clearer boundaries, makes edge cases explicit, and creates stronger verification evidence. The second workflow was therefore more controlled and easier to review.