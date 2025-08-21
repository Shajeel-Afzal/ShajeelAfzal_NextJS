# Main Branch Protection Policy

This repository enforces strict protection on the `main` branch to ensure stability and code quality.

## Rules
- No direct pushes to `main` (including code owners) — use PRs.
- Only PRs from `dev` are allowed to merge into `main` (enforced by CI).
- Linear history required (no merge commits to `main`).
- Require up-to-date branch before merge.
- Require at least 1 approving review.
- Dismiss stale reviews on new commits.
- Require all conversations to be resolved.
- Block force pushes and branch deletions.

## CI Enforcement
A GitHub Actions workflow `.github/workflows/enforce-dev-to-main.yml` runs on PRs targeting `main` and fails unless the source branch is exactly `dev`.

Required status checks include the job `validate-source-branch`.

## Admin Bypass
Admins and code owners retain the ability to bypass protections for emergencies. Use sparingly and document the reason:
- Emergency security patches
- Critical production fixes during outages
- Repository maintenance (branch cleanup, structural changes)

When using a bypass:
- Include a clear justification in the commit message and PR description.
- Open a follow-up PR to re-align with the normal process if needed.

## Standard Flow
feature/* → PR into `dev` → PR from `dev` → `main` (after review and passing checks)

## Stricter Option (optional)
- Increase required reviews to 2
- Enable code owner reviews
- Add specific reviewer requirements
