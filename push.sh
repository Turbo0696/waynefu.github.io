#!/usr/bin/env bash
# One-shot: configure git identity for this repo, then commit and push.
set -e

cd "$(dirname "$0")"

echo "--- configuring git identity (repo-local) ---"
git config user.name "Wayne Fu"
git config user.email "waynefu@umich.edu"

echo "--- current status ---"
git status

echo "--- staging all changes ---"
git add -A

echo "--- committing ---"
git commit -m "feat(journal): add July 1 aftermarket dynamics entry on R2R and warranty"

echo "--- pushing to origin/main ---"
echo "(A browser window may open for GitHub authentication — click Authorize.)"
git push

echo "--- done ---"
git log --oneline -3
