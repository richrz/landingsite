# PassengerOS Landing Site

Modern landing page for PassengerOS built with:
- Next.js 14
- Tailwind CSS
- Framer Motion
- TypeScript

## Development
```bash
npm install
npm run dev
```

## Deployment
This site is automatically deployed via GitHub Pages.

### GitHub Pages Setup
1. The site uses GitHub Actions for automatic deployment
2. Static export is configured in `next.config.js`
3. Deployment workflow is in `.github/workflows/deploy.yml`
4. Site will be available at: https://richrz.github.io/landingsite/

### Manual Build
```bash
npm run build
```
This creates a static export in the `out/` directory.