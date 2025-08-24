import { Platform, PermissionsAndroid } from 'react-native';
import { getMessaging, getApp } from '../firebase/config';
import notifee, { AndroidImportance } from '@notifee/react-native';
import {
  requestPermission,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import { getSoundType, getSoundFileName } from '../config/notificationSounds';
import { store } from '../redux/store';
import { setFcmToken } from '../redux/actions';
import { ScreenNames } from '../screens/ScreenNames';
import FCMTokenService from './FCMTokenService';
import { Colors } from '../styles/GlobalStyle';

class NotificationService {
  constructor() {
    this.isInitialized = false;
    this.initPromise = null;
    this.unsubscribeForeground = null;
    this.unsubscribeNotificationOpened = null;
    this.unsubscribeTokenRefresh = null;
  }

  async requestAndroidPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  async initialize() {
    if (this.isInitialized) return this.initPromise;
    if (this.initPromise) return this.initPromise; // prevent race

    this.initPromise = (async () => {
      try {
        if (Platform.OS === 'ios' && __DEV__) {
          console.log('⚠️ iOS Simulator - Push notifications not supported');
          this.isInitialized = true;
          return;
        }

        if (Platform.OS === 'android') {
          const granted = await this.requestAndroidPermission();
          if (!granted) {
            console.log('🚫 Android notification permission denied');
            return;
          }
        }

        const app = getApp();
        const messaging = getMessaging(app);

        const authStatus = await requestPermission(messaging, {
          alert: true,
          badge: true,
          sound: true,
        });
        console.log('📌 Notification permission status:', authStatus);
        
        // Check if permissions were granted
        if (authStatus === 'granted') {
          console.log('✅ All notification permissions granted');
        } else if (authStatus === 'denied') {
          console.log('❌ Notification permissions denied by user');
        } else if (authStatus === 'blocked') {
          console.log('🚫 Notification permissions blocked by user');
        } else {
          console.log(`⚠️ Unknown permission status: ${authStatus}`);
        }

        // Create default notification channel for Android
        if (Platform.OS === 'android') {
          await this.createDefaultChannel();
          console.log('✅ Default Android notification channel created');
        }

        this.unsubscribeForeground = onMessage(messaging, async remoteMessage => {
          console.log('📨 Foreground message received:', remoteMessage);
          this.handleForegroundMessage(remoteMessage);
        });

        this.unsubscribeNotificationOpened = onNotificationOpenedApp(
          messaging,
          remoteMessage => {
            console.log('📨 Notification opened app:', remoteMessage);
            this.handleNotificationOpened(remoteMessage);
          }
        );

        getInitialNotification(messaging).then(remoteMessage => {
          if (remoteMessage) {
            console.log('📨 App opened from notification:', remoteMessage);
            this.handleNotificationOpened(remoteMessage);
          }
        });

        this.unsubscribeTokenRefresh = messaging.onTokenRefresh(async token => {
          console.log('🔄 FCM Token refreshed:', token);
          
          // Save new token to Redux store
          store.dispatch(setFcmToken(token));
          console.log('💾 New FCM Token saved to Redux store');
          
          // Update the FCMTokenService's current token
          FCMTokenService.updateCurrentToken(token);
        });

        this.isInitialized = true;
        console.log('✅ NotificationService initialized successfully');
      } catch (error) {
        console.error('❌ Error initializing NotificationService:', error);
      }
    })();

    return this.initPromise;
  }

  /**
   * Get the appropriate notification icon based on notification type
   * @param {string} notificationType - The type of notification
   * @returns {string} The icon resource name
   */
  getNotificationIcon(notificationType) {
    const urgentTypes = this.getAvailableNotificationTypes().urgent;
    const infoTypes = this.getAvailableNotificationTypes().info;
    
    if (urgentTypes.includes(notificationType)) {
      // Use a more prominent icon for urgent notifications
      return 'notification_icon_foreground';
    } else if (infoTypes.includes(notificationType)) {
      // Use the standard icon for info notifications
      return 'notification_icon_simple';
    } else {
      // Default icon
      return 'notification_icon_simple';
    }
  }

  async handleForegroundMessage(remoteMessage) {
    try {
      console.log('🔍 Starting foreground notification handling...');
      
      const notificationType = remoteMessage.data?.notificationType;
      const title = remoteMessage.notification?.title || 'New Notification';
      const body = remoteMessage.notification?.body || 'You have a new message';
      const soundType = getSoundType(notificationType);
      const soundFileName = getSoundFileName(notificationType);
      const notificationIcon = this.getNotificationIcon(notificationType);

      console.log(`🔊 Foreground notification type "${notificationType}" -> ${soundType} sound (${soundFileName}) with icon: ${notificationIcon}`);
      console.log(`📝 Notification content: "${title}" - "${body}"`);

      // Create the Android channel first
      console.log('🔧 Creating Android notification channel...');
      const channelId = await this.getAndroidChannelId(notificationType);
      console.log(`✅ Android channel created/retrieved: ${channelId}`);

      // Show a banner notification using Notifee
      console.log('📱 Displaying notification with Notifee...');
      const notificationId = await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
          // Use the appropriate notification icon for both small and large
          smallIcon: notificationIcon,
          largeIcon: notificationIcon, // Use same icon instead of ic_launcher
          // Set notification color to match app theme
          color: Colors.mainOrange,
          // Enable custom sound for the notification
          sound: soundFileName.replace('.wav', ''), // Remove .wav extension for Android
          // Ensure notification is visible
          importance: AndroidImportance.HIGH,
          // Add some debugging info
          tag: `foreground_${notificationType}`,
        },
        ios: {
          sound: soundFileName, // Use full filename for iOS
        },
      });

      console.log(`✅ Foreground notification displayed successfully with ID: ${notificationId}`);
      
      // Verify the notification was created
      const notifications = await notifee.getDisplayedNotifications();
      console.log(`📋 Current displayed notifications: ${notifications.length}`);
      
    } catch (error) {
      console.error('❌ Error in handleForegroundMessage:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        remoteMessage: remoteMessage
      });
      
      // Try to show a fallback notification
      try {
        console.log('🔄 Attempting fallback notification...');
        await notifee.displayNotification({
          title: 'Notification Error',
          body: 'There was an issue displaying the notification',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
        });
        console.log('✅ Fallback notification displayed');
      } catch (fallbackError) {
        console.error('❌ Fallback notification also failed:', fallbackError);
      }
    }
  }

  async getAndroidChannelId(notificationType) {
    try {
      console.log(`🔧 Creating Android channel for type: ${notificationType}`);
      
      const soundType = getSoundType(notificationType);
      const soundFileName = getSoundFileName(notificationType);
      const notificationIcon = this.getNotificationIcon(notificationType);

      console.log(`🔊 Channel config: ${soundType} -> ${soundFileName} -> ${notificationIcon}`);

      // Create or reuse channel for Android
      const channelId = await notifee.createChannel({
        id: soundType || 'default',
        name: `${soundType || 'Default'} Notifications`,
        // Enable custom sound for the channel - this is crucial for custom sounds
        sound: soundFileName.replace('.wav', ''), // Remove .wav extension for Android
        importance: AndroidImportance.HIGH,
        // Use the appropriate notification icon for the channel
        icon: notificationIcon,
        // Enable vibration and lights for better notification experience
        vibration: true,
        lights: true,
        lightColor: Colors.mainOrange,
      });

      console.log(`✅ Android channel created successfully: ${channelId}`);
      
      // Verify the channel was created
      const channels = await notifee.getChannels();
      const channel = channels.find(c => c.id === channelId);
      if (channel) {
        console.log(`✅ Channel verified: ${channel.id} - ${channel.name} - Sound: ${channel.sound}`);
      } else {
        console.log(`⚠️ Channel not found in getChannels(): ${channelId}`);
      }
      
      return channelId;
    } catch (error) {
      console.error('❌ Error creating Android channel:', error);
      console.error('Channel creation error details:', {
        message: error.message,
        stack: error.stack,
        notificationType,
      });
      
      // Return default channel as fallback
      console.log('🔄 Using default channel as fallback');
      return 'default';
    }
  }

  async createDefaultChannel() {
    // Create a default channel for fallback notifications
    return await notifee.createChannel({
      id: 'default',
      name: 'Default Notifications',
      importance: AndroidImportance.HIGH,
      vibration: true,
      lights: true,
      lightColor: Colors.mainOrange,
    });
  }

  handleNotificationOpened(remoteMessage) {
    console.log('👉 Handling notification opened:', remoteMessage);
    // TODO: Fix navigation reference - need to pass navigation object or use navigation service
    // navigation.navigate(ScreenNames.MAIN);
  }

  async getToken() {
    // Delegate to FCMTokenService
    return await FCMTokenService.getToken();
  }

  async deleteToken() {
    // Delegate to FCMTokenService
    await FCMTokenService.deleteToken();
  }

  async testNotification() {
    try {
      console.log('🧪 Testing notification service...');
      
      // Test both urgent and info notification types
      const testNotifications = [
        {
          type: 'NEED_TO_GO',
          title: '🚨 Urgent Test Notification',
          body: 'This should show urgent icon and double car horn sound'
        },
        {
          type: 'FREE_TO_GO', 
          title: 'ℹ️ Info Test Notification',
          body: 'This should show info icon and single car horn sound'
        }
      ];

      for (const test of testNotifications) {
        console.log(`🧪 Testing ${test.type} notification...`);
        
        const soundType = getSoundType(test.type);
        const soundFileName = getSoundFileName(test.type);
        const notificationIcon = this.getNotificationIcon(test.type);
        
        console.log(`🔊 Test notification: ${test.type} -> ${soundType} sound (${soundFileName}) with icon: ${notificationIcon}`);
        
        // Create test notification
        await notifee.displayNotification({
          title: test.title,
          body: test.body,
          android: {
            channelId: await this.getAndroidChannelId(test.type),
            pressAction: {
              id: 'default',
            },
            smallIcon: notificationIcon,
            largeIcon: notificationIcon,
            color: Colors.mainOrange,
            sound: soundFileName.replace('.wav', ''),
          },
          ios: {
            sound: soundFileName,
          },
        });
        
        // Wait a bit between notifications
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      console.log('✅ Test notifications sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Notification service test failed:', error);
      return false;
    }
  }

  async testNotificationChannels() {
    try {
      console.log('🧪 Testing notification channels...');
      
      // Test creating channels for different notification types
      const testTypes = ['NEED_TO_GO', 'FREE_TO_GO', 'URGENT', 'INFO'];
      
      for (const type of testTypes) {
        const soundType = getSoundType(type);
        const soundFileName = getSoundFileName(type);
        const channelId = await this.getAndroidChannelId(type);
        
        console.log(`🔊 Channel test: ${type} -> ${soundType} -> ${soundFileName} -> Channel ID: ${channelId}`);
      }
      
      // Test default channel
      const defaultChannel = await this.createDefaultChannel();
      console.log(`🔊 Default channel created: ${defaultChannel}`);
      
      console.log('✅ Notification channels test completed');
      return true;
    } catch (error) {
      console.error('❌ Notification channels test failed:', error);
      return false;
    }
  }

  async testBasicNotification() {
    try {
      console.log('🧪 Testing basic notification display...');
      
      // Create a simple test notification without custom sounds
      const notificationId = await notifee.displayNotification({
        title: '🧪 Test Notification',
        body: 'This is a basic test notification to verify the system works',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'notification_icon_simple',
          color: '#FF6B35',
        },
        ios: {
          // iOS will use default sound
        },
      });
      
      console.log(`✅ Basic test notification displayed with ID: ${notificationId}`);
      
      // Wait a moment then check if it's still displayed
      setTimeout(async () => {
        try {
          const notifications = await notifee.getDisplayedNotifications();
          console.log(`📋 Current displayed notifications: ${notifications.length}`);
          
          // Cancel the test notification after 5 seconds
          setTimeout(async () => {
            await notifee.cancelNotification(notificationId);
            console.log('🗑️ Test notification cancelled');
          }, 5000);
          
        } catch (error) {
          console.error('❌ Error checking notifications:', error);
        }
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('❌ Basic notification test failed:', error);
      return false;
    }
  }

  getAvailableNotificationTypes() {
    return {
      urgent: [
        'NEED_TO_GO',
        'URGENT',
        'BLOCKING',
        'EMERGENCY',
        'CAR_BLOCKING',
        'PARKING_VIOLATION',
      ],
      info: [
        'FREE_TO_GO',
        'CAR_LEFT',
        'INFO',
        'STATUS_UPDATE',
        'REMINDER',
        'CONFIRMATION',
        'SUCCESS',
      ],
    };
  }

  getNotificationSoundConfig() {
    return {
      urgent: 'double_car_horn.wav',
      info: 'car_horn.wav',
    };
  }

  cleanup() {
    if (this.unsubscribeForeground) this.unsubscribeForeground();
    if (this.unsubscribeNotificationOpened) this.unsubscribeNotificationOpened();
    if (this.unsubscribeTokenRefresh) this.unsubscribeTokenRefresh();

    this.isInitialized = false;
    this.initPromise = null;
    console.log('🧹 NotificationService cleaned up');
  }
}

export default new NotificationService();