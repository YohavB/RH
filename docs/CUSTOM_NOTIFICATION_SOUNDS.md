# Custom Notification Sounds Setup

This document explains how custom notification sounds are configured for both iOS and Android platforms in the RushHour app.

## 🎵 Sound Files

The app uses two custom notification sounds:

- **`car_horn.wav`** - Standard notification sound for info/status updates
- **`double_car_horn.wav`** - Urgent notification sound for blocking/urgent situations

## 📱 Android Setup

### File Placement
Sound files are placed in: `android/app/src/main/res/raw/`

- `car_horn.wav` → `android/app/src/main/res/raw/car_horn.wav`
- `double_car_horn.wav` → `android/app/src/main/res/raw/double_car_horn.wav`

### Important Notes
- File names must be lowercase
- No dashes or spaces allowed (use underscores)
- Files must be in the `raw` folder
- No file extension needed in code (`.wav` is automatically removed)

### How It Works
Android uses notification channels with specific sounds. The `NotificationService.js` automatically:
1. Creates channels for each sound type
2. Associates the raw sound files with the channels
3. Removes the `.wav` extension when setting the sound property

## 🍎 iOS Setup

### File Placement
Sound files are placed in: `ios/RushHour/`

- `car_horn.wav` → `ios/RushHour/car_horn.wav`
- `double_car_horn.wav` → `ios/RushHour/double_car_horn.wav`

### Xcode Configuration Required
**Manual step required**: You must add these files to your Xcode project:

1. Open `ios/RushHour.xcworkspace` in Xcode
2. Drag both `.wav` files from `ios/RushHour/` into your project navigator
3. Make sure "Copy items if needed" is checked
4. Select your app target when prompted
5. Verify files appear in "Build Phases" → "Copy Bundle Resources"

### Important Notes
- Files must be included in the app bundle
- Use full filename (including `.wav` extension) in code
- Files must be added to Xcode project manually

## 🔧 Code Implementation

### NotificationService.js Updates
The service has been updated to handle both platforms correctly:

```javascript
// For iOS - use full filename
ios: {
  sound: soundFileName, // e.g., 'car_horn.wav'
}

// For Android - remove extension for channel creation
sound: soundFileName ? soundFileName.replace('.wav', '') : undefined
```

### Sound Type Mapping
Sounds are automatically selected based on notification type:

```javascript
// Urgent notifications → double_car_horn.wav
URGENT_SOUNDS: ['NEED_TO_GO', 'URGENT', 'BLOCKING', 'EMERGENCY', ...]

// Info notifications → car_horn.wav  
INFO_SOUNDS: ['FREE_TO_GO', 'CAR_LEFT', 'INFO', 'STATUS_UPDATE', ...]
```

## 🚀 Testing

### Test Notification Types
To test different sounds, send notifications with these `notificationType` values:

**Urgent Sound (double car horn):**
- `NEED_TO_GO`
- `URGENT`
- `BLOCKING`
- `EMERGENCY`

**Info Sound (single car horn):**
- `FREE_TO_GO`
- `CAR_LEFT`
- `INFO`
- `STATUS_UPDATE`

### Verification Commands
```bash
# Check setup status
./scripts/verify_sound_setup.sh

# Get iOS setup instructions
./scripts/setup_ios_sounds.sh
```

## 🔍 Troubleshooting

### Common Issues

**Android: No sound plays**
- Check files are in `android/app/src/main/res/raw/`
- Verify file names are lowercase with underscores
- Rebuild the app after adding files

**iOS: No sound plays**
- Verify files are added to Xcode project
- Check files appear in "Copy Bundle Resources"
- Clean and rebuild the project
- Ensure files are included in app target

**Both platforms: Wrong sound plays**
- Check `notificationType` values in your notification payload
- Verify sound mapping in `notificationSounds.js`

### Debug Logging
The service logs sound selection:
```
🔊 Foreground notification type "NEED_TO_GO" -> urgent sound (double_car_horn.wav)
```

## 📋 Maintenance

### Adding New Sounds
1. Place new `.wav` files in both platform folders
2. Update `notificationSounds.js` with new mappings
3. Add files to Xcode project (iOS)
4. Test with appropriate notification types

### Updating Existing Sounds
1. Replace the `.wav` files in both platform folders
2. Update Xcode project if needed (iOS)
3. Clean and rebuild both platforms

## 🎯 Summary

After this setup:
- ✅ Android: Sounds work automatically via notification channels
- ✅ iOS: Sounds work after adding files to Xcode project
- ✅ Both platforms: Automatic sound selection based on notification type
- ✅ Code: Handles platform differences automatically

The app will now provide a better user experience with contextually appropriate notification sounds!
