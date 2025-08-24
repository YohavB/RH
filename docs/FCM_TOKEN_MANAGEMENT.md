# FCM Token Management Flow

This document explains how FCM (Firebase Cloud Messaging) tokens are managed in the RushHour app.

## 🔄 Token Flow Overview

```
SplashScreen → NotificationService.initialize() → Permission Request → Token Generation → Store in Redux → Compare with Backend → Update if Different
```

## 📱 Initialization Process

### 1. SplashScreen Initialization
- `NotificationService.initialize()` is called during app startup
- Requests notification permissions from user
- Sets up FCM token refresh listeners
- Initializes foreground/background message handlers

### 2. Permission Request
- **iOS**: Requests alert, badge, and sound permissions
- **Android**: Requests POST_NOTIFICATIONS permission (API 33+)
- Permissions are requested before attempting to get FCM token

### 3. Token Generation
- FCM token is generated after permissions are granted
- Token is automatically saved to Redux store (`state.user.fcmToken`)
- Token refresh listener is set up to handle automatic token updates

## 💾 Token Storage

### Redux Store
```typescript
interface UserState {
  // ... other fields
  fcmToken: string | null; // Local FCM token
}
```

### Backend Storage
- Token is stored in `userInfo.pushNotificationToken` (from backend)
- Updated via `updatePushNotificationToken()` API call

## 🔄 Token Update Triggers

### 1. Automatic Token Refresh
- FCM automatically refreshes tokens periodically
- `onTokenRefresh` listener catches these updates
- New token is immediately saved to Redux store
- Backend is automatically updated via API call

### 2. Manual Token Check (MainScreen)
- Triggered when `userInfo` changes (user logs in/refreshes)
- Compares local FCM token with backend token
- Updates backend if tokens differ
- Only runs when userInfo is available from backend

## 🚀 Implementation Details

### FCMTokenService.js
```javascript
// Centralized FCM token management
class FCMTokenService {
  async getToken() {
    // Get token from Firebase and save to Redux
    const token = await getFCMToken(messaging);
    store.dispatch(setFcmToken(token));
    return token;
  }
  
  needsRefresh(backendToken) {
    // Check if token needs backend update
    const currentToken = this.getTokenFromStore();
    return !backendToken || currentToken !== backendToken;
  }
}
```

### NotificationService.js
```javascript
// Token refresh handler
this.unsubscribeTokenRefresh = messaging.onTokenRefresh(async token => {
  // Save to Redux store
  store.dispatch(setFcmToken(token));
  
  // Update FCMTokenService
  FCMTokenService.updateCurrentToken(token);
});
```

### MainScreen.js
```javascript
useEffect(() => {
  const setupFCMToken = async () => {
    await FCMTokenService.setupAndSyncToken(userInfo, updatePushNotificationToken);
  };
  
  setupFCMToken();
}, [userInfo]);
```

## 🎯 Key Benefits

1. **Automatic Management**: Tokens are automatically refreshed and updated
2. **Backend Sync**: Backend always has the latest token
3. **Permission Handling**: Proper permission flow before token generation
4. **Error Handling**: Failed API calls are logged and handled gracefully
5. **State Management**: Token is centrally stored in Redux

## 🔍 Debugging

### Log Messages
- `🎟️ FCM Token: [token]` - Token generated
- `💾 FCM Token saved to Redux store` - Token stored locally
- `🔄 FCM Token refreshed: [token]` - Token automatically refreshed
- `✅ FCM Token updated on backend` - Backend update successful
- `❌ Failed to update FCM token on backend` - Backend update failed

### Common Issues
1. **iOS Simulator**: FCM tokens not supported, use physical device
2. **Permission Denied**: User must grant notification permissions
3. **Network Issues**: Backend updates may fail if offline
4. **Token Mismatch**: Local and backend tokens may differ during development

## 📋 Testing Checklist

- [ ] App requests notification permissions on first launch
- [ ] FCM token is generated after permissions granted
- [ ] Token is saved to Redux store
- [ ] Token refresh listener is working
- [ ] Backend is updated when token changes
- [ ] MainScreen properly compares and updates tokens
- [ ] Error handling works for failed API calls

## 🔧 Future Improvements

1. **Retry Logic**: Implement retry mechanism for failed backend updates
2. **Token Validation**: Validate token format before sending to backend
3. **Offline Queue**: Queue token updates when offline
4. **Analytics**: Track token refresh frequency and success rates
