# 🎨 Notification Icon Customization Guide

## 🚀 Quick Customization

### **Change Colors (Easiest)**
Edit any of these files in `android/app/src/main/res/drawable/`:

#### **1. notification_icon_simple.xml** - Full car icon
```xml
<!-- Change background color (currently #FF6B35) -->
<path
    android:fillColor="#YOUR_COLOR_HERE"
    android:pathData="M12,12m-10,0a10,10 0,1 1,20 0a10,10 0,1 1,-20 0" />

<!-- Change car icon color (currently #FFFFFF) -->
<path
    android:fillColor="#YOUR_COLOR_HERE"
    android:pathData="..." />
```

#### **2. notification_icon_custom.xml** - Simple car silhouette
```xml
<!-- Change background color (currently #FF6B35) -->
<path
    android:fillColor="#YOUR_COLOR_HERE"
    android:pathData="M12,12m-10,0a10,10 0,1 1,20 0a10,10 0,1 1,-20 0" />

<!-- Change car body color (currently #FFFFFF) -->
<path
    android:fillColor="#YOUR_COLOR_HERE"
    android:pathData="..." />

<!-- Change wheel color (currently #FFFFFF) -->
<path
    android:fillColor="#YOUR_COLOR_HERE"
    android:pathData="..." />
```

## 🎯 **Popular Color Combinations**

### **RushHour Brand Colors**
- **Background**: `#FF6B35` (Current orange)
- **Icon**: `#FFFFFF` (White)

### **Alternative Combinations**
- **Blue Theme**: Background `#2196F3`, Icon `#FFFFFF`
- **Green Theme**: Background `#4CAF50`, Icon `#FFFFFF`
- **Purple Theme**: Background `#9C27B0`, Icon `#FFFFFF`
- **Dark Theme**: Background `#333333`, Icon `#FF6B35`

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

## 🎉 **Quick Start Example**

Want to change to a blue theme? Here's the fastest way:

1. **Edit** `notification_icon_simple.xml`
2. **Change** `#FF6B35` to `#2196F3` (blue)
3. **Save** the file
4. **Rebuild** your app
5. **Test** with a notification

That's it! Your notification icon will now have a blue background with a white car icon.
