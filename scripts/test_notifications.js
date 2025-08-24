#!/usr/bin/env node

/**
 * Test script for RushHour notification service
 * Run this script to test notification channels and custom sounds
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Testing RushHour Notification Service...\n');

// Check if we're in the right directory
const currentDir = process.cwd();
const projectName = path.basename(currentDir);

if (projectName !== 'RH') {
  console.error('❌ Please run this script from the RH project root directory');
  process.exit(1);
}

console.log('📱 Checking Android sound files...');

// Check if sound files exist in the correct locations
const androidRawPath = 'android/app/src/main/res/raw';
const soundFiles = ['car_horn.wav', 'double_car_horn.wav'];

let allFilesExist = true;
soundFiles.forEach(file => {
  try {
    const fs = require('fs');
    const filePath = path.join(androidRawPath, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${file} exists (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`❌ ${file} missing from ${androidRawPath}`);
      allFilesExist = false;
    }
  } catch (error) {
    console.log(`❌ Error checking ${file}:`, error.message);
    allFilesExist = false;
  }
});

console.log('\n📱 Checking iOS sound files...');

const iosPath = 'ios/RushHour';
soundFiles.forEach(file => {
  try {
    const fs = require('fs');
    const filePath = path.join(iosPath, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${file} exists (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`❌ ${file} missing from ${iosPath}`);
      allFilesExist = false;
    }
  } catch (error) {
    console.log(`❌ Error checking ${file}:`, error.message);
    allFilesExist = false;
  }
});

console.log('\n🔧 Checking notification configuration...');

// Check if notificationSounds.js exists and has correct exports
try {
  const fs = require('fs');
  const configPath = 'src/config/notificationSounds.js';
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check for key exports
  const hasSoundMapping = configContent.includes('NOTIFICATION_SOUND_MAPPING');
  const hasSoundFiles = configContent.includes('SOUND_FILES');
  const hasGetSoundFileName = configContent.includes('getSoundFileName');
  
  console.log(`✅ notificationSounds.js exists`);
  console.log(`   - Sound mapping: ${hasSoundMapping ? '✅' : '❌'}`);
  console.log(`   - Sound files: ${hasSoundFiles ? '✅' : '❌'}`);
  console.log(`   - Helper functions: ${hasGetSoundFileName ? '✅' : '❌'}`);
  
} catch (error) {
  console.log(`❌ Error checking notificationSounds.js:`, error.message);
}

console.log('\n📋 Next steps to test custom sounds:');
console.log('1. Build and run the app on a device (not simulator)');
console.log('2. Grant notification permissions when prompted');
console.log('3. Send a test FCM notification with notificationType: "FREE_TO_GO"');
console.log('4. Check the logs for custom sound playback');

if (!allFilesExist) {
  console.log('\n⚠️  Some sound files are missing. Please ensure all sound files are in place.');
  console.log('   Run: ./scripts/setup_ios_sounds.sh to set up iOS sounds');
  console.log('   Verify Android sounds are in: android/app/src/main/res/raw/');
} else {
  console.log('\n✅ All sound files are in place!');
}

console.log('\n🔍 For debugging, check the logs for:');
console.log('   - "🔊 Background notification: FREE_TO_GO -> info sound (car_horn.wav)"');
console.log('   - "✅ Background notification displayed with custom sound"');
console.log('   - "✅ Default Android notification channel created"');

console.log('\n📚 Documentation: docs/CUSTOM_NOTIFICATION_SOUNDS.md');
