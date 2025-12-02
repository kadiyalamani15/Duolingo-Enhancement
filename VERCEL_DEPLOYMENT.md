# 🚀 Deploy to Vercel via GitHub

Complete guide to deploy your Duolingo clone as a web app using GitHub and Vercel.

---

## ✨ What You'll Get

- 🌐 Live website URL (e.g., `duolingo-clone.vercel.app`)
- 🔄 Automatic deployments on every push to GitHub
- 🚀 Free hosting with Vercel
- 📱 Works on any device with a browser
- ⚡ Fast global CDN

---

## 📋 Prerequisites

- GitHub account (free)
- Vercel account (free, sign up with GitHub)
- Git installed on your computer

---

## 🎯 Step-by-Step Guide

### Step 1: Initialize Git Repository

```bash
# Navigate to project
cd "/Users/starshadow/Desktop/duolingo assignment/duolingo-clone"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Duolingo clone"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `duolingo-clone`
3. Description: `Mobile Duolingo clone built with React Native & Expo`
4. Keep it **Public** or **Private** (your choice)
5. Don't initialize with README (we already have one)
6. Click **"Create repository"**

### Step 3: Push to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/duolingo-clone.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

#### Option A: Via Vercel Website (Recommended)

1. Go to https://vercel.com/
2. Click **"Sign Up"** and sign in with GitHub
3. Click **"Add New Project"**
4. Click **"Import"** next to your `duolingo-clone` repository
5. Configure project:
   - **Framework Preset:** Other
   - **Build Command:** `expo export:web`
   - **Output Directory:** `web-build`
   - **Install Command:** `npm install`
6. Click **"Deploy"**

Wait 2-3 minutes and you're live! 🎉

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? duolingo-clone
# - Directory? ./
# - Override settings? Yes
# - Build command? expo export:web
# - Output directory? web-build
```

### Step 5: Get Your Live URL

After deployment completes, you'll get a URL like:
```
https://duolingo-clone.vercel.app
```

Share this URL with your teammates - they just click and use it!

---

## 🔄 Automatic Deployments

Every time you push to GitHub, Vercel automatically:
1. Detects the change
2. Builds your app
3. Deploys the new version
4. Updates the live URL

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys!
```

---

## ⚙️ Vercel Configuration

The project includes `vercel.json` with optimal settings:

```json
{
  "buildCommand": "expo export:web",
  "outputDirectory": "web-build",
  "devCommand": "expo start --web",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ Correct build process
- ✅ SPA routing works
- ✅ Fast deployments
- ✅ Clean URLs

---

## 🎨 Custom Domain (Optional)

Want a custom domain like `duolingo.yourcompany.com`?

1. Go to your Vercel project dashboard
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS setup instructions

---

## 🐛 Troubleshooting

### Build fails on Vercel

**Check Node version:**
```json
// Add to package.json
"engines": {
  "node": ">=18.0.0"
}
```

### Routing doesn't work

Make sure `vercel.json` has the rewrite rule for SPA routing.

### Images not loading

Ensure all assets are in `assets/` folder and properly imported.

---

## 📊 Deployment Status

You can check deployment status:
- Vercel Dashboard: https://vercel.com/dashboard
- Build logs: Click on deployment → "Logs"
- Preview deployments: Every PR gets a preview URL

---

## 🎯 Quick Commands

```bash
# Build locally to test
npm run build:web

# Test web build locally
npx serve web-build

# Push to GitHub (triggers Vercel deploy)
git add .
git commit -m "Your changes"
git push
```

---

## 📱 Share With Teammates

Once deployed, send this message:

```
Hey team! 

The Duolingo clone is now live:
🌐 https://your-project.vercel.app

Just click the link and use it in your browser!
Works on desktop, mobile, tablet - any device.

No installation needed! 🎉
```

---

## ✨ Benefits of Vercel + GitHub

✅ **Automatic deployments** - Push code, auto-deploy  
✅ **Free hosting** - Generous free tier  
✅ **Fast CDN** - Global content delivery  
✅ **HTTPS included** - Secure by default  
✅ **Preview deployments** - Test before merging  
✅ **Easy rollbacks** - Revert to any version  
✅ **Analytics** - Track usage (optional)  

---

## 🎉 You're All Set!

Your Duolingo clone is now:
- ✅ On GitHub (version controlled)
- ✅ Deployed on Vercel (live website)
- ✅ Auto-deploying (on every push)
- ✅ Accessible to anyone (via URL)

**No need to run it locally anymore!** 🚀

