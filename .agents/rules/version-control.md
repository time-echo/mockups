# Version Control

- Agents never run `git commit`; implement and verify, then leave staging and commits to the user.
- Commit messages and PR titles follow Conventional Commits (enforced by commitlint, Husky `commit-msg`, and the PR Title workflow).
- The pre-commit hook runs `tsc --noEmit`; fix type errors rather than bypassing with `--no-verify`.
- PRs use `.github/pull_request_template.md`; the PR Size workflow labels by changed lines (`size/XS`–`size/XL`), so keep PRs focused.
