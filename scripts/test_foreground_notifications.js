#!/usr/bin/env node

/**
 * Test script for RushHour foreground notifications
 * This script helps debug why notifications aren't showing when the app is open
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Testing RushHour Foreground Notifications...\n');

// Check if we're in the right directory
const currentDir = process.cwd();
const projectName = path.basename(currentDir);

if (projectName !== 'RH') {
  console.error('❌ Please run this script from the RH project root directory');
  process.exit(1);
}

console.log('🔍 Checking notification service setup...\n');

// Check notification service file
try {
  const fs = require('fs');
  const servicePath = 'src/services/NotificationService.js';
  const serviceContent = fs.readFileSync(servicePath, 'utf8');
  
  // Check for key methods
  const hasHandleForegroundMessage = serviceContent.includes('handleForegroundMessage');
  const hasOnMessage = serviceContent.includes('onMessage');
  const hasNotifee = serviceContent.includes('notifee');
  
  console.log('📱 NotificationService.js analysis:');
  console.log(`   - handleForegroundMessage method: ${hasHandleForegroundMessage ? '✅' : '❌'}`);
  console.log(`   - onMessage handler: ${hasOnMessage ? '✅' : '❌'}`);
  console.log(`   - Notifee integration: ${hasNotifee ? '✅' : '❌'}`);
  
} catch (error) {
  console.log(`❌ Error checking NotificationService.js:`, error.message);
}

console.log('\n🔍 Checking notification configuration...');

// Check notification sounds config
try {
  const fs = require('fs');
  const configPath = 'src/config/notificationSounds.js';
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check for key exports
  const hasSoundMapping = configContent.includes('NOTIFICATION_SOUND_MAPPING');
  const hasGetSoundFileName = configContent.includes('getSoundFileName');
  const hasGetSoundType = configContent.includes('getSoundType');
  
  console.log('🎵 notificationSounds.js analysis:');
  console.log(`   - Sound mapping: ${hasSoundMapping ? '✅' : '❌'}`);
  console.log(`   - getSoundFileName: ${hasGetSoundFileName ? '✅' : '❌'}`);
  console.log(`   - getSoundType: ${hasGetSoundType ? '✅' : '❌'}`);
  
} catch (error) {
  console.log(`❌ Error checking notificationSounds.js:`, error.message);
}

console.log('\n🔍 Checking Android setup...');

// Check Android manifest
try {
  const fs = require('fs');
  const manifestPath = 'android/app/src/main/AndroidManifest.xml';
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  
  const hasNotificationIcon = manifestContent.includes('notification_icon_simple');
  const hasNotificationPermission = manifestContent.includes('POST_NOTIFICATIONS');
  
  console.log('🤖 AndroidManifest.xml analysis:');
  console.log(`   - Notification icon: ${hasNotificationIcon ? '✅' : '❌'}`);
  console.log(`   - Notification permission: ${hasNotificationPermission ? '✅' : '❌'}`);
  
} catch (error) {
  console.log(`❌ Error checking AndroidManifest.xml:`, error.message);
}

console.log('\n🔍 Checking iOS setup...');

// Check iOS notification setup
try {
  const fs = require('fs');
  const appDelegatePath = 'ios/RushHour/AppDelegate.mm';
  const appDelegateContent = fs.readFileSync(appDelegatePath, 'utf8');
  
  const hasFirebase = appDelegateContent.includes('Firebase');
  const hasNotificationSetup = appDelegateContent.includes('UNUserNotificationCenter');
  
  console.log('🍎 AppDelegate.mm analysis:');
  console.log(`   - Firebase integration: ${hasFirebase ? '✅' : '❌'}`);
  console.log(`   - Notification center setup: ${hasNotificationSetup ? '✅' : '❌'}`);
  
} catch (error) {
  console.log(`❌ Error checking AppDelegate.mm:`, error.message);
}

console.log('\n📋 Debugging Steps for Foreground Notifications:');
console.log('\n1. 🔍 Check Console Logs:');
console.log('   - Look for "📨 Foreground message received:" when sending FCM');
console.log('   - Look for "🔍 Starting foreground notification handling..."');
console.log('   - Look for "🔧 Creating Android notification channel..."');
console.log('   - Look for "✅ Foreground notification displayed successfully"');

console.log('\n2. 🧪 Test Basic Notifications:');
console.log('   - Add this to your app to test basic notifications:');
console.log('   - const notificationService = new NotificationService();');
console.log('   - await notificationService.testBasicNotification();');

console.log('\n3. 🔧 Common Issues:');
console.log('   - Notification permissions not granted');
console.log('   - Android notification channels not created');
console.log('   - Notifee not properly initialized');
console.log('   - FCM foreground handler not working');

console.log('\n4. 📱 Platform-Specific:');
console.log('   - Android: Check notification channels in Settings > Apps > RushHour > Notifications');
console.log('   - iOS: Check notification permissions in Settings > RushHour > Notifications');

console.log('\n5. 🚀 Testing FCM:');
console.log('   - Send test FCM with notificationType: "FREE_TO_GO"');
console.log('   - Ensure app is in foreground (not background)');
console.log('   - Check logs for the complete notification flow');

console.log('\n🔍 For more detailed debugging, check:');
console.log('   - docs/CUSTOM_NOTIFICATION_SOUNDS.md');
console.log('   - docs/FCM_TOKEN_MANAGEMENT.md');
