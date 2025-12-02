# Duolingo Clone - Mobile App

A high-fidelity Duolingo clone built with React Native and Expo, featuring the current Duolingo UI design, color scheme, and user experience.

## 🎨 Features

- **Authentic Duolingo Design**: Mimics the current Duolingo UI with accurate colors, typography, and layout
- **5 Main Screens**:
  - **Learn**: Main learning path with lessons and progress tracking
  - **Practice**: Various practice modes including stories, speaking, and listening
  - **Leaderboard**: Competitive rankings with league system
  - **Shop**: In-app store for power-ups and streak freezes
  - **Profile**: User profile with achievements and settings
- **Gamification Elements**:
  - Streak tracking (🔥)
  - XP system (⭐)
  - Gems currency (💎)
  - Hearts system (❤️)
  - Achievements and badges
- **Clean Architecture**: Well-organized code structure for easy feature integration
- **TypeScript**: Full type safety throughout the app
- **iOS Optimized**: Designed primarily for iOS but works on Android too

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- iOS Simulator (Xcode) or Android Studio
- Expo Go app (for physical device testing)

### Installation

1. Navigate to the project directory:
```bash
cd duolingo-clone
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Running on iOS Simulator

1. Make sure Xcode is installed on your Mac
2. Start the Expo dev server:
```bash
npm start
```
3. Press `i` in the terminal to open iOS simulator
   
OR

```bash
npm run ios
```

### Running on Physical Device

1. Install the Expo Go app from the App Store
2. Start the dev server: `npm start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

## 📱 App Structure

```
duolingo-clone/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   ├── LessonNode.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatItem.tsx
│   ├── screens/            # Main app screens
│   │   ├── LearnScreen.tsx
│   │   ├── PracticeScreen.tsx
│   │   ├── LeaderboardScreen.tsx
│   │   ├── ShopScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/         # Navigation configuration
│   │   └── TabNavigator.tsx
│   ├── constants/          # Colors, typography, spacing
│   │   ├── Colors.ts
│   │   └── Typography.ts
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── App.tsx                # App entry point
└── package.json
```

## 🎨 Color Scheme

The app uses Duolingo's official color palette:

- **Primary Green**: `#58CC02`
- **Secondary Blue**: `#1CB0F6`
- **Streak Orange**: `#FF9600`
- **XP Yellow**: `#FFC800`
- **Error Red**: `#FF4B4B`

## 🔧 Customization

### Adding New Screens

1. Create a new screen component in `src/screens/`
2. Import it in `src/navigation/TabNavigator.tsx`
3. Add it to the Tab Navigator

Example:
```typescript
import { NewScreen } from '../screens/NewScreen';

// In TabNavigator.tsx
<Tab.Screen name="NewTab" component={NewScreen} />
```

### Adding New Components

1. Create the component in `src/components/`
2. Export it and import where needed
3. Follow the existing patterns for styling and props

### Modifying Colors

Edit `src/constants/Colors.ts` to change the app's color scheme.

### Adjusting Typography

Edit `src/constants/Typography.ts` to change font sizes, weights, and spacing.

## 📝 Mock Data

Currently, the app uses mock data for demonstration. To integrate with a real backend:

1. Create an API service in `src/services/`
2. Replace mock data with API calls
3. Add state management (Redux, Context API, or Zustand)

## 🖼️ Images

The app currently uses emoji placeholders for:
- User avatars
- Lesson icons
- Achievement badges
- Category icons

To add real images:
1. Add images to `assets/` directory
2. Use `require()` or `import` to load images
3. Replace emoji with `<Image>` components

Example:
```typescript
<Image source={require('../assets/owl-mascot.png')} />
```

## 🧪 Testing on iOS

### Using Xcode Simulator

1. Open Xcode
2. Go to Xcode > Open Developer Tool > Simulator
3. Run `npm run ios` in the project directory
4. The app will automatically open in the simulator

### Debugging

- Shake the device (Cmd+D in simulator) to open the debug menu
- Enable Fast Refresh for instant updates
- Use React Native Debugger for advanced debugging

## 📦 Deployment

### Building for iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure and build
eas build:configure
eas build --platform ios
```

### Building for Android

```bash
eas build --platform android
```

## 🤝 Team Collaboration

To share with teammates:

### Option 1: Expo Go (Easiest)
1. Run `npm start`
2. Share the QR code or link with teammates
3. They can scan it with Expo Go app

### Option 2: Development Build
1. Create a development build: `eas build --profile development`
2. Share the build with teammates
3. They can install it directly on their devices

### Option 3: TestFlight (iOS)
1. Build for production: `eas build --platform ios`
2. Submit to TestFlight: `eas submit --platform ios`
3. Invite teammates via TestFlight

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### iOS simulator not opening
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

### Dependencies issues
```bash
rm -rf node_modules
npm install
```

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 🎯 Next Steps

- [ ] Add animation and micro-interactions
- [ ] Implement lesson functionality
- [ ] Add sound effects
- [ ] Connect to backend API
- [ ] Add authentication
- [ ] Implement push notifications
- [ ] Add language selection
- [ ] Create onboarding flow

## 📄 License

This is a demonstration project for educational purposes.

## 👨‍💻 Development

Built with ❤️ using React Native and Expo

