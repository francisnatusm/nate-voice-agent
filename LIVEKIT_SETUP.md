# LiveKit Cloud Setup Guide

This guide will help you get your LiveKit credentials for deploying your Nate Voice Agent.

## Step 1: Create LiveKit Cloud Account

1. Go to [LiveKit Cloud](https://cloud.livekit.io/)
2. Sign up for a free account (or sign in if you already have one)
3. Create a new project or use an existing one

## Step 2: Get Your Credentials

1. In your LiveKit Cloud dashboard, go to your project
2. Navigate to **Settings** → **Keys**
3. Copy the following values:
   - **API Key** (starts with `API...`)
   - **API Secret** (long random string)
   - **Server URL** (e.g., `https://your-project.livekit.cloud`)

## Step 3: Set Up Your Agent

You'll need a LiveKit agent to make your voice assistant work. Here are your options:

### Option A: Quick Start with LiveKit's Starter Agent

1. Go to [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-python)
2. Deploy the Python starter agent
3. Note the agent name (usually something like `agent-starter-python`)

### Option B: Deploy Your Own Agent

1. Clone the [Python starter agent](https://github.com/livekit-examples/agent-starter-python):
   ```bash
   git clone https://github.com/livekit-examples/agent-starter-python.git
   cd agent-starter-python
   ```

2. Set up environment variables:
   ```bash
   export LIVEKIT_API_KEY=your_api_key
   export LIVEKIT_API_SECRET=your_api_secret
   export LIVEKIT_URL=your_server_url
   ```

3. Deploy the agent:
   ```bash
   pip install -r requirements.txt
   python main.py
   ```

## Step 4: Configure Your React App

Update your `app-config.ts` file to include the agent name:

```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Nate',
  pageTitle: 'Nate Voice Agent',
  pageDescription: 'An advanced AI voice assistant',
  
  // ... your existing config ...
  
  agentName: 'your-agent-name', // Add this line with your agent name
};
```

## Step 5: Environment Variables for Deployment

When deploying to Vercel, you'll need to set these environment variables:

| Variable | Value | Example |
|----------|-------|---------|
| `LIVEKIT_API_KEY` | Your API Key | `APIxxxxxxxxxxxx` |
| `LIVEKIT_API_SECRET` | Your API Secret | `secretxxxxxxxxxxxx` |
| `LIVEKIT_URL` | Your Server URL | `https://project.livekit.cloud` |

## Testing Your Setup

1. Make sure your agent is running
2. Start your React app locally:
   ```bash
   pnpm dev
   ```
3. Open http://localhost:3000
4. Click "Talk to Nate" and test the voice functionality

## Troubleshooting

### Common Issues:

1. **"Agent not found"**: Make sure your agent is running and the agent name is correct
2. **"Connection failed"**: Check your LiveKit credentials and server URL
3. **"No audio"**: Ensure your browser has microphone permissions

### Getting Help:

- [LiveKit Documentation](https://docs.livekit.io/)
- [LiveKit Community Slack](https://livekit.io/join-slack)
- [LiveKit GitHub Discussions](https://github.com/livekit/livekit/discussions)

## Free Tier Limits

LiveKit Cloud free tier includes:
- 10,000 participant minutes per month
- 1 concurrent room
- Basic support

This should be more than enough for testing and small-scale usage!
