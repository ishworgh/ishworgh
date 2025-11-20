---
title: "Revamping My Digital Garden: A Deep Dive into Hugo & Tailwind"
date: 2025-11-21T01:55:00+05:45
draft: false
summary: "How I transformed my personal website into a modern, responsive, and highly customizable digital garden using Hugo, Tailwind CSS, and a touch of JavaScript magic."
tags: ["hugo", "tailwind", "web-development", "design", "themes"]
---

Welcome to the new **ishworgh.xyz**!

Over the past few days, I've been on a mission to completely overhaul my digital home. My goal was simple: create a site that is fast, easy to maintain, and visually stunning, while offering a high degree of personalization for my visitors.

Here is a look at what went into building this new version of my site.

## The Tech Stack

I chose a stack that prioritizes performance and developer experience:

*   **[Hugo](https://gohugo.io/)**: For static site generation. It's blazing fast and flexible.
*   **[Tailwind CSS](https://tailwindcss.com/)**: For utility-first styling. It allowed me to build a custom design system without fighting against a framework.
*   **Vanilla JavaScript**: No heavy frameworks here. Just simple, efficient scripts to handle interactivity.

## Key Features

### 1. Advanced Theming System 🎨

This is my favorite part. I didn't want to settle for just a "Light" and "Dark" mode. I wanted to give you options.

I implemented a robust theming engine that supports **10 distinct color palettes**, including popular developer favorites like:
*   Catppuccin (Latte/Mocha)
*   Dracula
*   Nord
*   Solarized
*   Tokyo Night
*   And more!

The site also features an **"Auto" mode** that intelligently detects your system's color scheme preference and switches automatically. The best part? Your preference is saved, so the site remembers exactly how you like it next time you visit.

### 2. Responsive & Mobile-First Design 📱

The web is mobile. I ensured that every pixel of this site looks great on any device.
*   **Mobile Navigation**: A smooth, animated hamburger menu ensures easy access to all pages on smaller screens.
*   **Adaptive Grids**: The [Bookmarks](/bookmarks/) and [Gallery](/gallery/) pages use responsive grids that scale from a single column on phones to expansive 5-column layouts on large desktop monitors.

### 3. Interactive UI/UX ✨

I believe that small details make a big difference.
*   **Glassmorphism**: The navigation bar and modals feature a modern frosted-glass effect (`backdrop-blur`).
*   **Micro-interactions**: Buttons lift up when hovered, links glow, and the logo gently floats.
*   **Smooth Transitions**: Everything from theme switching to page navigation feels fluid.

### 4. Specialized Pages

*   **[Resume](/resume/)**: A digital CV that is clean, professional, and easy to read. It features a sticky Table of Contents and a print-friendly layout.
*   **[Bookmarks](/bookmarks/)**: My personal start page. It includes a real-time search filter (try `Ctrl+K`!) to quickly find resources.
*   **[Gallery](/gallery/)**: A masonry-style image grid with a custom lightbox viewer. You can even download images directly with a hover button!

## Under the Hood

One of the technical challenges was ensuring that the theme colors applied everywhere—even inside code blocks. I used CSS variables (`var(--primary-color)`, `var(--bg-color)`) extensively to ensure that syntax highlighting and typography adapt dynamically to whichever palette you choose.

## What's Next?

This digital garden is a living project. I plan to continue adding more content, refining the design, and perhaps adding a few more secret features.

Feel free to explore, change the theme to match your mood, and let me know what you think!

Happy browsing! 🚀
