@echo off
echo 🚀 Starting deployment process for Nate Voice Agent...

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Not in a git repository. Please initialize git first:
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit"
    pause
    exit /b 1
)

REM Check if vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

REM Check if environment variables are set
if "%LIVEKIT_API_KEY%"=="" (
    echo ⚠️  LIVEKIT_API_KEY not set. Please set it first:
    echo    set LIVEKIT_API_KEY=your_api_key
    echo    Or run: vercel env add LIVEKIT_API_KEY
    pause
    exit /b 1
)

if "%LIVEKIT_API_SECRET%"=="" (
    echo ⚠️  LIVEKIT_API_SECRET not set. Please set it first:
    echo    set LIVEKIT_API_SECRET=your_api_secret
    echo    Or run: vercel env add LIVEKIT_API_SECRET
    pause
    exit /b 1
)

if "%LIVEKIT_URL%"=="" (
    echo ⚠️  LIVEKIT_URL not set. Please set it first:
    echo    set LIVEKIT_URL=your_livekit_url
    echo    Or run: vercel env add LIVEKIT_URL
    pause
    exit /b 1
)

REM Build the project
echo 🔨 Building project...
pnpm build

if errorlevel 1 (
    echo ❌ Build failed. Please fix errors and try again.
    pause
    exit /b 1
)

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo 🌐 Your app should now be live at the URL provided above.
echo.
echo 📋 Next steps:
echo 1. Test your deployed application
echo 2. Set up your LiveKit agent if not already done
echo 3. Configure custom domain if desired
echo.
echo 📖 For more details, see DEPLOYMENT.md
pause
