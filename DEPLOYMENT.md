# Deployment Guide

## Quick Reference

### Deploy Code Changes (Most Common)

**Development:**
```bash
npm run deploy:assets:dev
```

**Production:**
```bash
npm run deploy:assets:prod
```

This builds Gatsby and uploads to S3 (takes ~1 minute).

### Deploy Infrastructure Changes

If you modified `serverless.yml` (CloudFront config, caching rules, etc.):

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

If you changed both code and infrastructure:

**Development:**
```bash
npm run deploy:full:dev
```

**Production:**
```bash
npm run deploy:full:prod
```

## Common Workflows

### Updating Content/Code
1. Make your changes to React components, styles, etc.
2. Test locally: `npm start`
3. Deploy: `npm run deploy:assets:prod`
4. Changes are live in ~1 minute

### Updating Calendar API Key
1. Update `.env.development` or `.env.production`
2. Rebuild and deploy: `npm run deploy:assets:prod`

### Changing Cache Headers
1. Update `serverless.yml` under `custom.client.objectHeaders`
2. Deploy: `npm run deploy:stack:prod`
3. Wait 15-20 minutes for CloudFront to update

### Adding a New Domain
1. Add domain to ACM certificate (if needed)
2. Update `custom.url` in `serverless.yml`
3. Deploy: `npm run deploy:stack:prod`
4. Add Route53 A/AAAA alias records pointing to CloudFront

## Environment Variables

- `.env.development` - Used by `gatsby develop` and dev deployments
- `.env.production` - Used by production builds

Remember: Environment variables are baked into the build, so redeploy after changes.

## Troubleshooting

### Changes not appearing?
- CloudFront caches aggressively. HTML files have `Cache-Control: no-cache` so should update immediately.
- Static assets (JS/CSS) are cached for 1 year. The build process includes hashes in filenames, so new builds get new URLs.
- If stuck, invalidate CloudFront cache in AWS Console.

### Calendar API not working?
- Check Google Cloud Console that API key is restricted to your domains
- Verify `.env.production` has the correct API key
- Redeploy assets after updating env vars

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
