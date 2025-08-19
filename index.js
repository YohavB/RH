import { registerRootComponent } from "expo";
import App from "./src/App";
import { getMessaging } from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";
import { Platform } from "react-native";

// Set up background message handler using Firebase v23+ modular API
const messaging = getMessaging(getApp());
messaging.setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  
  // Play custom sound for background notifications based on type
  const notificationType = remoteMessage.data?.notificationType;
  if (notificationType) {
    console.log('🔊 Playing custom sound for background notification type:', notificationType);
    // Note: Background sound playing might be limited on some platforms
    // The system will use the default notification sound for background notifications
  }
  
  // Configure notification sound for background messages
  if (Platform.OS === 'ios') {
    // iOS will automatically play the sound based on the notification payload
    console.log('iOS background notification - sound will play automatically');
  } else {
    // For Android, the sound is controlled by the notification payload
    console.log('Android background notification - sound controlled by payload');
  }
  
  // Return a promise to indicate the message was handled
  return Promise.resolve();
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
