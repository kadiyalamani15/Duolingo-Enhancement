# Deployment Guide

This guide will help you and your teammates run and deploy the Duolingo clone app with minimal failures.

## 🚀 For Teammates - Quick Setup

### Prerequisites
1. Install Node.js (v16 or newer): https://nodejs.org/
2. Install Expo Go app on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

### Running the App (Easiest Method)

1. Open Terminal/Command Prompt
2. Navigate to the project folder:
   ```bash
   cd path/to/duolingo-clone
   ```

3. Install dependencies (first time only):
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Scan the QR code:
   - **iOS**: Use your Camera app to scan the QR code
   - **Android**: Open Expo Go app and scan the QR code

That's it! The app should now be running on your phone.

## 🍎 Running on iOS Simulator (Mac Only)

### Prerequisites
- macOS computer
- Xcode installed (from Mac App Store)

### Steps

1. Open Terminal in the project folder
2. Start the server:
   ```bash
   npm start
   ```
3. Press `i` to open iOS simulator

OR simply run:
```bash
npm run ios
```

The iOS simulator will open and load the app automatically.

## 🤖 Running on Android Emulator

### Prerequisites
- Android Studio installed
- Android emulator set up

### Steps

1. Start your Android emulator first
2. In Terminal, run:
   ```bash
   npm run android
   ```

## 🌐 Sharing with Remote Teammates

### Method 1: Tunnel (Works Anywhere)

1. Start the server with tunnel:
   ```bash
   npx expo start --tunnel
   ```

2. Share the QR code or URL with teammates
3. They can access it from anywhere with Expo Go app

### Method 2: Local Network (Same WiFi)

1. Ensure all teammates are on the same WiFi network
2. Start the server:
   ```bash
   npm start
   ```
3. Share the QR code shown in terminal

## 📱 Building Standalone Apps

### For Development Testing

1. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure the project:
   ```bash
   eas build:configure
   ```

4. Build for iOS development:
   ```bash
   eas build --profile development --platform ios
   ```

5. Download and install the .ipa file on your device

### For TestFlight Distribution (iOS)

1. Build for production:
   ```bash
   eas build --platform ios
   ```

2. Submit to App Store Connect:
   ```bash
   eas submit --platform ios
   ```

3. Add teammates as TestFlight testers in App Store Connect

## 🐛 Common Issues and Solutions

### Issue: "Metro bundler failed to start"

**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: "Cannot find module"

**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: "Expo Go is not compatible"

**Solution:** Update Expo Go app to the latest version from App Store/Play Store

### Issue: "Network request failed"

**Solution:**
- Ensure phone and computer are on the same WiFi
- Try using tunnel mode: `npx expo start --tunnel`
- Check firewall settings

### Issue: "Xcode not found"

**Solution:**
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

### Issue: Port already in use

**Solution:**
```bash
# Kill process on port 19000
lsof -ti:19000 | xargs kill -9

# Or use a different port
npx expo start --port 19001
```

## 📋 Pre-Deployment Checklist

Before sharing with teammates:

- [ ] Test on both iOS and Android
- [ ] Verify all screens are working
- [ ] Check that navigation works correctly
- [ ] Ensure no console errors
- [ ] Update app.json with correct bundle identifiers
- [ ] Test on different screen sizes
- [ ] Verify placeholder assets are visible

## 🔧 Configuration

### Update App Information

Edit `app.json`:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

## 📊 Monitoring

### View Logs

While the app is running:
- Shake device to open dev menu
- Tap "Debug JS Remotely" for Chrome DevTools
- Or use: `npx react-devtools`

### Performance Monitoring

Enable in dev menu:
- Show Perf Monitor
- Show Inspector

## 🎯 Best Practices for Team Development

1. **Use Git**: Commit frequently with clear messages
2. **Branch Strategy**: Create feature branches
3. **Code Review**: Review pull requests before merging
4. **Documentation**: Document new features in code comments
5. **Testing**: Test on both platforms before committing
6. **Dependencies**: Use exact versions in package.json

## 🆘 Getting Help

If you encounter issues:

1. Check Expo documentation: https://docs.expo.dev/
2. Check React Native docs: https://reactnative.dev/
3. Check this project's README.md
4. Search Expo forums: https://forums.expo.dev/

## 📞 Emergency Commands

```bash
# Complete reset
rm -rf node_modules
npm install
npm start -- --reset-cache

# Kill all Metro bundler processes
killall -9 node

# Clear Expo cache
npx expo start -c
```

## ✅ Success Indicators

You know it's working when:
- ✅ QR code appears in terminal
- ✅ No red error messages
- ✅ Metro bundler shows "100% - Done"
- ✅ App loads on your device/simulator
- ✅ Navigation between tabs works
- ✅ All screens display correctly

## 🎉 Next Steps

Once basic deployment works:
1. Add more features
2. Integrate with backend API
3. Add animations
4. Implement actual lesson content
5. Add authentication
6. Set up CI/CD pipeline

