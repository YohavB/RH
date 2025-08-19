# 🔔 RushHour Notifications Guide

## 🎯 Overview

This guide covers everything you need to know about notifications in RushHour, including:
- **Custom notification icons** (replaces white circles)
- **Custom notification sounds** (car horns)
- **Easy customization** of colors and designs
- **Complete setup** for both Android and iOS

## ✨ What You Get

- **Custom notification icon** instead of white circle
- **Easy color customization** with simple file edits
- **Multiple icon designs** to choose from
- **Automated customization script** for quick changes
- **Custom car horn sounds** for different notification types

## 🚀 Quick Start

### **1. Your notification icon is already set up!**
- Custom car icon with orange background
- No more white circles in notifications
- Ready to customize anytime

### **2. Test your notifications**
```bash
# Rebuild your app to see the custom icon
cd android && ./gradlew clean && cd ..
npx expo run:android
```

### **3. Customize colors instantly**
```bash
# Use the customization script
./scripts/customize_notification_icon.sh
```

## 🎨 **3 Ways to Customize Your Icon**

### **1. 🚀 Super Easy - Use the Script (Recommended)**
```bash
./scripts/customize_notification_icon.sh
```
This gives you a menu to:
- Change colors instantly
- Switch between icon designs
- See current colors
- Get rebuild instructions

### **2. 📝 Simple - Edit XML Files**
Edit `android/app/src/main/res/drawable/notification_icon_simple.xml`:
```xml
<!-- Change background color (currently #FF6B35) -->
<path
    android:fillColor="#YOUR_COLOR_HERE"
    android:pathData="..." />

<!-- Change car icon color (currently #FFFFFF) -->
<path
    android:fillColor="#YOUR_COLOR_HERE"
    android:pathData="..." />
```

### **3. ⚙️ Advanced - Full Control**
- Create your own icon designs
- Modify shapes and paths
- Add new icon variations

## 🎯 **Popular Color Themes**

| Theme | Background | Icon | Use Case |
|-------|------------|------|----------|
| **RushHour** | `#FF6B35` | `#FFFFFF` | Brand consistency |
| **Blue** | `#2196F3` | `#FFFFFF` | Professional look |
| **Green** | `#4CAF50` | `#FFFFFF` | Success/positive |
| **Purple** | `#9C27B0` | `#FFFFFF` | Creative/modern |
| **Dark** | `#333333` | `#FF6B35` | Dark theme apps |

## 🔧 **Advanced Customization**

### **Change Icon Shape**
Replace the background path data:
```xml
<!-- Square background -->
<path
    android:fillColor="#FF6B35"
    android:pathData="M2,2h20v20h-20z" />

<!-- Rounded rectangle -->
<path
    android:fillColor="#FF6B35"
    android:pathData="M2,4c0,-1.1 0.9,-2 2,-2h16c1.1,0 2,0.9 2,2v16c0,1.1 -0.9,2 -2,2H4c-1.1,0 -2,-0.9 -2,-2V4z" />

<!-- Hexagon -->
<path
    android:fillColor="#FF6B35"
    android:pathData="M12,2L22,8.5V15.5L12,22L2,15.5V8.5L12,2Z" />
```

### **Change Car Icon**
Replace the car path data with your own design:
```xml
<!-- Simple car -->
<path
    android:fillColor="#FFFFFF"
    android:pathData="M7,8h10c0.55,0 1,0.45 1,1v6c0,0.55 -0.45,1 -1,1H7c-0.55,0 -1,-0.45 -1,-1V9C6,8.45 6.45,8 7,8z" />

<!-- Car with details -->
<path
    android:fillColor="#FFFFFF"
    android:pathData="M18.92,6.01C18.72,5.42 18.16,5 17.5,5h-11c-0.66,0 -1.21,0.42 -1.42,1.01L3,12v8c0,0.55 0.45,1 1,1h1c0.55,0 1,-0.45 1,-1v-1h12v1c0,0.55 0.45,1 1,1h1c0.55,0 1,-0.45 1,-1v-8l-2.08,-5.99z" />
```

## 🎵 **Custom Notification Sounds**

### **Sound Mapping**

| Notification Type | Sound File | Use Case |
|------------------|------------|----------|
| `NEED_TO_GO` | `double_car_horn.wav` | Urgent - Car blocking you |
| `URGENT` | `double_car_horn.wav` | Urgent - Immediate action needed |
| `BLOCKING` | `double_car_horn.wav` | Urgent - You're blocking someone |
| `FREE_TO_GO` | `car_horn.wav` | Info - Car left, you can go |
| `CAR_LEFT` | `car_horn.wav` | Info - Status update |
| `INFO` | `car_horn.wav` | Info - General information |

### **How It Works**

#### **Client-Side (React Native)**
- ✅ **Permission Handling**: Requests notification permissions with sound enabled
- ✅ **Sound Mapping**: Maps notification types to appropriate sound files
- ✅ **Foreground Handling**: Logs which sound would be played for each notification type
- ✅ **Background Handling**: System automatically plays custom sounds based on server payload

#### **Server-Side (Your Backend)**
- 🔧 **Sound Configuration**: Includes custom sound file names in notification payload
- 🔧 **Platform-Specific**: Different configuration for iOS (APNS) and Android (FCM)
- 🔧 **Channel Setup**: Android notification channels for proper sound handling

### **Server-Side Implementation**

#### **Node.js with Firebase Admin SDK Example:**
```javascript
const { getMessaging } = require('firebase-admin/messaging');
const { getSoundFileName } = require('./notificationSounds');

async function sendNotification(userToken, notificationType, title, body) {
  const soundFile = getSoundFileName(notificationType);
  
  const message = {
    notification: {
      title: title,
      body: body,
      sound: soundFile, // This is crucial!
      icon: 'notification_icon_simple' // Custom icon
    },
    data: {
      notificationType: notificationType,
      sound: soundFile,
      icon: 'notification_icon_simple'
    },
    android: {
      notification: {
        sound: soundFile, // Android custom sound
        icon: 'notification_icon_simple', // Android custom icon
        channelId: 'rushhour_notifications'
      }
    },
    apns: {
      payload: {
        aps: {
          sound: soundFile, // iOS custom sound
          'mutable-content': 1 // Enable rich notifications
        }
      }
    },
    token: userToken
  };

  try {
    const response = await getMessaging().send(message);
    console.log('Notification sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}

// Usage examples:
sendNotification(userToken, 'NEED_TO_GO', 'Urgent!', 'Car is blocking you!');
sendNotification(userToken, 'FREE_TO_GO', 'Good news!', 'You are free to go!');
```

## 📱 **Testing Your Changes**

### **1. Make Changes**
Edit the XML file(s) with your desired colors/design

### **2. Rebuild App**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

### **3. Test Notification**
Send a test push notification to see your custom icon

## 🎨 **Design Tips**

### **Best Practices**
- **Contrast**: Ensure icon is visible against background
- **Size**: Keep details simple for 24dp x 24dp display
- **Colors**: Use your brand colors for consistency
- **Simplicity**: Complex designs may not render well at small sizes

### **Color Accessibility**
- **Light backgrounds**: Use dark icons
- **Dark backgrounds**: Use light icons
- **Test**: Ensure icon is visible in both light and dark themes

## 🔄 **Switch Between Icons**

### **Option 1: Update app.json**
```json
{
  "android": {
    "notification": {
      "icon": "@drawable/notification_icon_custom"
    }
  }
}
```

### **Option 2: Update AndroidManifest.xml**
```xml
<meta-data 
  android:name="com.google.firebase.messaging.default_notification_icon" 
  android:resource="@drawable/notification_icon_custom"/>
```

## 📁 **File Structure**
```
android/app/src/main/res/drawable/
├── notification_icon_simple.xml    # Full car icon
├── notification_icon_custom.xml    # Simple car silhouette
└── [your_custom_icons].xml        # Create your own!
```

## 🚨 **Troubleshooting**

### **Icon Not Showing**
1. Check XML syntax is valid
2. Verify file names match app.json/manifest
3. Clean and rebuild project
4. Check notification payload includes icon field

### **Colors Not Changing**
1. Ensure hex color format is correct (#RRGGBB)
2. Check for typos in color values
3. Verify changes were saved
4. Rebuild app after changes

### **No Sound Playing**
1. Check if sound files are properly bundled
2. Verify notification channel exists (Android)
3. Ensure `sound: true` permission is granted

### **Wrong Sound Playing**
1. Verify `notificationType` in server payload
2. Check sound file names match exactly
3. Clear app data and reinstall

## 🎉 **Quick Start Example**

Want to change to a blue theme? Here's the fastest way:

1. **Run the script:**
   ```bash
   ./scripts/customize_notification_icon.sh
   ```

2. **Choose option 2 (Blue Theme)**

3. **Rebuild your app**

4. **Enjoy your blue notification icon!**

## 📋 **Checklist**

- [ ] Icon files created in `android/app/src/main/res/drawable/`
- [ ] Android manifest updated with icon references
- [ ] Notification channel created in MainActivity
- [ ] Server payload includes icon configuration
- [ ] App rebuilt and installed
- [ ] Test notification sent
- [ ] Custom icon visible in notification
- [ ] Sound files added to `assets/sounds/`
- [ ] Server configured to send custom sound names
- [ ] Android notification channel created
- [ ] iOS sound files bundled
- [ ] Client permissions requested with `sound: true`
- [ ] Test notifications sent with different types
- [ ] Console logs showing correct sound mapping

## 🎯 **Expected Result**

After implementation, you should see:
- **Custom car icon** instead of white square
- **Orange background** with white car symbol
- **Professional appearance** in notification bar
- **Consistent branding** across all notifications
- **Single car horn** for informational notifications
- **Double car horn** for urgent notifications

## 📚 **Additional Resources**

- **Full customization guide**: `NOTIFICATION_ICON_CUSTOMIZATION.md`
- **Complete setup guide**: `NOTIFICATION_ICON_SETUP.md`
- **Script help**: Run `./scripts/customize_notification_icon.sh` and choose option 4
- **Firebase setup**: `FIREBASE_SETUP_GUIDE.md`

---

**Your notification icon is now fully customizable and will look professional instead of being a plain white circle!** 🚗✨
