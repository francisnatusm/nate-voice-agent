# 🌍 Global Deployment Guide - Nate Voice Agent

Deploy your voice assistant to the cloud so you can access it from **any device, anywhere in the world** while preserving your custom HUD design.

## 🎯 What You'll Get

- ✅ **Global Access**: Use from phone, tablet, computer anywhere
- ✅ **Custom Design Preserved**: Your HUD background, colors, logo stay the same
- ✅ **Mobile Optimized**: Works perfectly on mobile devices
- ✅ **Voice Functionality**: Real-time voice interaction via LiveKit Cloud
- ✅ **Free Hosting**: Vercel free tier + LiveKit Cloud free tier

## 🚀 Step-by-Step Deployment

### Step 1: Set Up LiveKit Cloud (Backend)

1. **Go to [LiveKit Cloud](https://cloud.livekit.io/)**
2. **Sign up** for free account
3. **Create new project**: "Nate Voice Agent"
4. **Get credentials** from Settings → Keys:
   ```
   API Key: APIxxxxxxxxxxxx
   API Secret: secretxxxxxxxxxxxx  
   Server URL: https://your-project.livekit.cloud
   ```

### Step 2: Deploy Frontend to Vercel (Global Access)

#### A. Push to GitHub:
```bash
# If you haven't already
git add .
git commit -m "Ready for global deployment"
git push origin main
```

#### B. Deploy to Vercel:
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with GitHub
3. **Import Project** → Select your repository
4. **Set Environment Variables**:
   ```
   LIVEKIT_API_KEY = your_api_key
   LIVEKIT_API_SECRET = your_api_secret
   LIVEKIT_URL = https://your-project.livekit.cloud
   ```
5. **Deploy** → Get your global URL (e.g., `https://nate-voice-agent.vercel.app`)

### Step 3: Deploy LiveKit Agent (Voice Functionality)

#### Option A: Quick Start (Recommended)
1. **Go to [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-python)**
2. **Click "Deploy"** → This gives you a working agent instantly
3. **Note the agent name** (usually `agent-starter-python`)

#### Option B: Deploy to Railway
1. **Fork [Python Agent](https://github.com/livekit-examples/agent-starter-python)**
2. **Go to [railway.app](https://railway.app)**
3. **Deploy from GitHub** → Select your forked agent
4. **Set environment variables** (same as above)

### Step 4: Connect Agent to Your App

Update your `app-config.ts`:
```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  // ... your existing config
  agentName: 'agent-starter-python', // Add your agent name
};
```

### Step 5: Test Global Access

1. **Desktop**: Visit `https://your-app.vercel.app`
2. **Mobile**: Open the same URL on your phone
3. **Test Voice**: Click "Talk to Nate" and test voice functionality
4. **Test Design**: Verify your HUD background and custom styling work on mobile

## 📱 Mobile Optimization Features

Your app now includes:
- **Responsive Design**: Adapts to all screen sizes
- **Touch-Friendly**: Optimized for mobile interaction
- **PWA Ready**: Can be installed as app on phone
- **Fast Loading**: Optimized for mobile networks

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `LIVEKIT_API_KEY` | Your LiveKit API key | `APIxxxxxxxxxxxx` |
| `LIVEKIT_API_SECRET` | Your LiveKit API secret | `secretxxxxxxxxxxxx` |
| `LIVEKIT_URL` | Your LiveKit server URL | `https://project.livekit.cloud` |

## 🌐 Access Your App

Once deployed, your voice assistant will be accessible at:
- **URL**: `https://your-app-name.vercel.app`
- **From Any Device**: Phone, tablet, computer
- **From Anywhere**: As long as you have internet

## 🎨 Design Preservation

Your custom design elements are preserved:
- ✅ Custom HUD background with animated particles
- ✅ "Nate" branding and colors
- ✅ Custom logo (`/ark_reactor.png`)
- ✅ Accent colors (`#002cf2` / `#1fd5f9`)
- ✅ All background images and assets

## 🆓 Free Tier Limits

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Custom domains

**LiveKit Cloud Free Tier:**
- 10,000 participant minutes/month
- 1 concurrent room
- Perfect for personal use

## 🚨 Troubleshooting

### Common Issues:

1. **"Agent not found"**: Make sure your agent is deployed and running
2. **"Connection failed"**: Check your LiveKit credentials
3. **Mobile issues**: Clear browser cache and try again
4. **Voice not working**: Check microphone permissions on mobile

### Support:
- [LiveKit Documentation](https://docs.livekit.io/)
- [Vercel Documentation](https://vercel.com/docs)
- [LiveKit Community Slack](https://livekit.io/join-slack)

## 🎉 You're Done!

Your Nate Voice Agent is now:
- 🌍 **Globally accessible** from any device
- 🎨 **Design preserved** with your custom HUD
- 🎤 **Voice enabled** via LiveKit Cloud
- 📱 **Mobile optimized** for phones and tablets
- 🆓 **Free to host** on Vercel + LiveKit Cloud

**Share your URL with friends and family - they can now talk to Nate from anywhere!**
