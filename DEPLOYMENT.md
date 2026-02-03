# Deployment Guide

This document explains how to deploy the wedding website to GitHub Pages.

## Prerequisites

1. GitHub repository with GitHub Pages enabled
2. Node.js 20+ installed locally for development
3. Repository permissions to enable GitHub Actions

## GitHub Pages Setup

### 1. Enable GitHub Pages

1. Go to your repository Settings
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. GitHub Actions Workflow

The repository includes a pre-configured GitHub Actions workflow at `.github/workflows/deploy.yml` that:

- Triggers on every push to the `main` branch
- Can also be triggered manually via `workflow_dispatch`
- Runs linting to ensure code quality
- Builds the project
- Deploys to GitHub Pages

### 3. Required Permissions

The workflow includes the necessary permissions:
- `contents: read` - to checkout the repository
- `pages: write` - to deploy to GitHub Pages
- `id-token: write` - for authentication

## Deployment Process

### Automatic Deployment

Every time you push to the `main` branch, the site will automatically:
1. Build with Node.js 20
2. Run ESLint checks
3. Build the production bundle
4. Deploy to GitHub Pages

### Manual Deployment

You can also trigger a deployment manually:
1. Go to the **Actions** tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## Local Development

### Setup
```bash
# Install dependencies
npm ci

# Start development server
npm run dev
```

### Build Locally
```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Base Path

The site is configured to deploy to a subdirectory matching the repository name:
- Repository: `Chai-Un/wedding`
- Base path: `/wedding/` (production only)
- URL: `https://chai-un.github.io/wedding/`

The base path is configured dynamically in `vite.config.ts`:
```typescript
export default defineConfig(({ command }) => ({
  // Use '/' for dev server, '/wedding/' for production builds
  base: command === 'serve' ? '/' : '/wedding/',
  // ...
}))
```

This means:
- **Development** (`npm run dev`): Site runs at `http://localhost:5173/`
- **Production** (`npm run build`): Site builds with `/wedding/` paths for GitHub Pages

React Router automatically uses the correct base path via `import.meta.env.BASE_URL` in `App.tsx`.

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS records according to [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
3. Update the base path logic in `vite.config.ts` to use `'/'` for both dev and production:
   ```typescript
   export default defineConfig({
     base: '/',
     // ...
   })
   ```
4. Update the `basename` in `App.tsx` if needed, or keep using `import.meta.env.BASE_URL`

## Troubleshooting

### Build Failures

If the build fails:
1. Check the Actions tab for error logs
2. Ensure all dependencies are in `package.json`
3. Run `npm run lint` and `npm run build` locally to reproduce

### 404 Errors

If you get 404 errors after deployment:
1. Verify the `base` path in `vite.config.ts` matches your repository name
2. Check that GitHub Pages is enabled and set to GitHub Actions
3. Ensure the workflow completed successfully

### RSVP Form

The RSVP form is configured to submit to a Google Apps Script webhook. Make sure:
1. The webhook URL in `src/constants/config.ts` is correct
2. The Google Apps Script is deployed and accessible
3. CORS is properly configured

## Monitoring

After deployment, you can:
- View deployment status in the **Actions** tab
- Check the live site at the GitHub Pages URL
- Monitor deployment history in the **Deployments** section

## Security

The site includes a Content Security Policy (CSP) that:
- Allows scripts from self and Google Apps Script
- Allows styles from self and Google Fonts
- Allows fonts from self and Google Fonts
- Allows images from self, data URLs, and HTTPS sources
- Allows connections to self and Google Apps Script

Update the CSP in `index.html` if you add external resources.
