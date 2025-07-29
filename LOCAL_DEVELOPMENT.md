# 🚗 RushHour Local Development Guide

This guide will help you run the RushHour app locally with requests to a local server.

## 📋 Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Your local backend server** running on `http://192.168.0.182:8008`

## 🚀 Quick Start

### Option 1: Using the Setup Scripts (Recommended)

#### For macOS/Linux:
```bash
# Make the script executable and run it
npm run dev:setup
```

#### For Windows:
```bash
# Run the Windows batch file
npm run dev:setup:win
```

### Option 2: Manual Setup

1. **Set environment variables:**
   ```bash
   export NODE_ENV=development
   export API_BASE_URL=http://192.168.0.182:8008
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run start:local
   ```

## 🔧 Available Scripts

The following npm scripts are available for different development scenarios:

### Development Scripts

| Script | Description | Environment | API URL |
|--------|-------------|-------------|---------|
| `npm run start:local` | Start with local server | `development` | `http://192.168.0.182:8008` |
| `npm run start:mock` | Start with mock API | `development` | Mock data |
| `npm run start:prod` | Start with production API | `production` | Production URL |

### Platform-Specific Scripts

| Script | Description |
|--------|-------------|
| `npm run android:local` | Run on Android with local server |
| `npm run ios:local` | Run on iOS with local server |
| `npm run web:local` | Run on web with local server |

## 🌐 Running on Different Platforms

### Web Development
```bash
npm run web:local
```
This will open the app in your browser at `http://localhost:19006`

### iOS Simulator
```bash
npm run ios:local
```
Make sure you have Xcode installed and iOS Simulator available.

### Android Emulator
```bash
npm run android:local
```
Make sure you have Android Studio installed and an emulator running.

### Physical Device
1. Install the Expo Go app on your device
2. Run `npm run start:local`
3. Scan the QR code with Expo Go

## 🔍 Verifying Your Setup

### 1. Check Environment Configuration

When you start the app, you should see logs like this:
```
🚀 API Configuration:
   Base URL: http://192.168.0.182:8008
   Environment: development
   Development Mode: true
```

### 2. Test Local Server Connection

The setup scripts will automatically check if your local server is running. You should see:
```
✅ Local server is running at http://192.168.0.182:8008
```

If you see a warning instead, make sure your backend server is running.

### 3. Test API Health Check

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

## 🔧 Configuration Files

### Environment Configuration (`src/config/env.js`)

The app uses this configuration file to determine the API URL:

```javascript
export const ENV = {
  ENVIRONMENT: process.env.NODE_ENV || 'DEVELOPMENT',
  API_URL: process.env.API_BASE_URL || 'http://192.168.0.182:8008',
LOCAL_SERVER_URL: 'http://192.168.0.182:8008',
  LOCAL_SERVER_PORT: 8008,
};
```

### API Configuration (`src/BE_Api/ApiCalls.ts`)

The API calls automatically use the configured base URL:

```javascript
const BASE_URL = getApiUrl(); // Returns http://192.168.0.182:8008 in development
```

## 🐛 Troubleshooting

### Common Issues

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

### Debug Commands

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

### 1. Health Check
The app will automatically test the connection when it starts. Check the console logs for:
```
✅ Health check successful
```

### 2. Authentication
Test OAuth login (the app will use mock data for OAuth tokens):
```javascript
// In your app, try logging in
const auth = await googleLogin('mock_token');
console.log('Login successful:', auth.user);
```

### 3. API Calls
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

## 🔄 Switching Between Modes

### Local Server Mode
```bash
npm run start:local
```
- Uses real API calls to `http://192.168.0.182:8008`
- Requires your backend server to be running
- Best for testing with real backend

### Mock API Mode
```bash
npm run start:mock
```
- Uses mock data for all API calls
- No backend server required
- Best for UI development and testing

### Production Mode
```bash
npm run start:prod
```
- Uses production API endpoints
- Requires production backend to be accessible
- Best for production testing

## 📊 Development Workflow

### Recommended Workflow

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

### Development Tips

- Use the **Expo DevTools** for debugging
- Check the **Metro bundler console** for build errors
- Use **React Native Debugger** for advanced debugging
- Monitor **network requests** in browser dev tools (web) or Flipper (mobile)

## 🚨 Important Notes

### Security
- The local development setup uses HTTP (not HTTPS)
- Never use local development configuration in production
- OAuth tokens are mocked in development mode

### Performance
- Local development may be slower due to network requests
- Use mock mode for UI development to avoid network delays
- Consider using React Native Debugger for better performance

### Backend Requirements
Your local backend server should:
- Run on `http://192.168.0.182:8008`
- Implement all endpoints from the API documentation
- Support CORS for web development
- Have proper error handling

## 📚 Additional Resources

- [API Documentation](./src/BE_Api/API_SDK_DOCUMENTATION.md)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Backend API Guide](https://your-backend-docs.com)

## 🤝 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your backend server is running correctly
3. Check the console logs for error messages
4. Try switching between mock and local modes
5. Consult the API documentation for endpoint details

For additional support, please refer to the project documentation or contact the development team. 