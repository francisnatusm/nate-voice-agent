#!/bin/bash

# Deployment script for Nate Voice Agent
echo "🚀 Starting deployment process for Nate Voice Agent..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if environment variables are set
if [ -z "$LIVEKIT_API_KEY" ] || [ -z "$LIVEKIT_API_SECRET" ] || [ -z "$LIVEKIT_URL" ]; then
    echo "⚠️  Environment variables not set. Please set them first:"
    echo "   export LIVEKIT_API_KEY=your_api_key"
    echo "   export LIVEKIT_API_SECRET=your_api_secret"
    echo "   export LIVEKIT_URL=your_livekit_url"
    echo ""
    echo "Or run: vercel env add LIVEKIT_API_KEY (and repeat for others)"
    exit 1
fi

# Build the project
echo "🔨 Building project..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should now be live at the URL provided above."
echo ""
echo "📋 Next steps:"
echo "1. Test your deployed application"
echo "2. Set up your LiveKit agent if not already done"
echo "3. Configure custom domain if desired"
echo ""
echo "📖 For more details, see DEPLOYMENT.md"
