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

No `CNAME` file is included yet. A custom domain should only be added after the DNS record exists and is ready to point at GitHub Pages.

## Public State

- The main public page is the live quote-request customizer.
- The site includes crawl metadata, structured data, and social-share metadata for the published GitHub Pages URL.
- Cloudflare Web Analytics is enabled using the same beacon token as the main site.
