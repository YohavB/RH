import { registerRootComponent } from "expo";
import App from "./src/App";
import { getMessaging, setBackgroundMessageHandler } from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";
import { Platform } from "react-native";
import notifee, { AndroidImportance } from '@notifee/react-native';
import { getSoundType, getSoundFileName } from "./src/config/notificationSounds";

// Set up background message handler using Firebase v23+ modular API
const messaging = getMessaging(getApp());
setBackgroundMessageHandler(messaging, async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  
  // Extract notification data
  const notificationType = remoteMessage.data?.notificationType;
  const title = remoteMessage.notification?.title || 'New Notification';
  const body = remoteMessage.notification?.body || 'You have a new message';
  
  if (notificationType) {
    console.log('🔊 Playing custom sound for background notification type:', notificationType);
    
    try {
      // Get the appropriate sound file for this notification type
      const soundFileName = getSoundFileName(notificationType);
      const soundType = getSoundType(notificationType);
      
      console.log(`🔊 Background notification: ${notificationType} -> ${soundType} sound (${soundFileName})`);
      
      // Create Android notification channel with custom sound
      const channelId = await notifee.createChannel({
        id: soundType || 'default',
        name: `${soundType || 'Default'} Notifications`,
        sound: soundFileName.replace('.wav', ''), // Remove .wav extension for Android
        importance: AndroidImportance.HIGH,
        vibration: true,
        lights: true,
      });
      
      // Display the notification with custom sound
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
          smallIcon: 'notification_icon_simple',
          largeIcon: 'notification_icon_simple',
          color: '#FF6B35', // RushHour orange
          sound: soundFileName.replace('.wav', ''), // Remove .wav extension for Android
        },
        ios: {
          sound: soundFileName, // Use full filename for iOS
        },
      });
      
      console.log('✅ Background notification displayed with custom sound');
    } catch (error) {
      console.error('❌ Error creating background notification with custom sound:', error);
      
      // Fallback: create a basic notification without custom sound
      try {
        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
            smallIcon: 'notification_icon_simple',
            importance: AndroidImportance.HIGH,
          },
        });
        console.log('✅ Fallback notification created');
      } catch (fallbackError) {
        console.error('❌ Fallback notification also failed:', fallbackError);
      }
    }
  }
  
  // Return a promise to indicate the message was handled
  return Promise.resolve();
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
