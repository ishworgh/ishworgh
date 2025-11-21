# ishworgh.xyz - User Manual

Welcome to the user manual for your personal website! This guide will walk you through all the essential tasks for managing and updating your site.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Managing Blog Posts](#managing-blog-posts)
3. [Managing Gallery Images](#managing-gallery-images)
4. [Updating Your Resume](#updating-your-resume)
5. [Managing Bookmarks](#managing-bookmarks)
6. [Customizing Themes](#customizing-themes)
7. [Publishing Your Site](#publishing-your-site)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Running the Local Development Server

Before making changes, you should run the Hugo development server to preview your site locally.

```bash
# Navigate to your project directory
cd /home/isor/Projects

# Start the Hugo development server
hugo server -D
```

This will start a local server at `http://localhost:1313`. The site will automatically reload when you make changes.

### Project Structure

```
/home/isor/Projects/
├── content/          # All your content files (blog posts, pages, etc.)
│   ├── blog/         # Blog posts
│   ├── gallery/      # Gallery images
│   ├── resume.md     # Resume content
│   └── bookmarks.md  # Bookmarks page
├── layouts/          # HTML templates
├── static/           # Static files (images, PDFs, fonts, CSS, JS)
├── hugo.toml         # Site configuration
└── public/           # Generated site (created after running `hugo`)
```

---

## Managing Blog Posts

### Creating a New Blog Post

#### Step 1: Create a New Directory

Blog posts in Hugo use "page bundles" which keep the post and its images together.

```bash
# Navigate to the blog directory
cd /home/isor/Projects/content/blog

# Create a new directory for your post (use lowercase and hyphens)
mkdir my-new-blog-post

# Create the index.md file
touch my-new-blog-post/index.md
```

#### Step 2: Add Front Matter and Content

Open `my-new-blog-post/index.md` in your text editor and add:

```markdown
---
title: "Your Blog Post Title"
date: 2025-11-21T20:00:00+05:45
draft: false
summary: "A brief summary of your blog post that appears in lists and previews."
tags: ["tag1", "tag2", "web-development"]
---

## Introduction

Write your blog post content here using Markdown.

### Subheading

You can add:
- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Images (see below)

## Adding Images

![Alt text for image](image.jpg)
```

#### Step 3: Add Images to Your Post

Place images in the same directory as your `index.md`:

```bash
# Copy an image to your blog post directory
cp ~/Downloads/my-image.jpg /home/isor/Projects/content/blog/my-new-blog-post/
```

Then reference it in your markdown:
```markdown
![Description of image](my-image.jpg)
```

#### Step 4: Preview and Publish

- With `hugo server -D` running, visit `http://localhost:1313/blog/` to see your new post
- When you're ready to publish, change `draft: false` in the front matter
- To hide a post without deleting it, set `draft: true`

---

## Managing Gallery Images

### Adding New Images to the Gallery

#### Step 1: Prepare Your Image

1. Optimize your image for web (recommended max width: 2000px)
2. Use descriptive filenames (e.g., `sunset-at-pokhara.jpg`)

#### Step 2: Add Image to Gallery Content

Open `/home/isor/Projects/content/gallery/my-photos.md` and add your image:

```markdown
---
title: "My Photos"
date: 2024-11-20
images:
  - src: "/images/gallery/your-new-image.jpg"
    alt: "Description of the image"
    caption: "Optional caption text"
  - src: "/images/gallery/another-image.jpg"
    alt: "Another beautiful photo"
    caption: "Another caption"
---
```

#### Step 3: Add the Image File

Place your image in the static directory:

```bash
# Create gallery directory if it doesn't exist
mkdir -p /home/isor/Projects/static/images/gallery

# Copy your image
cp ~/Downloads/sunset-at-pokhara.jpg /home/isor/Projects/static/images/gallery/
```

### Creating a New Gallery Category

You can create different gallery pages (e.g., "Travel", "Events"):

```bash
# Create a new gallery file
cd /home/isor/Projects/content/gallery
touch travel-photos.md
```

Add content:
```markdown
---
title: "Travel Photos"
date: 2024-11-20
images:
  - src: "/images/gallery/travel/image1.jpg"
    alt: "Description"
---
```

---

## Updating Your Resume

### Editing Resume Content

Your resume is located at `/home/isor/Projects/layouts/resume/single.html`.

#### Adding a New Job Experience

Find the "Professional Experience" section and add a new timeline item:

```html
<div class="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-all group hover:translate-x-1">
    <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-bg"></div>
    <h3 class="text-xl font-bold text-text">Job Title</h3>
    <div class="text-primary font-medium mb-2">Company Name</div>
    <div class="text-sm text-secondary mb-4 flex items-center gap-2">
        <i data-feather="calendar" class="w-4 h-4"></i> Start Date - End Date
    </div>
    <ul class="list-disc list-outside ml-4 space-y-2 text-secondary/90">
        <li>Responsibility or achievement 1</li>
        <li>Responsibility or achievement 2</li>
    </ul>
</div>
```

#### Adding a Certificate

In the "Licenses & Certificates" section:

```html
<div class="bg-surface p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-lg">
    <h3 class="text-lg font-bold text-text mb-2 flex items-center gap-2">
        Certificate Name
        <button onclick="openLightbox('/certificate-image.jpg')"
            class="text-primary hover:text-accent transition-colors p-1" title="View Certificate">
            <i data-feather="image" class="w-4 h-4"></i>
        </button>
    </h3>
    <div class="text-primary font-medium mb-2">Issuing Organization</div>
    <div class="text-sm text-secondary flex items-center gap-2">
        <i data-feather="calendar" class="w-4 h-4"></i> Issued Date - Expires Date
    </div>
</div>
```

#### Adding Certificate Images

1. Place certificate images in `/home/isor/Projects/static/`
2. Reference them with the filename (e.g., `/certificate-name.jpeg`)

#### Updating the Resume PDF

To update the downloadable PDF:

```bash
# Replace the existing PDF
cp ~/Downloads/updated-resume.pdf /home/isor/Projects/static/resume.pdf
```

---

## Managing Bookmarks

Your bookmarks are stored in `/home/isor/Projects/content/bookmarks.md`.

### Adding a New Bookmark Category

```markdown
## Category Name

- [Website Name](https://example.com) - Brief description
- [Another Site](https://another.com) - Description
```

### Example:

```markdown
## Development Tools

- [GitHub](https://github.com) - Code hosting and collaboration
- [Stack Overflow](https://stackoverflow.com) - Programming Q&A
- [MDN Web Docs](https://developer.mozilla.org) - Web development documentation
```

---

## Customizing Themes

Your site has 10 built-in color themes. Visitors can switch themes using the monitor icon in the navigation bar.

### Available Themes

1. **Catppuccin** (Latte/Mocha) - Default
2. **Dracula**
3. **Tokyo Night**
4. **Nord**
5. **Solarized**
6. **Gruvbox**
7. **Evergreen**
8. **One Dark**
9. **Rose Pine**
10. **Breeze**

### Changing the Default Theme

Edit `/home/isor/Projects/layouts/_default/baseof.html` and change line 37:

```javascript
const palette = localStorage.getItem('themePalette') || 'catppuccin'; // Change 'catppuccin' to another theme name
```

---

## Publishing Your Site

### Building the Site

When you're ready to publish your changes:

```bash
# Navigate to project directory
cd /home/isor/Projects

# Build the site (this creates the 'public' folder)
hugo

# The generated site is now in the 'public' directory
```

### Deploying to GitHub Pages

1. **Commit your changes:**

```bash
git add .
git commit -m "Updated blog post and resume"
git push origin main
```

2. **Your GitHub Actions workflow will automatically build and deploy the site**

The site will be live at `https://ishworgh.xyz` within a few minutes.

### Manual Deployment

If you need to manually deploy:

```bash
# Build the site
hugo

# The contents of the 'public' folder are ready to be uploaded
# to any static hosting service
```

---

## Troubleshooting

### Hugo Server Not Starting

**Problem:** `hugo server -D` fails to start

**Solution:**
```bash
# Check if another server is running on the same port
pkill hugo

# Try starting again
hugo server -D
```

### Changes Not Showing on Live Site

**Problem:** Changes show locally but not on the live site

**Solution:**
1. Ensure you've committed and pushed to GitHub
2. Check GitHub Actions tab for build status
3. Clear your browser cache (Ctrl+Shift+R)

### Images Not Displaying

**Problem:** Images show locally but not on the live site

**Solution:**
1. Verify the image path starts with `/` (e.g., `/images/photo.jpg`)
2. Ensure the image is in the `static` folder, not `content`
3. Check that the image was committed to Git

### Blog Post Not Appearing

**Problem:** New blog post doesn't show up

**Solution:**
1. Check that `draft: false` in the front matter
2. Verify the date is not in the future
3. Ensure the post is in `content/blog/post-name/index.md` format

---

## Quick Command Reference

```bash
# Start development server
hugo server -D

# Build production site
hugo

# Create new blog post directory
mkdir content/blog/my-new-post

# Check Hugo version
hugo version

# Check for errors
hugo --verbose

# Clean build cache
hugo --gc
```

---

## Need Help?

If you encounter issues not covered in this manual:

1. Check the [Hugo Documentation](https://gohugo.io/documentation/)
2. Review the terminal output for error messages
3. Verify file paths and formatting

---

**Last Updated:** November 21, 2025  
**Version:** 1.0
