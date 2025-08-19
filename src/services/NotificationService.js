import { Platform } from 'react-native';
import { getMessaging, getApp } from '../firebase/config';
import { 
  requestPermission, 
  onMessage, 
  onNotificationOpenedApp, 
  getInitialNotification,
  getToken as getFCMToken,
  deleteToken as deleteFCMToken,
  AuthorizationStatus
} from '@react-native-firebase/messaging';
import { getSoundType } from '../config/notificationSounds';

class NotificationService {
  constructor() {
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Request permission with sound enabled using Firebase v23+ modular API
      const messaging = getMessaging(getApp());
      const authStatus = await requestPermission(messaging, {
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        criticalAlert: false,
        provisional: false,
        sound: true, // This is crucial for sound!
      });

      console.log('Notification permission status:', authStatus);

      // Set up foreground message handler using Firebase v23+ modular API
      this.unsubscribeForeground = onMessage(messaging, async (remoteMessage) => {
        console.log('Foreground message received:', remoteMessage);
        this.handleForegroundMessage(remoteMessage);
      });

      // Set up notification opened handler using Firebase v23+ modular API
      this.unsubscribeNotificationOpened = onNotificationOpenedApp(messaging, remoteMessage => {
        console.log('Notification opened app:', remoteMessage);
        this.handleNotificationOpened(remoteMessage);
      });

      // Check if app was opened from a notification using Firebase v23+ modular API
      getInitialNotification(messaging).then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from notification:', remoteMessage);
          this.handleNotificationOpened(remoteMessage);
        }
      });

      this.isInitialized = true;
      console.log('NotificationService initialized successfully');
    } catch (error) {
      console.error('Error initializing NotificationService:', error);
    }
  }

  handleForegroundMessage(remoteMessage) {
    // Handle foreground messages with custom sound logic
    const notificationType = remoteMessage.data?.notificationType;
    
    if (Platform.OS === 'ios') {
      console.log('iOS foreground notification - sound handled by system');
      // iOS will play the default notification sound automatically
      // We can't override it easily in foreground, but background notifications will use our custom sounds
    } else {
      console.log('Android foreground notification - sound handled by system');
      // Android will also use system sounds for foreground notifications
    }
    
    // Log which sound would be played for this notification type
    const soundType = getSoundType(notificationType);
    console.log(`🔊 Notification type "${notificationType}" would play ${soundType} sound`);
  }

  handleNotificationOpened(remoteMessage) {
    // Handle when user taps on notification
    // You can navigate to specific screens here based on the notification data
    console.log('Handling notification opened:', remoteMessage);
  }

  async getToken() {
    try {
      const messaging = getMessaging(getApp());
      const token = await getFCMToken(messaging);
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  async deleteToken() {
    try {
      const messaging = getMessaging(getApp());
      await deleteFCMToken(messaging);
      console.log('FCM Token deleted');
    } catch (error) {
      console.error('Error deleting FCM token:', error);
    }
  }

  // Test method to verify notification service is working
  async testNotification() {
    try {
      console.log('Testing notification service...');
      const token = await this.getToken();
      if (token) {
        console.log('✅ Notification service is working. Token:', token);
        return true;
      } else {
        console.log('❌ Failed to get notification token');
        return false;
      }
    } catch (error) {
      console.error('❌ Notification service test failed:', error);
      return false;
    }
  }

  // Get available notification types for reference
  getAvailableNotificationTypes() {
    return {
      urgent: ['NEED_TO_GO', 'URGENT', 'BLOCKING', 'EMERGENCY', 'CAR_BLOCKING', 'PARKING_VIOLATION'],
      info: ['FREE_TO_GO', 'CAR_LEFT', 'INFO', 'STATUS_UPDATE', 'REMINDER', 'CONFIRMATION', 'SUCCESS']
    };
  }

  // Get notification sound configuration
  getNotificationSoundConfig() {
    return {
      urgent: 'double_car_horn.wav',
      info: 'car_horn.wav'
    };
  }

  cleanup() {
    if (this.unsubscribeForeground) {
      this.unsubscribeForeground();
    }
    if (this.unsubscribeNotificationOpened) {
      this.unsubscribeNotificationOpened();
    }
    
    this.isInitialized = false;
  }
}

export default new NotificationService();
