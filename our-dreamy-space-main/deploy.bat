@echo off
echo 🌌 Our Space - Deployment Helper
echo ================================
echo.

echo 📋 Choose deployment option:
echo 1. Deploy to Vercel (Recommended)
echo 2. Deploy to GitHub Pages
echo 3. Test locally
echo 4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto github
if "%choice%"=="3" goto local
if "%choice%"=="4" goto exit
goto invalid

:vercel
echo.
echo 🚀 Deploying to Vercel...
echo.
echo Steps:
echo 1. Go to https://vercel.com
echo 2. Sign up/Login with GitHub
echo 3. Click "New Project"
echo 4. Import your GitHub repository
echo 5. Click "Deploy"
echo.
echo Your site will be live in minutes!
echo.
pause
goto menu

:github
echo.
echo 🌐 Deploying to GitHub Pages...
echo.
echo Steps:
echo 1. Push your code to GitHub
echo 2. Go to repository Settings > Pages
echo 3. Source: Select "GitHub Actions"
echo 4. Push any change to trigger deployment
echo.
echo Your site will be available at: https://yourusername.github.io/our-dreamy-space
echo.
pause
goto menu

:local
echo.
echo 🏠 Starting local server...
echo.
echo Opening http://localhost:8000 in your browser...
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
goto menu

:invalid
echo.
echo ❌ Invalid choice. Please enter 1, 2, 3, or 4.
echo.
pause
goto menu

:menu
cls
goto start

:exit
echo.
echo 👋 Goodbye! Happy deploying!
echo.
pause
exit 