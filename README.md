# Lignum Artifex Customizer

Separate product customizer site for Lignum Artifex.

## Purpose

This repo hosts a standalone quote-request customizer that lives separately from the main marketing site while keeping the same brand feel.

## Stack

- Static HTML, CSS, and JavaScript
- GitHub Pages compatible
- Formspree for submissions

## Local Preview

Open [index.html](./index.html) directly, or run a simple static server.

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Product Data

Reusable product definitions live in [assets/data/products.json](./assets/data/products.json).

Each product can define:

- identity and imagery
- quote type
- option groups
- conditional fields
- rules and notes

## Deployment

This project is intended for GitHub Pages first, with a custom subdomain added later.

After GitHub Pages is enabled for the repo, the default published URL will be:

`https://dande60.github.io/lignum-artifex-customizer/`

## Temporary Public State

- The public root page currently shows a branded coming-soon experience.
- The unfinished customizer is preserved privately at [customizer-preview.html](./customizer-preview.html).
- The preview page is intentionally unlinked from the public landing page.
