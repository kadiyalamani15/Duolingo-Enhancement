# Assets Folder

This folder contains placeholder assets for the Duolingo clone app.

## Required Assets

Replace these placeholder descriptions with actual images:

### App Icons
- **icon.png** (1024x1024) - Main app icon
- **adaptive-icon.png** (1024x1024) - Android adaptive icon
- **favicon.png** (48x48) - Web favicon

### Splash Screen
- **splash.png** (1242x2436) - App splash screen with Duolingo green background

### Character Assets
- **owl-mascot.png** - Duolingo owl character
- **owl-happy.png** - Happy owl expression
- **owl-sad.png** - Sad owl expression
- **owl-excited.png** - Excited owl expression

### Achievement Badges
- **badge-scholar.png** - Scholar achievement
- **badge-sharpshooter.png** - Sharpshooter achievement
- **badge-sage.png** - Sage achievement
- **badge-champion.png** - Champion achievement

### Flag Icons
- **flag-spanish.png** - Spanish flag
- **flag-french.png** - French flag
- **flag-german.png** - German flag
- **flag-italian.png** - Italian flag

## Current Implementation

The app currently uses emoji placeholders (👤, 🦉, 🔥, 💎, ❤️, etc.) instead of actual images.
This allows the app to run immediately without requiring assets.

## How to Add Real Images

1. Add your image files to this folder
2. Replace emoji in components with `<Image>` components:

```typescript
import { Image } from 'react-native';

// Replace this:
<Text style={styles.icon}>🦉</Text>

// With this:
<Image 
  source={require('../assets/owl-mascot.png')} 
  style={styles.icon}
/>
```

## Recommended Image Specifications

- **PNG format** with transparency
- **2x and 3x versions** for retina displays
- **Compressed** for optimal performance
- **Consistent style** matching Duolingo's design language

