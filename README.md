# Woburn Cycling Club

Official website for the Woburn Cycling Club - showcasing rides, events, and community for cyclists in Woburn, MA.

## Tech Stack

- **Frontend**: Astro (React, TypeScript, Tailwind CSS)
- **Hosting**: AWS S3 + CloudFront
- **Deployment**: GitHub Actions
- **Calendar**: Google Calendar API integration

## Quick Start

### Prerequisites

- Node.js 24+ (LTS)
- npm

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create `.env`:
   ```bash
   PUBLIC_GOOGLE_CALENDAR_API_KEY=your_api_key_here
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   Site runs at `http://localhost:4321`

4. **Make changes**

   Edit `src/pages/index.astro` to see live updates

## Deployment

Deployments are automated via GitHub Actions. See [DEPLOYMENT.md](DEPLOYMENT.md) for full documentation.

### Quick Reference

- **Push to `develop`** → deploys to dev.woburn.cc
- **Push to `main`** → deploys to woburn.cc

### Required GitHub Secrets

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `GOOGLE_CALENDAR_API_KEY` (maps to PUBLIC_GOOGLE_CALENDAR_API_KEY in build)

## Project Structure

```
woburn.cc/
├── src/
│   ├── components/        # React components
│   │   └── UpcomingRides.tsx
│   ├── images/           # Static images
│   ├── pages/            # Page components
│   │   └── index.astro   # Homepage
│   └── styles/           # Global styles
│       └── global.css
├── .github/
│   └── workflows/        # GitHub Actions
│       └── deploy.yml
├── serverless.yml        # AWS infrastructure config
└── astro.config.mjs      # Astro configuration
```

## Scripts

- `npm start` - Start development server
- `npm run build` - Build production site (includes type checking)
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript and Astro checks

## Deployment Scripts

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Test locally with `npm start`
4. Create a PR to `develop`
5. After review and merge, changes deploy to dev.woburn.cc
6. When ready for production, merge `develop` to `main`

## License

Private - Woburn Cycling Club
