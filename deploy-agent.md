# Deploy LiveKit Agent to Cloud

Your voice assistant needs a LiveKit agent running in the cloud to handle voice interactions.

## Option 1: Use LiveKit's Managed Agent (Easiest)

1. Go to [LiveKit Cloud](https://cloud.livekit.io/)
2. In your project, go to **"Agents"** section
3. Click **"Deploy Agent"**
4. Choose **"Python Starter Agent"** or **"Node.js Starter Agent"**
5. Deploy it - this gives you a basic voice agent

## Option 2: Deploy Custom Agent to Railway/Render

### Using Railway (Recommended):

1. **Fork the Python starter agent**:

   ```bash
   git clone https://github.com/livekit-examples/agent-starter-python.git
   cd agent-starter-python
   ```

2. **Deploy to Railway**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account
   - Deploy the agent repository
   - Set environment variables:
     ```
     LIVEKIT_API_KEY=your_api_key
     LIVEKIT_API_SECRET=your_api_secret
     LIVEKIT_URL=your_server_url
     ```

### Using Render:

1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub account
4. Deploy the agent repository
5. Set environment variables

## Option 3: Use LiveKit's Sandbox (Quick Test)

1. Go to [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-python)
2. Click **"Deploy"**
3. This gives you a working agent instantly

## Update Your App Config

Once your agent is deployed, update `app-config.ts`:

```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  // ... your existing config
  agentName: 'your-agent-name', // Add this line
};
```

## Test Your Setup

1. Your frontend will be at: `https://your-app.vercel.app`
2. Your agent will be running in the cloud
3. Test voice functionality on mobile/desktop
