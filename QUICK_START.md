# 🚀 Quick Start - Local Development

## Prerequisites
- Node.js (v16+)
- Your backend server running on `http://192.168.0.182:8008`

## 🎯 One-Command Setup

### macOS/Linux:
```bash
npm run dev:setup
```

### Windows:
```bash
npm run dev:setup:win
```

## 🔧 Manual Setup

1. **Test your local server:**
   ```bash
   npm run test:server
   ```

2. **Start the app with local server:**
   ```bash
   npm run start:local
   ```

## 📱 Platform-Specific Commands

| Platform | Command |
|----------|---------|
| Web | `npm run web:local` |
| iOS | `npm run ios:local` |
| Android | `npm run android:local` |

## 🔍 Verification

When the app starts, you should see:
```
🚀 API Configuration:
   Base URL: http://192.168.0.182:8008
   Environment: development
   Development Mode: true
```

## 🐛 Troubleshooting

If you see connection errors:
1. Make sure your backend server is running on port 8008
2. Run `npm run test:server` to diagnose issues
3. Check the [Local Development Guide](./LOCAL_DEVELOPMENT.md) for detailed troubleshooting

## 📚 More Information

- [Local Development Guide](./LOCAL_DEVELOPMENT.md) - Complete setup guide
- [API Documentation](./src/BE_Api/API_SDK_DOCUMENTATION.md) - API reference
- [Environment Configuration](./src/config/env.js) - Configuration details 