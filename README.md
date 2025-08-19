# 🚗 RushHour - Blocking Without Being Blocked

> **The solution for Parking Jam** - A React Native app that helps manage car blocking situations with smart notifications and easy car management.

## 🎯 **What is RushHour?**

RushHour is a mobile app that helps drivers manage parking situations where cars are blocking each other. Users can:
- **Register their cars** with license plate numbers
- **Report blocking situations** when they need to leave
- **Receive smart notifications** when blocking cars move
- **Manage multiple cars** for families or businesses

## ✨ **Key Features**

- 🚗 **Car Management**: Register and manage multiple vehicles
- 🔔 **Smart Notifications**: Custom car horn sounds and icons
- 📱 **Cross-Platform**: Works on iOS and Android
- 🔐 **Google Sign-In**: Secure authentication
- 🌐 **Real-time Updates**: Instant notifications when cars move
- 🎨 **Custom Branding**: RushHour orange theme throughout

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v16+)
- Your backend server running on `http://192.168.0.182:8008`

### **One-Command Setup**
```bash
# macOS/Linux
npm run dev:setup

# Windows
npm run dev:setup:win
```

### **Manual Setup**
```bash
npm install
npm run start:local
```

### **Platform-Specific**
```bash
# Web
npm run web:local

# iOS
npm run ios:local

# Android
npm run android:local
```

## 📱 **Platform Support**

| Platform | Status | Features |
|----------|--------|----------|
| **iOS** | ✅ Ready | Full native features, custom splash screen |
| **Android** | ✅ Ready | Custom notification icons, car horn sounds |
| **Web** | ✅ Ready | Full web experience |

## 🔧 **Development**

### **Available Scripts**
```bash
npm run start:local    # Start with local server
npm run start:mock     # Start with mock API
npm run start:prod     # Start with production API
npm run android:local  # Run on Android
npm run ios:local      # Run on iOS
npm run web:local      # Run on web
```

### **Environment Modes**
- **Local**: `http://192.168.0.182:8008` (for backend testing)
- **Mock**: Mock data (for UI development)
- **Production**: Production API endpoints

## 🎨 **Customization**

### **Notification Icons**
Your notification icon is fully customizable! No more white circles:

```bash
# Use the customization script
./scripts/customize_notification_icon.sh
```

**Popular Themes:**
- 🟠 **RushHour Orange** (#FF6B35) - Brand consistency
- 🔵 **Blue** (#2196F3) - Professional look
- 🟢 **Green** (#4CAF50) - Success/positive
- 🟣 **Purple** (#9C27B0) - Creative/modern
- ⚫ **Dark** (#333333) - Dark theme apps

### **Notification Sounds**
- 🚗 **Single Car Horn**: Info notifications
- 🚗🚗 **Double Car Horn**: Urgent notifications

## 🔐 **Authentication & Backend**

### **Google Sign-In**
- OAuth 2.0 integration
- Automatic token management
- Secure API communication

### **API Features**
- **Health Check**: Server status monitoring
- **User Management**: Full CRUD operations
- **Car Management**: Find, create, and manage cars
- **Blocking Relationships**: Track car blocking situations
- **Smart Notifications**: Context-aware alerts

## 📁 **Project Structure**

```
RH/
├── 📱 Mobile App
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── screens/             # App screens
│   │   ├── services/            # Business logic services
│   │   ├── BE_Api/              # API integration
│   │   ├── config/              # App configuration
│   │   ├── redux/               # State management
│   │   └── styles/              # Styling and themes
│   ├── android/                 # Android-specific code
│   └── ios/                     # iOS-specific code
├── 🔧 Configuration
│   ├── app.json                 # Expo configuration
│   ├── package.json             # Dependencies
│   └── metro.config.js          # Metro bundler config
├── 📚 Documentation
│   ├── DEVELOPMENT.md           # Development guide
│   ├── NOTIFICATIONS.md         # Notifications guide
│   ├── FIREBASE_SETUP_GUIDE.md  # Firebase configuration
│   └── TODO.md                  # Project roadmap
└── 🎨 Assets
    ├── images/                  # App images and logos
    └── sounds/                  # Notification sounds
```

## 🎯 **Current Status**

### ✅ **Completed Features**
- **App Icon & Branding**: RushHour logo and orange theme
- **Splash Screen**: Custom orange background
- **Notification System**: Custom icons and car horn sounds
- **Firebase Integration**: Authentication and messaging
- **API Integration**: Complete backend integration
- **Cross-Platform**: iOS, Android, and Web support
- **Local Development**: Full local development setup

### 🚧 **In Development**
- **Blocking Flow UI**: User interface for reporting blocking situations
- **E2E Testing**: End-to-end testing framework
- **Performance Optimization**: Code optimization and monitoring

### 📋 **Roadmap**
- **Multi-language Support**: Internationalization
- **Advanced Car Management**: Enhanced car features
- **Social Features**: User interactions and sharing
- **Premium Features**: Advanced functionality

## 🔍 **Testing**

### **Local Testing**
```bash
# Test local server connection
npm run test:server

# Test on different platforms
npm run web:local    # Web testing
npm run ios:local    # iOS testing
npm run android:local # Android testing
```

### **Verification Checklist**
- [ ] App starts without errors
- [ ] App icon shows RushHour logo
- [ ] Background colors are orange (#FF9E4E)
- [ ] Logo appears consistently across screens
- [ ] Local server connection works
- [ ] API calls succeed
- [ ] Notification icons display correctly
- [ ] Custom sounds play for different notification types

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Local Server Not Running**
```bash
# Check if server is accessible
curl http://192.168.0.182:8008/api/v1/health
```

#### **Build Errors**
```bash
# Clean and rebuild
cd android && ./gradlew clean && cd ..
npx expo run:android
```

#### **Metro Bundler Issues**
```bash
# Clear cache
npx expo start --clear
```

### **Debug Commands**
```bash
# Check environment
echo $NODE_ENV
echo $API_BASE_URL

# Reset dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 **Documentation**

- **[Development Guide](./DEVELOPMENT.md)** - Complete development setup
- **[Notifications Guide](./NOTIFICATIONS.md)** - Custom icons and sounds
- **[Firebase Setup](./FIREBASE_SETUP_GUIDE.md)** - Authentication and messaging
- **[API Documentation](./src/BE_Api/API_SDK_DOCUMENTATION.md)** - Backend integration
- **[Project Roadmap](./TODO.md)** - Features and timeline

## 🤝 **Getting Help**

### **Development Issues**
1. Check the troubleshooting section above
2. Verify your backend server is running
3. Check console logs for error messages
4. Try switching between mock and local modes

### **Additional Support**
- Check the detailed documentation files
- Review the API documentation
- Consult the Firebase setup guide

## 🚀 **Deployment**

### **Development Builds**
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### **Production Builds**
```bash
# Using EAS Build
eas build --platform ios
eas build --platform android
```

## 📄 **License**

This project follows the same license as the main RushHour project.

## 🎉 **You're Ready to Go!**

Your RushHour app is fully configured with:
- ✅ Professional branding and icons
- ✅ Custom notification system
- ✅ Complete Firebase integration
- ✅ Full API implementation
- ✅ Cross-platform support
- ✅ Local development setup

Start developing with `npm start` and test on your preferred platform!

---

**Built with ❤️ using React Native, Expo, and Firebase**
