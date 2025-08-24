#!/bin/bash

echo "🔊 Custom Notification Sounds Setup Verification"
echo "=============================================="
echo ""

# Check Android setup
echo "📱 Android Setup Check:"
if [ -d "android/app/src/main/res/raw" ]; then
    echo "✅ Raw folder exists: android/app/src/main/res/raw/"
    
    if [ -f "android/app/src/main/res/raw/car_horn.wav" ]; then
        echo "✅ car_horn.wav found in Android raw folder"
    else
        echo "❌ car_horn.wav missing from Android raw folder"
    fi
    
    if [ -f "android/app/src/main/res/raw/double_car_horn.wav" ]; then
        echo "✅ double_car_horn.wav found in Android raw folder"
    else
        echo "❌ double_car_horn.wav missing from Android raw folder"
    fi
else
    echo "❌ Android raw folder missing: android/app/src/main/res/raw/"
fi

echo ""

# Check iOS setup
echo "🍎 iOS Setup Check:"
if [ -f "ios/RushHour/car_horn.wav" ]; then
    echo "✅ car_horn.wav found in iOS project folder"
else
    echo "❌ car_horn.wav missing from iOS project folder"
fi

if [ -f "ios/RushHour/double_car_horn.wav" ]; then
    echo "✅ double_car_horn.wav found in iOS project folder"
else
    echo "❌ double_car_horn.wav missing from iOS project folder"
fi

echo ""
echo "⚠️  Note: iOS files must also be added to Xcode project manually"
echo "   Run: ./scripts/setup_ios_sounds.sh for detailed instructions"

echo ""

# Check source sound files
echo "🎵 Source Sound Files:"
if [ -f "src/assets/sounds/car-horn.wav" ]; then
    echo "✅ car-horn.wav found in source assets"
else
    echo "❌ car-horn.wav missing from source assets"
fi

if [ -f "src/assets/sounds/car-double-horn.wav" ]; then
    echo "✅ car-double-horn.wav found in source assets"
else
    echo "❌ car-double-horn.wav missing from source assets"
fi

echo ""
echo "🔧 Configuration Check:"
if grep -q "getSoundFileName" "src/services/NotificationService.js"; then
    echo "✅ NotificationService.js updated with sound file handling"
else
    echo "❌ NotificationService.js missing sound file handling updates"
fi

echo ""
echo "📋 Next Steps:"
echo "1. For iOS: Open Xcode and add sound files to project (see setup_ios_sounds.sh)"
echo "2. For Android: Files are ready, rebuild your app"
echo "3. Test notifications with different notification types"
echo ""
echo "🎯 Your app will now play:"
echo "   - car_horn.wav for info notifications"
echo "   - double_car_horn.wav for urgent notifications"
