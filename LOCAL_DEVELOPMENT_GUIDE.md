# Local Development Guide (No EAS Required)

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Start Development Server**
```bash
npm start
# or
npx expo start
```

### **3. Choose Your Platform**
- **iOS Simulator**: Press `i` (requires Xcode)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: Scan QR code with Expo Go app
- **Web**: Press `w`

## 📱 **Platform-Specific Development**

### **iOS Development (Free Options)**

#### **Option A: Expo Go (Recommended for now)**
- Install Expo Go from App Store
- Scan QR code from terminal
- **Limitations**: Some native features may not work
- **Benefits**: No Xcode needed, instant testing

#### **Option B: iOS Simulator (Full native features)**
```bash
# Requires Xcode (free from Mac App Store)
npx expo run:ios
```

### **Android Development (Free Options)**

#### **Option A: Expo Go (Recommended for now)**
- Install Expo Go from Google Play
- Scan QR code from terminal
- **Limitations**: Some native features may not work
- **Benefits**: No Android Studio needed, instant testing

#### **Option B: Android Emulator (Full native features)**
```bash
# Requires Android Studio (free)
npx expo run:android
```

## 🎨 **Testing Your Updated Configuration**

### **What to Test Locally:**

1. **App Icon**: Should show RushHour_logo_v2.png
2. **Splash Screen**: Should have orange background (#FF9E4E)
3. **Logo Consistency**: All logos should be the same across the app

### **Testing Commands:**
```bash
# Start with Expo Go (easiest)
npx expo start

# Test on iOS Simulator (if you have Xcode)
npx expo start --ios

# Test on Android Emulator (if you have Android Studio)
npx expo start --android

# Test on web
npx expo start --web
```

## 🔧 **Development Scripts Available**

```bash
npm start          # Start Expo development server
npm run android    # Run on Android (requires setup)
npm run ios        # Run on iOS (requires setup)
npm run web        # Run on web
npm test           # Run tests
```

## 📋 **Prerequisites for Full Native Development**

### **iOS (Optional - for full native features)**
- **Xcode** (free from Mac App Store)
- **iOS Simulator** (comes with Xcode)
- **CocoaPods** (usually auto-installed)

### **Android (Optional - for full native features)**
- **Android Studio** (free)
- **Android SDK** (comes with Android Studio)
- **Android Emulator** (comes with Android Studio)

## 🎯 **Current Status - What's Working**

✅ **App Icon**: Updated to RushHour_logo_v2.png  
✅ **Background Colors**: Orange (#FF9E4E) implemented  
✅ **Logo References**: All consistent across platforms  
✅ **Configuration Files**: Updated for both iOS and Android  
✅ **Local Development**: Ready to test  

## 🚨 **Important Notes**

1. **Expo Go Limitations**: Some native features (like custom splash screens) may not work in Expo Go
2. **Full Testing**: To see all your changes (especially splash screen), you'll need to use simulators/emulators
3. **No EAS Required**: All development can be done locally for free
4. **Future EAS**: When you get an Apple Developer account, you can easily switch to EAS builds

## 🔍 **Testing Checklist**

- [ ] App starts without errors
- [ ] App icon shows RushHour_logo_v2.png
- [ ] Background colors are orange (#FF9E4E)
- [ ] Logo appears consistently across screens
- [ ] No console errors related to assets

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **Metro bundler errors**: Try `npx expo start --clear`
2. **Asset not found**: Check file paths in `app.json`
3. **Simulator not starting**: Ensure Xcode/Android Studio is properly installed
4. **Expo Go issues**: Try reinstalling the app

### **Get Help:**
- Check Expo documentation: https://docs.expo.dev/
- Expo Discord: https://chat.expo.dev/
- GitHub Issues: Create an issue in your repo

## 🎉 **You're Ready to Develop!**

Your project is now configured for local development with:
- ✅ Updated logos and icons
- ✅ Correct background colors
- ✅ Local development scripts
- ✅ No EAS dependency required

Start developing with `npm start` and test on your preferred platform!

