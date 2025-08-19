import { initializeApp, getApps, getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getMessaging } from '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCTk0uX6U_vABHf-hGaVSNhj2HRWPaNELc",
  authDomain: "rushhour-yohavb.firebaseapp.com",
  databaseURL: "https://rushhour-yohavb-default-rtdb.firebaseio.com",
  projectId: "rushhour-yohavb",
  storageBucket: "rushhour-yohavb.appspot.com",
  messagingSenderId: "864165576083",
  appId: "1:864165576083:web:ee873bd1234c0deb7eba61ce",
};

// Initialize Firebase if not already initialized
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

// Export the Firebase service instances using the new modular v23+ API
// Use getApp() and getXxx() functions for the new API pattern
export { getApp, getAuth, getMessaging };
