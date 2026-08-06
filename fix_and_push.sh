#!/usr/bin/env bash
# Fix the author on the most recent commit, then push to origin/main.
set -e

cd "$(dirname "$0")"

echo "--- setting git identity (repo-local) ---"
git config user.name "Wayne Fu"
git config user.email "waynefu@umich.edu"

echo "--- amending most recent commit with correct author ---"
git commit --amend --reset-author --no-edit

echo "--- verifying log ---"
git log --oneline -3

echo "--- pushing to origin/main ---"
echo "(A browser window may open for GitHub authentication — click Authorize.)"
git push

echo "--- done. final log: ---"
git log --oneline -3
