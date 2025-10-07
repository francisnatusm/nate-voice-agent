# Deployment Guide for Nate Voice Agent

This guide will help you deploy your LiveKit Agent Starter React project to the cloud while preserving all your custom design, background images, and configurations.

## Prerequisites

1. **LiveKit Cloud Account**: You'll need a LiveKit Cloud project
2. **GitHub Account**: For version control and deployment
3. **Vercel Account**: For hosting (free tier available)

## Step 1: Set up LiveKit Cloud

1. Go to [LiveKit Cloud](https://cloud.livekit.io/)
2. Create a new project or use an existing one
3. Note down your:
   - API Key
   - API Secret
   - Server URL (e.g., `https://your-project.livekit.cloud`)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Environment Variables**:
   In Vercel dashboard, go to your project → Settings → Environment Variables:

   ```
   LIVEKIT_API_KEY = your_api_key_here
   LIVEKIT_API_SECRET = your_api_secret_here
   LIVEKIT_URL = https://your-project.livekit.cloud
   ```

4. **Deploy**: Click "Deploy" and wait for completion

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:

   ```bash
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add LIVEKIT_API_KEY
   vercel env add LIVEKIT_API_SECRET
   vercel env add LIVEKIT_URL
   ```

## Step 3: Set up Your Agent

Your deployed app will need a LiveKit agent to function. You have several options:

### Option A: Use LiveKit's Starter Agent

- Deploy the [Python starter agent](https://github.com/livekit-examples/agent-starter-python)
- Or the [Node.js starter agent](https://github.com/livekit-examples/agent-starter-node)

### Option B: Create Custom Agent

- Follow the [LiveKit Agents documentation](https://docs.livekit.io/agents/start/voice-ai/)

## Step 4: Configure Your Agent

Update your `app-config.ts` to point to your agent:

```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  // ... your existing config
  agentName: 'your-agent-name', // Add this line
};
```

## Step 5: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Test the voice functionality
3. Verify all your custom styling and backgrounds are preserved

## Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Environment Variables Reference

| Variable             | Description             | Example                         |
| -------------------- | ----------------------- | ------------------------------- |
| `LIVEKIT_API_KEY`    | Your LiveKit API key    | `APIxxxxxxxxxxxx`               |
| `LIVEKIT_API_SECRET` | Your LiveKit API secret | `secretxxxxxxxxxxxx`            |
| `LIVEKIT_URL`        | Your LiveKit server URL | `https://project.livekit.cloud` |

## Troubleshooting

### Common Issues:

1. **"LIVEKIT_URL is not defined"**: Check environment variables are set correctly
2. **Agent not responding**: Ensure your agent is deployed and running
3. **Styling issues**: Verify all assets in `/public` folder are included

### Support:

- [LiveKit Documentation](https://docs.livekit.io/)
- [Vercel Documentation](https://vercel.com/docs)
- [LiveKit Community Slack](https://livekit.io/join-slack)

## Your Custom Configuration

Your current configuration includes:

- Company Name: "Nate"
- Page Title: "Nate Voice Agent"
- Custom logo: `/ark_reactor.png`
- Custom accent colors: `#002cf2` (light) / `#1fd5f9` (dark)
- Custom HUD background with animated particles
- All these will be preserved in the deployment!
