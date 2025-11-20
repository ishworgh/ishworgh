# 🚀 GitHub Migration Guide

This guide will help you push your **new Hugo site** to your existing repository (`ishworgh/ishworgh`) while keeping the **old site** safe on a separate branch.

## Prerequisites
*   You must have git installed.
*   You must be logged in to GitHub in your terminal.

## Step 1: Prepare the Repository
Run these commands in your terminal inside the project folder:

```bash
# 1. Add all new files to the staging area
git add .

# 2. Commit the new site
git commit -m "feat: Initial commit of new Hugo site"

# 3. Rename the current branch to main (if it isn't already)
git branch -m main
```

## Step 2: Handle the Remote Repository
Now we need to connect to your existing GitHub repo and handle the old code.

```bash
# 1. Add the remote repository
git remote add origin https://github.com/ishworgh/ishworgh.git

# 2. Fetch the old history (so we don't overwrite it blindly)
git fetch origin

# 3. Create a new branch for the OLD code
# This creates a branch 'legacy-v1' pointing to the current live code on GitHub
git branch legacy-v1 origin/main

# 4. Push the legacy branch to GitHub to save it
git push origin legacy-v1
```

## Step 3: Overwrite 'main' with New Site
Now that the old code is safe in `legacy-v1`, we can force push the new site to `main`.

> **⚠️ WARNING**: This will replace the content of the `main` branch with your new site. Ensure you ran Step 2 correctly!

```bash
# Force push the new site to main
git push -f origin main
```

## Result
*   **`main` branch**: Contains your **NEW** Hugo website (Live).
*   **`legacy-v1` branch**: Contains your **OLD** website (Archived).

You can switch between them on GitHub by clicking the branch dropdown menu.
