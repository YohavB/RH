import { Platform, PermissionsAndroid } from "react-native";
import { getMessaging, getApp } from "../firebase/config";
import { getToken as getFCMToken, deleteToken as deleteFCMToken } from "@react-native-firebase/messaging";
import { store } from "../redux/store";
import { setFcmToken } from "../redux/actions";

class FCMTokenService {
  constructor() {
    this.currentToken = null;
  }

  /** Get current FCM token */
  async getToken() {
    if (Platform.OS === "ios" && __DEV__) {
      console.log("⚠️ Cannot get FCM token on iOS Simulator");
      return null;
    }

    try {
      const messaging = getMessaging(getApp());
      const token = await getFCMToken(messaging);

      if (token) {
        console.log("🎟️ FCM Token retrieved:", token);
        this.currentToken = token;
        store.dispatch(setFcmToken(token));
        console.log("💾 FCM Token saved to Redux store");
      } else {
        console.log("⚠️ No FCM token available");
      }

      return token;
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
      return null;
    }
  }

  /** Delete current FCM token */
  async deleteToken() {
    if (Platform.OS === "ios" && __DEV__) {
      console.log("⚠️ Cannot delete FCM token on iOS Simulator");
      return;
    }

    try {
      const messaging = getMessaging(getApp());
      await deleteFCMToken(messaging);

      store.dispatch(setFcmToken(null));
      this.currentToken = null;
      console.log("🗑️ FCM Token deleted");
    } catch (error) {
      console.error("❌ Error deleting FCM token:", error);
    }
  }

  /** Get token from memory */
  getCurrentToken() {
    return this.currentToken;
  }

  /** Check if we have a valid token */
  hasToken() {
    return !!this.currentToken;
  }

  /** Get token from Redux store */
  getTokenFromStore() {
    return store.getState().user?.fcmToken || null;
  }

  /** Update current token in memory */
  updateCurrentToken(token) {
    this.currentToken = token;
    console.log("🔄 FCMTokenService current token updated");
  }

  /** Request iOS notification permissions */
  async requestIOSPermission() {
    if (Platform.OS === "ios" && __DEV__) {
      console.log("⚠️ Cannot request notification permission on iOS Simulator");
      return false;
    }

    try {
      const { requestPermission, AuthorizationStatus } = await import("@react-native-firebase/messaging");
      const messaging = getMessaging(getApp());
      const status = await requestPermission(messaging, {
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        criticalAlert: false,
        provisional: false,
        sound: true,
      });

      const enabled = [AuthorizationStatus.AUTHORIZED, AuthorizationStatus.PROVISIONAL].includes(status);
      console.log(enabled ? "✅ iOS notification permission granted" : "❌ iOS notification permission denied", status);
      return enabled;
    } catch (error) {
      console.error("❌ Error requesting iOS notification permission:", error);
      return false;
    }
  }

  /** Request Android notification permissions */
  async requestAndroidPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      const success = granted === PermissionsAndroid.RESULTS.GRANTED;
      console.log(success ? "✅ Android notification permission granted" : "❌ Android notification permission denied");
      return success;
    } catch (error) {
      console.error("❌ Error requesting Android notification permission:", error);
      return false;
    }
  }

  /** Request notification permissions based on platform */
  async requestNotificationPermission() {
    if (Platform.OS === "ios") return this.requestIOSPermission();
    if (Platform.OS === "android") return this.requestAndroidPermission();
    return false;
  }

  /** Setup and sync token with backend */
  async setupAndSyncToken(userInfo, updateBackendToken) {
    if (!userInfo) {
      console.log("⏳ Waiting for userInfo from backend before managing FCM token");
      return;
    }

    const currentToken = await this.getToken();
    console.log("🔔 Current FCM Token:", currentToken);
    console.log("🔔 Backend FCM Token:", userInfo.pushNotificationToken);

    if (!userInfo.pushNotificationToken || !currentToken) {
      console.log("📱 User has no push notification token, requesting permissions");
      const permissionGranted = await this.requestNotificationPermission();
      if (permissionGranted) {
        const newToken = await this.getToken();
        if (newToken) store.dispatch(setFcmToken(newToken));
      }
    }

    if (this.needsRefresh(userInfo.pushNotificationToken)) {
      console.log("🔄 FCM token differs from backend, updating...");
      try {
        await updateBackendToken(currentToken);
        console.log("✅ FCM token updated on backend");
      } catch (error) {
        console.error("❌ Failed to update FCM token on backend:", error);
      }
    } else if (currentToken) {
      console.log("✅ FCM token is already up to date with backend");
    }
  }

  /** Check if token needs refresh */
  needsRefresh(backendToken) {
    return !backendToken || this.getTokenFromStore() !== backendToken;
  }

  /** Test FCM token service */
  async test() {
    console.log("🧪 Testing FCM token service...");
    if (Platform.OS === "ios" && __DEV__) {
      console.log("⚠️ Push notifications not supported on iOS Simulator");
      return false;
    }

    const token = await this.getToken();
    if (token) console.log("✅ FCM token service is working:", token);
    else console.log("❌ Failed to get FCM token");
    return !!token;
  }
}

export default new FCMTokenService();