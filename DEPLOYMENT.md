# Deployment Guide

## Automatic Deployment (Recommended)

The site automatically deploys via GitHub Actions when you push changes:

### Development Environment
1. Push or merge changes to the `develop` branch
2. GitHub Actions automatically builds and deploys to `dev.woburn.cc`
3. Changes are live in ~2-3 minutes

### Production Environment
1. Push or merge changes to the `main` branch
2. GitHub Actions automatically builds and deploys to `woburn.cc`
3. Changes are live in ~2-3 minutes

### Manual Deployment via GitHub Actions

For more control, you can manually trigger deployments:

1. Go to your repository on GitHub
2. Click **Actions** → **Deploy to AWS** → **Run workflow**
3. Choose options:
   - **Environment**: `dev` or `prod`
   - **Deploy infrastructure stack**: Check this box if you modified `serverless.yml` (CloudFront, S3 config)
   - **Deploy site assets**: Check this box to deploy the built site (checked by default)
4. Click **Run workflow**

**Common scenarios:**
- **Content/code changes only**: Leave defaults (assets only) - ~2-3 minutes
- **Infrastructure changes only**: Check infrastructure, uncheck assets - ~15-20 minutes
- **Both**: Check both boxes - ~15-20 minutes total

## GitHub Secrets Setup

To enable automatic deployments, add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `AWS_ACCESS_KEY_ID` - Your AWS access key with S3, CloudFront, and CloudFormation permissions
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `GOOGLE_CALENDAR_API_KEY` - Google Calendar API key (maps to PUBLIC_GOOGLE_CALENDAR_API_KEY in Astro build)

## Common Workflows

### Updating Content/Code
1. Create a branch from `develop`
2. Make your changes to React components, styles, etc.
3. Test locally: `npm start`
4. Commit and push your branch
5. Create a PR to `develop` → merge → auto-deploys to dev
6. When ready, merge `develop` → `main` → auto-deploys to prod

### Updating Calendar API Key
1. Update the `GOOGLE_CALENDAR_API_KEY` GitHub secret (it maps to PUBLIC_GOOGLE_CALENDAR_API_KEY during build)
2. Manually trigger a deployment via GitHub Actions or push a commit
3. The new API key will be embedded in the next build

### Changing Cache Headers or CloudFront Config
1. Update `serverless.yml` (e.g., `custom.client.objectHeaders`)
2. Commit and push to `develop` or `main`
3. Manually trigger deployment with **infrastructure** checkbox enabled
4. Wait 15-20 minutes for CloudFront to update

### Adding a New Domain
1. Add domain to ACM certificate (if needed)
2. Update `custom.url` in `serverless.yml`
3. Manually trigger deployment with **infrastructure** checkbox enabled
4. Add Route53 A/AAAA alias records pointing to CloudFront

## Environment Variables

- `.env` - Used by `astro dev` for local development
- GitHub Secrets - Used by GitHub Actions for deployments
  - `GOOGLE_CALENDAR_API_KEY` is mapped to `PUBLIC_GOOGLE_CALENDAR_API_KEY` during build

Remember: Environment variables prefixed with `PUBLIC_` are baked into the client-side build, so redeploy after changes.

## Troubleshooting

### Changes not appearing?
- CloudFront caches aggressively. HTML files have `Cache-Control: no-cache` so should update immediately.
- Static assets (JS/CSS) are cached for 1 year. The build process includes hashes in filenames, so new builds get new URLs.
- If stuck, invalidate CloudFront cache in AWS Console.

### Calendar API not working?
- Check Google Cloud Console that API key is restricted to your domains
- Verify the `GOOGLE_CALENDAR_API_KEY` GitHub secret is correct (it gets mapped to PUBLIC_GOOGLE_CALENDAR_API_KEY)
- Trigger a new deployment to rebuild with the updated key

### GitHub Actions failing?
- Check that all required secrets are set in the repository
- Verify AWS credentials have necessary permissions
- Review the Actions log for specific error messages

## Infrastructure Details

**Domains:**
- Dev: `dev.woburn.cc`
- Prod: `woburn.cc`, `www.woburn.cc`

**Stack:**
- S3 buckets: `woburn-cc-dev-site`, `woburn-cc-prod-site`
- CloudFront distributions with ACM certificate
- Route53 A/AAAA alias records

**Caching:**
- HTML/page-data: No cache (instant updates)
- Static assets (JS/CSS): 1 year (content-addressed with hashes)
- Images: 1 year

## Advanced: Manual Deployment from Terminal

If you need to deploy directly from your local machine (requires AWS credentials configured locally):

### Prerequisites

Set your AWS credentials as environment variables before running deployment commands:

```bash
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

Or add them to your shell profile (~/.bashrc, ~/.zshrc, etc.) to persist across sessions.

### Deploy Code Changes

**Development:**
```bash
npm run deploy:assets:dev
```

**Production:**
```bash
npm run deploy:assets:prod
```

This builds the Astro site and uploads to S3 (takes ~1 minute).

### Deploy Infrastructure Changes

If you modified `serverless.yml`:

**Development:**
```bash
npm run deploy:stack:dev
```

**Production:**
```bash
npm run deploy:stack:prod
```

⚠️ CloudFront updates take 15-20 minutes to propagate.

### Deploy Everything

**Development:**
```bash
npm run deploy:full:dev
```

**Production:**
```bash
npm run deploy:full:prod
```

### Alternative: Using AWS Profile

If you prefer using AWS profiles instead of environment variables:

1. Configure your AWS credentials with a profile:
   ```bash
   aws configure --profile serverless-admin
   ```

2. Update `serverless.yml` to add the profile (temporarily, don't commit):
   ```yaml
   provider:
     name: aws
     profile: serverless-admin  # Add this line
     runtime: nodejs24.x
   ```

3. Run your deployment commands as normal
