# Firebase Setup Guide for RushHour App

This guide covers the complete setup of Firebase Google Sign-In and Firebase Messaging for both Android and iOS platforms, replacing Expo implementations.

## ✅ What's Already Configured

### 1. Package Dependencies
- `@react-native-firebase/app` - Firebase core
- `@react-native-firebase/auth` - Firebase authentication
- `@react-native-firebase/messaging` - Firebase Cloud Messaging
- `@react-native-google-signin/google-signin` - Google Sign-In SDK

### 2. Firebase Configuration
- Firebase config updated in `src/firebase/config.js`
- Google Services files properly referenced:
  - Android: `android/app/google-services.json`
  - iOS: `ios/RushHour/GoogleService-Info.plist`

### 3. Platform Configurations
- **Android**: Google Services plugin, permissions, and manifest updated
- **iOS**: URL schemes, background modes, and entitlements configured

## 🔧 Additional Setup Required

### For Android Development

1. **Ensure Google Services Plugin is Applied**
   - ✅ Already configured in `android/build.gradle`
   - ✅ Already applied in `android/app/build.gradle`

2. **Verify google-services.json**
   - Ensure `android/app/google-services.json` contains your Firebase project configuration
   - The file should include your `package_name` as `com.rushhour`

3. **Build Configuration**
   ```bash
   # Clean and rebuild
   cd android
   ./gradlew clean
   cd ..
   
   # Run on Android
   npm run android
   ```

### For iOS Development

1. **Install Pods**
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Verify GoogleService-Info.plist**
   - Ensure `ios/RushHour/GoogleService-Info.plist` contains your Firebase project configuration
   - The file should include your `BUNDLE_ID` as `com.rushhour`

3. **Build Configuration**
   ```bash
   # Run on iOS
   npm run ios
   ```

## 🧪 Testing Firebase Integration

### 1. Firebase Test Component
A test component has been added to the Settings screen (`src/components/FirebaseTest.js`) that allows you to:
- Test Google Sign-In
- Test Google Sign-Out
- Verify FCM token generation
- Check authentication state

### 2. Access the Test Component
1. Navigate to Settings screen in your app
2. Scroll down to find the "Firebase Test" section
3. Use the test buttons to verify functionality

## 🔐 Google Sign-In Configuration

### 1. OAuth 2.0 Client IDs
The app is configured with these client IDs:
- **Web Client ID**: `864165576083-harqo14kmlvj6lrhmmrjomemo2v6ervu.apps.googleusercontent.com`
- **iOS Client ID**: `864165576083-ql4f8beguutmtrel407bbqog25otpu21.apps.googleusercontent.com`

### 2. URL Schemes
- **Android**: `com.rushhour` (package name)
- **iOS**: `com.googleusercontent.apps.864165576083-ql4f8beguutmtrel407bbqog25otpu21`

## 📱 Firebase Messaging Configuration

### 1. Notification Permissions
- **Android**: Added `WAKE_LOCK`, `VIBRATE`, `RECEIVE_BOOT_COMPLETED` permissions
- **iOS**: Configured `remote-notification` and `background-processing` background modes

### 2. Custom Notification Sounds
- **Car Horn**: `car_horn.wav` for info notifications
- **Double Car Horn**: `double_car_horn.wav` for urgent notifications

### 3. Notification Icon
- **Android**: Uses `@drawable/notification_icon_white` as default notification icon

## 🚀 Running the App

### Development Mode
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Production Build
```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🔍 Troubleshooting

### Common Issues

1. **Google Sign-In Not Working**
   - Verify `google-services.json` and `GoogleService-Info.plist` are up to date
   - Check that client IDs match your Firebase project
   - Ensure SHA-1 fingerprint is added to Firebase console for Android

2. **Push Notifications Not Working**
   - Verify FCM token is generated (check Firebase Test component)
   - Check notification permissions are granted
   - Ensure background modes are properly configured

3. **Build Errors**
   - Clean and rebuild: `cd android && ./gradlew clean` (Android) or `cd ios && pod install` (iOS)
   - Check that all dependencies are properly installed
   - Verify Firebase configuration files are in correct locations

### Debug Steps

1. **Check Console Logs**
   - Look for Firebase initialization messages
   - Check for authentication state changes
   - Monitor FCM token generation

2. **Verify Firebase Console**
   - Check that your app is registered
   - Verify authentication methods are enabled
   - Test push notifications from console

3. **Test on Both Platforms**
   - Ensure functionality works on both Android and iOS
   - Check platform-specific configurations

## 📚 Additional Resources

- [React Native Firebase Documentation](https://rnfirebase.io/)
- [Google Sign-In for React Native](https://github.com/react-native-google-signin/google-signin)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

## 🎯 Next Steps

1. **Test the Integration**
   - Use the Firebase Test component to verify functionality
   - Test on both Android and iOS devices

2. **Customize Notifications**
   - Modify notification sounds and icons as needed
   - Implement custom notification handling logic

3. **Production Deployment**
   - Update Firebase configuration for production
   - Test on production builds
   - Monitor Firebase Analytics and Crashlytics

---

**Note**: This setup replaces Expo notifications and Expo Google Sign-In with Firebase implementations. The app will now work properly on both platforms without Expo Go limitations.
