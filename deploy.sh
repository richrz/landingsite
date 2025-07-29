#!/bin/bash

# VPS Deployment Script for PassengerOS Landing Site
# This script builds the Next.js app and deploys to Vultr VPS

echo "🚀 Starting deployment to Vultr VPS..."

# Build the Next.js app
echo "📦 Building Next.js app..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# The static files are now in the 'out' directory
echo "📁 Static files ready in 'out' directory"
echo ""
echo "📋 Next steps:"
echo "1. Upload the 'out' directory contents to your VPS"
echo "2. Configure Nginx to serve from the upload directory"
echo "3. Point your domain to your VPS IP"
echo ""
echo "💡 You can use rsync, scp, or SFTP to upload files:"
echo "   rsync -avz out/ user@your-vps-ip:/var/www/html/"
echo ""
echo "🔧 Nginx config example:"
echo "   server {"
echo "       listen 80;"
echo "       server_name yourdomain.com;"
echo "       root /var/www/html;"
echo "       index index.html;"
echo "       location / {"
echo "           try_files \$uri \$uri/ /index.html;"
echo "       }"
echo "   }"