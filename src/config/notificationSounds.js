// Configuration for notification sounds based on notification type
export const NOTIFICATION_SOUND_MAPPING = {
  // Urgent/Blocking notifications - Double car horn (more attention-grabbing)
  URGENT_SOUNDS: [
    'NEED_TO_GO',
    'URGENT', 
    'BLOCKING',
    'EMERGENCY',
    'CAR_BLOCKING',
    'PARKING_VIOLATION',
    'TOWING_NOTICE',
    'IMMEDIATE_ACTION_REQUIRED'
  ],
  
  // Info/Status notifications - Single car horn (standard notification)
  INFO_SOUNDS: [
    'FREE_TO_GO',
    'CAR_LEFT',
    'INFO',
    'STATUS_UPDATE',
    'REMINDER',
    'CONFIRMATION',
    'SUCCESS',
    'CAR_ADDED',
    'CAR_REMOVED',
    'SETTINGS_UPDATED'
  ]
};

// Sound file names (these should match the files in your assets/sounds folder)
export const SOUND_FILES = {
  CAR_HORN: 'car_horn.wav',
  DOUBLE_CAR_HORN: 'double_car_horn.wav'
};

// Icon configuration for notifications
export const NOTIFICATION_ICONS = {
  ANDROID: 'notification_icon_simple', // Android drawable resource name (matches AndroidManifest.xml)
  IOS: 'notification_icon' // iOS asset name
};

// Helper function to determine sound type
export const getSoundType = (notificationType) => {
  if (NOTIFICATION_SOUND_MAPPING.URGENT_SOUNDS.includes(notificationType)) {
    return 'urgent'; // Will play double car horn
  }
  return 'info'; // Will play single car horn
};

// Helper function to get sound file name
export const getSoundFileName = (notificationType) => {
  const soundType = getSoundType(notificationType);
  return soundType === 'urgent' ? SOUND_FILES.DOUBLE_CAR_HORN : SOUND_FILES.CAR_HORN;
};

// Server-side notification payload configuration guide
export const SERVER_PAYLOAD_CONFIG = {
  // For urgent notifications (double car horn)
  urgent: {
    notification: {
      title: "Urgent Notification",
      body: "This requires immediate attention",
      sound: "double_car_horn.wav", // Custom sound file
      icon: NOTIFICATION_ICONS.ANDROID // Custom icon
    },
    data: {
      notificationType: "NEED_TO_GO",
      sound: "double_car_horn.wav",
      icon: NOTIFICATION_ICONS.ANDROID
    },
    android: {
      notification: {
        sound: "double_car_horn.wav", // Android custom sound
        icon: NOTIFICATION_ICONS.ANDROID, // Android custom icon
        channelId: 'rushhour_notifications' // Make sure this channel exists
      }
    },
    apns: {
      payload: {
        aps: {
          sound: "double_car_horn.wav", // iOS custom sound
          'mutable-content': 1 // Enable rich notifications
        }
      }
    }
  },
  
  // For info notifications (single car horn)
  info: {
    notification: {
      title: "Info Notification", 
      body: "This is informational",
      sound: "car_horn.wav", // Custom sound file
      icon: NOTIFICATION_ICONS.ANDROID // Custom icon
    },
    data: {
      notificationType: "FREE_TO_GO",
      sound: "car_horn.wav",
      icon: NOTIFICATION_ICONS.ANDROID
    },
    android: {
      notification: {
        sound: "car_horn.wav", // Android custom sound
        icon: NOTIFICATION_ICONS.ANDROID, // Android custom icon
        channelId: 'rushhour_notifications' // Make sure this channel exists
      }
    },
    apns: {
      payload: {
        aps: {
          sound: "car_horn.wav", // iOS custom sound
          'mutable-content': 1 // Enable rich notifications
        }
      }
    }
  }
};

// Example server-side code for sending notifications with custom sounds and icons:
/*
// Node.js example with Firebase Admin SDK
const message = {
  notification: {
    title: 'Car Alert',
    body: 'You are free to go!',
    sound: getSoundFileName(notificationType), // 'car_horn.wav' or 'double_car_horn.wav'
    icon: NOTIFICATION_ICONS.ANDROID // Custom icon
  },
  data: {
    notificationType: notificationType,
    sound: getSoundFileName(notificationType),
    icon: NOTIFICATION_ICONS.ANDROID
  },
  android: {
    notification: {
      sound: getSoundFileName(notificationType), // Android custom sound
      icon: NOTIFICATION_ICONS.ANDROID, // Android custom icon
      channelId: 'rushhour_notifications' // Make sure this channel exists
    }
  },
  apns: {
    payload: {
      aps: {
        sound: getSoundFileName(notificationType), // iOS custom sound
        'mutable-content': 1 // Enable rich notifications
      }
    }
  },
  token: userFCMToken
};
*/
