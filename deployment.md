# Deployment Guide

Your Hugo site is ready to be deployed! Here are the steps to publish it to the web.

## Prerequisites

1.  **Git Repository**: Ensure your project is initialized as a git repository and pushed to GitHub, GitLab, or Bitbucket.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    # git remote add origin <your-repo-url>
    # git push -u origin main
    ```

## Option 1: Netlify (Recommended)

1.  Log in to [Netlify](https://www.netlify.com/).
2.  Click **"Add new site"** > **"Import from existing project"**.
3.  Connect your Git provider (e.g., GitHub).
4.  Select your repository.
5.  **Build Settings**:
    *   **Build command**: `hugo`
    *   **Publish directory**: `public`
6.  Click **"Deploy site"**.

## Option 2: Vercel

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **"Add New..."** > **"Project"**.
3.  Import your Git repository.
4.  Vercel should automatically detect Hugo.
    *   **Framework Preset**: Hugo
    *   **Build Command**: `hugo`
    *   **Output Directory**: `public`
5.  Click **"Deploy"**.

## Post-Deployment Checks

*   **Domain**: Configure your custom domain (e.g., `ishworgh.xyz`) in the hosting provider's settings.
*   **HTTPS**: Ensure SSL is enabled (usually automatic).
*   **Theme**: Verify the theme switcher works on the live site.

## Troubleshooting

If styles are missing:
*   Check your `baseURL` in `hugo.toml`. It should match your production URL (e.g., `https://ishworgh.xyz/`).
