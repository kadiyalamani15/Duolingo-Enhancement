# 🚀 Quick Start Guide

Get the Duolingo clone running in 3 simple steps!

## For Teammates (Absolute Beginners)

### Step 1: Install Node.js
Download and install from: https://nodejs.org/
(Choose the LTS version - recommended for most users)

### Step 2: Install Dependencies
Open Terminal (Mac) or Command Prompt (Windows):

```bash
cd duolingo-clone
npm install
```

Wait for installation to complete (2-5 minutes).

### Step 3: Run the App

```bash
npm start
```

A QR code will appear. Now choose how to view the app:

#### Option A: On Your Phone (Easiest)
1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code with your phone camera (iOS) or Expo Go app (Android)
3. App will load on your phone!

#### Option B: iOS Simulator (Mac only)
1. Press `i` in the terminal
2. iOS simulator will open with the app

#### Option C: Android Emulator
1. Press `a` in the terminal
2. Android emulator will open with the app

## That's It! 🎉

The app should now be running. You'll see:
- 5 tabs at the bottom: Learn, Practice, Leaderboard, Shop, Profile
- Duolingo's green color scheme throughout
- Interactive UI elements

## Common Issues

### "Command not found: npm"
→ Install Node.js first (Step 1)

### "Cannot find module"
→ Run `npm install` again

### QR code not scanning
→ Make sure phone and computer are on same WiFi

### Metro bundler error
→ Run: `npm start -- --reset-cache`

## Need Help?
1. Check DEPLOYMENT.md for detailed instructions
2. Check README.md for project documentation
3. Ask your team lead

## Making Changes

The app has **hot reload** enabled. Edit any file and save - changes appear instantly!

Try editing: `src/screens/LearnScreen.tsx`

## File Structure

```
duolingo-clone/
├── src/
│   ├── screens/       ← Main app screens
│   ├── components/    ← Reusable UI components
│   ├── navigation/    ← Tab navigation setup
│   └── constants/     ← Colors, fonts, spacing
├── App.tsx           ← App entry point
└── package.json      ← Dependencies
```

## Next Steps

1. ✅ Run the app
2. 📱 Test on your device
3. 🎨 Explore different screens
4. 💻 Make your first change
5. 🚀 Build new features

Happy coding! 🎉

