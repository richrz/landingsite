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

### VPS Deployment (Vultr)

This site is configured for deployment to a Vultr VPS with Nginx.

#### Prerequisites
- Vultr VPS with Ubuntu/Debian
- Nginx installed
- Domain pointing to your VPS IP

#### Deployment Steps

1. **Build the site locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload files to your VPS:**
   ```bash
   # Replace with your VPS details
   rsync -avz out/ user@your-vps-ip:/var/www/html/
   ```

3. **Configure Nginx:**
   - Copy `nginx.conf` to `/etc/nginx/sites-available/yourdomain.com`
   - Update the server_name in the config
   - Enable the site: `sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/`
   - Test config: `sudo nginx -t`
   - Reload Nginx: `sudo systemctl reload nginx`

4. **SSL Certificate (Optional):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

#### Files Included
- `deploy.sh` - Deployment script with instructions
- `nginx.conf` - Nginx configuration template
- `next.config.js` - Configured for static export

### Local Build
```bash
npm run build
npm run start
```