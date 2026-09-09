# a+pgrp Website

This project is a Vite + React site deployed to GitHub Pages for:

`https://ap-grp.github.io/ap-grp_website/`

Source repository:

`https://github.com/ap-grp/ap-grp_website`

## Deployment Model

The main deployment path uses GitHub Actions.

- Push source code to `main` or `master`
- GitHub Actions builds the site
- GitHub Pages publishes the generated `dist/` output

The workflow file is:

`.github/workflows/deploy-pages.yml`

## One-Time GitHub Setup

In the GitHub repository:

1. Open `Settings`
2. Open `Pages`
3. Under `Build and deployment`, set `Source` to `GitHub Actions`

## Redeploy From Source

Use this path if you have the full repository and can install dependencies.

### Requirements

- Git
- Node.js 22 recommended
- npm installed

### Steps

1. Clone the repository:

```bash
git clone https://github.com/ap-grp/ap-grp_website.git
cd ap-grp_website
```

2. Install dependencies:

Preferred if `pnpm` is available:

```bash
corepack enable
pnpm install
```

If only `npm` is available:

```bash
npm install --legacy-peer-deps
```

3. Run locally if needed:

```bash
npm run dev
```

4. Build locally if needed:

```bash
env VITE_BASE_PATH=/ap-grp_website/ npm run build
```

5. Commit and push:

```bash
git add .
git commit -m "Update website"
git push origin master
```

If the repo uses `main` instead of `master`, push to `main`:

```bash
git push origin main
```

6. Wait for GitHub Actions to finish.

Check:

- GitHub repository `Actions` tab
- The `Deploy GitHub Pages` workflow

Once successful, GitHub Pages updates automatically.

## Redeploy Using Only a `dist/` Folder

Use this only if the source code is not available and you only have a built export.

This method does not use the GitHub Actions workflow. It publishes the static files from a `gh-pages` branch instead.

### Important

If you use this method, change GitHub Pages settings:

1. Open `Settings`
2. Open `Pages`
3. Under `Build and deployment`, set `Source` to `Deploy from a branch`
4. Select branch `gh-pages`
5. Select folder `/ (root)`

### Steps

1. Put the built files somewhere local. The folder should contain files like:

- `index.html`
- `assets/`

2. Create a clean temporary repo for the Pages branch:

```bash
mkdir gh-pages-upload
cd gh-pages-upload
git init
git checkout -b gh-pages
git remote add origin https://github.com/ap-grp/ap-grp_website.git
```

3. Copy the contents of `dist/` into this folder.

Example:

```bash
cp -R /path/to/dist/* .
```

4. Commit and push:

```bash
git add .
git commit -m "Manual Pages redeploy from dist"
git push --force origin gh-pages
```

After GitHub Pages finishes publishing, the website will be live again.

## Notes

- The project base path is `/ap-grp_website/`, which is required for GitHub Pages project hosting.
- The deployment workflow rebuilds from source. If source is available, use the normal source-based redeploy path.
- The `dist/`-only method is a fallback for emergencies or handoff situations.
