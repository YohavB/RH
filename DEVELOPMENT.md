# 🚗 RushHour Development Guide

## 🚀 Quick Start

### **Prerequisites**
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Your local backend server** running on `http://192.168.0.182:8008`

## 🎯 One-Command Setup

### **macOS/Linux:**
```bash
npm run dev:setup
```

### **Windows:**
```bash
npm run dev:setup:win
```

## 🔧 Manual Setup

### **1. Set Environment Variables**
```bash
export NODE_ENV=development
export API_BASE_URL=http://192.168.0.182:8008
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Test Local Server**
```bash
npm run test:server
```

### **4. Start Development Server**
```bash
npm run start:local
```

## 📱 Platform-Specific Development

### **Web Development**
```bash
npm run web:local
```
- Opens at `http://localhost:19006`
- Best for UI development and testing

### **iOS Development**

#### **Option A: Expo Go (Recommended for now)**
- Install Expo Go from App Store
- Scan QR code from terminal
- **Limitations**: Some native features may not work
- **Benefits**: No Xcode needed, instant testing

#### **Option B: iOS Simulator (Full native features)**
```bash
npm run ios:local
```
- Requires Xcode (free from Mac App Store)
- Full native features and splash screen support

### **Android Development**

#### **Option A: Expo Go (Recommended for now)**
- Install Expo Go from Google Play
- Scan QR code from terminal
- **Limitations**: Some native features may not work
- **Benefits**: No Android Studio needed, instant testing

#### **Option B: Android Emulator (Full native features)**
```bash
npm run android:local
```
- Requires Android Studio (free)
- Full native features and notification support

### **Physical Device**
1. Install the Expo Go app on your device
2. Run `npm run start:local`
3. Scan the QR code with Expo Go

## 🔧 Available Scripts

### **Development Scripts**

| Script | Description | Environment | API URL |
|--------|-------------|-------------|---------|
| `npm run start:local` | Start with local server | `development` | `http://192.168.0.182:8008` |
| `npm run start:mock` | Start with mock API | `development` | Mock data |
| `npm run start:prod` | Start with production API | `production` | Production URL |

### **Platform-Specific Scripts**

| Script | Description |
|--------|-------------|
| `npm run android:local` | Run on Android with local server |
| `npm run ios:local` | Run on iOS with local server |
| `npm run web:local` | Run on web with local server |

## 🌐 Running on Different Platforms

### **Quick Commands**
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

## 🔍 Verifying Your Setup

### **1. Check Environment Configuration**

When you start the app, you should see logs like this:
```
🚀 API Configuration:
   Base URL: http://192.168.0.182:8008
   Environment: development
   Development Mode: true
```

### **2. Test Local Server Connection**

The setup scripts will automatically check if your local server is running. You should see:
```
✅ Local server is running at http://192.168.0.182:8008
```

### **3. Test API Health Check**

You can manually test the connection by running:
```bash
curl http://192.168.0.182:8008/api/v1/health
```

Expected response:
```json
{
  "status": "UP",
  "timestamp": "2024-07-27T20:01:16.620",
  "service": "RushHour Backend",
  "version": "1.0.0"
}
```

## 🎨 Testing Your Updated Configuration

### **What to Test Locally:**

1. **App Icon**: Should show RushHour_logo_v2.png
2. **Splash Screen**: Should have orange background (#FF9E4E)
3. **Logo Consistency**: All logos should be the same across the app
4. **Notification Icons**: Custom car icons instead of white circles

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

## 🔧 Configuration Files

### **Environment Configuration (`src/config/env.js`)**

The app uses this configuration file to determine the API URL:

```javascript
export const ENV = {
  ENVIRONMENT: process.env.NODE_ENV || 'DEVELOPMENT',
  API_URL: process.env.API_BASE_URL || 'http://192.168.0.182:8008',
  LOCAL_SERVER_URL: 'http://192.168.0.182:8008',
  LOCAL_SERVER_PORT: 8008,
};
```

### **API Configuration (`src/BE_Api/ApiCalls.ts`)**

The API calls automatically use the configured base URL:

```javascript
const BASE_URL = getApiUrl(); // Returns http://192.168.0.182:8008 in development
```

## 🔄 Switching Between Modes

### **Local Server Mode**
```bash
npm run start:local
```
- Uses real API calls to `http://192.168.0.182:8008`
- Requires your backend server to be running
- Best for testing with real backend

### **Mock API Mode**
```bash
npm run start:mock
```
- Uses mock data for all API calls
- No backend server required
- Best for UI development and testing

### **Production Mode**
```bash
npm run start:prod
```
- Uses production API endpoints
- Requires production backend to be accessible
- Best for production testing

## 🐛 Troubleshooting

### **Common Issues**

#### 1. Local Server Not Running
**Problem:** You see "Local server is not running" warning
**Solution:** 
- Make sure your backend server is running on port 8008
- Check if the server is accessible at `http://192.168.0.182:8008/api/v1/health`

#### 2. Network Error in App
**Problem:** API calls fail with network errors
**Solution:**
- Verify your local server is running
- Check if the port 8008 is not blocked by firewall
- Try accessing `http://192.168.0.182:8008` in your browser

#### 3. CORS Issues (Web Development)
**Problem:** CORS errors when running on web
**Solution:**
- Make sure your backend server allows CORS from `http://localhost:19006`
- Add appropriate CORS headers to your backend

#### 4. Environment Variables Not Set
**Problem:** App still uses mock API instead of local server
**Solution:**
- Make sure you're using the `:local` scripts
- Check that `NODE_ENV=development` and `API_BASE_URL=http://192.168.0.182:8008` are set

#### 5. Metro Bundler Errors
**Problem:** Metro bundler errors
**Solution:** Try `npx expo start --clear`

#### 6. Asset Not Found
**Problem:** Asset not found errors
**Solution:** Check file paths in `app.json`

#### 7. Simulator Not Starting
**Problem:** Simulator not starting
**Solution:** Ensure Xcode/Android Studio is properly installed

#### 8. Expo Go Issues
**Problem:** Expo Go issues
**Solution:** Try reinstalling the app

### **Debug Commands**

#### Check Current Configuration
```bash
# Check environment variables
echo $NODE_ENV
echo $API_BASE_URL

# Check if local server is responding
curl -v http://192.168.0.182:8008/api/v1/health
```

#### Reset and Restart
```bash
# Clear Expo cache
expo r -c

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart with local server
npm run start:local
```

## 📱 Testing the App

### **1. Health Check**
The app will automatically test the connection when it starts. Check the console logs for:
```
✅ Health check successful
```

### **2. Authentication**
Test OAuth login (the app will use mock data for OAuth tokens):
```javascript
// In your app, try logging in
const auth = await googleLogin('mock_token');
console.log('Login successful:', auth.user);
```

### **3. API Calls**
Test various API endpoints:
```javascript
// Test user creation
const user = await createUser({
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  pushNotificationToken: 'test_token'
});

// Test car operations
const car = await findOrCreateCar('TEST123', Countries.IL, user.id);

// Test car blocking
const relations = await createCarBlockingRelationship(car.id, 2);
```

## 📊 Development Workflow

### **Recommended Workflow**

1. **Start with Mock API** for UI development:
   ```bash
   npm run start:mock
   ```

2. **Switch to Local Server** for backend integration:
   ```bash
   npm run start:local
   ```

3. **Test on Different Platforms**:
   ```bash
   npm run web:local    # Web testing
   npm run ios:local    # iOS testing
   npm run android:local # Android testing
   ```

### **Development Tips**

- Use the **Expo DevTools** for debugging
- Check the **Metro bundler console** for build errors
- Use **React Native Debugger** for advanced debugging
- Monitor **network requests** in browser dev tools (web) or Flipper (mobile)

## 🚨 Important Notes

### **Security**
- The local development setup uses HTTP (not HTTPS)
- Never use local development configuration in production
- OAuth tokens are mocked in development mode

### **Performance**
- Local development may be slower due to network requests
- Use mock mode for UI development to avoid network delays
- Consider using React Native Debugger for better performance

### **Backend Requirements**
Your local backend server should:
- Run on `http://192.168.0.182:8008`
- Implement all endpoints from the API documentation
- Support CORS for web development
- Have proper error handling

### **Expo Go Limitations**
- Some native features (like custom splash screens) may not work in Expo Go
- To see all your changes (especially splash screen), you'll need to use simulators/emulators
- All development can be done locally for free
- When you get an Apple Developer account, you can easily switch to EAS builds

## 🔍 Development Scripts Available

```bash
npm start          # Start Expo development server
npm run android    # Run on Android (requires setup)
npm run ios        # Run on iOS (requires setup)
npm run web        # Run on web
npm test           # Run tests
```

## 📋 Prerequisites for Full Native Development

### **iOS (Optional - for full native features)**
- **Xcode** (free from Mac App Store)
- **iOS Simulator** (comes with Xcode)
- **CocoaPods** (usually auto-installed)

### **Android (Optional - for full native features)**
- **Android Studio** (free)
- **Android SDK** (comes with Android Studio)
- **Android Emulator** (comes with Android Studio)

## 🎯 Current Status - What's Working

✅ **App Icon**: Updated to RushHour_logo_v2.png  
✅ **Background Colors**: Orange (#FF9E4E) implemented  
✅ **Logo References**: All consistent across platforms  
✅ **Configuration Files**: Updated for both iOS and Android  
✅ **Local Development**: Ready to test  
✅ **Notification Icons**: Custom car icons implemented  
✅ **Firebase Integration**: Complete setup for auth and messaging  

## 🔍 Testing Checklist

- [ ] App starts without errors
- [ ] App icon shows RushHour_logo_v2.png
- [ ] Background colors are orange (#FF9E4E)
- [ ] Logo appears consistently across screens
- [ ] No console errors related to assets
- [ ] Local server connection works
- [ ] API calls succeed
- [ ] Notification icons display correctly

## 📚 Additional Resources

- [API Documentation](./src/BE_Api/API_SDK_DOCUMENTATION.md) - API reference
- [Firebase Setup Guide](./FIREBASE_SETUP_GUIDE.md) - Firebase configuration
- [Environment Configuration](./src/config/env.js) - Configuration details
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

## 🤝 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your backend server is running correctly
3. Check the console logs for error messages
4. Try switching between mock and local modes
5. Consult the API documentation for endpoint details

For additional support, please refer to the project documentation or contact the development team.

## 🎉 You're Ready to Develop!

Your project is now configured for local development with:
- ✅ Updated logos and icons
- ✅ Correct background colors
- ✅ Local development scripts
- ✅ No EAS dependency required
- ✅ Custom notification icons
- ✅ Firebase integration
- ✅ Complete API implementation

Start developing with `npm start` and test on your preferred platform!
