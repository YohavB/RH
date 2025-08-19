import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import GoogleSignInService from '../services/GoogleSignInService';
import NotificationService from '../services/NotificationService';
import { auth } from '../firebase/config';

const FirebaseTest = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = GoogleSignInService.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log('Auth state changed:', user ? user.email : 'No user');
    });

    // Get FCM token
    getFCMToken();

    return () => unsubscribe();
  }, []);

  const getFCMToken = async () => {
    try {
      const token = await NotificationService.getToken();
      setFcmToken(token);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const testGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await GoogleSignInService.signInWithGoogle();
      if (result.success) {
        Alert.alert('Success', 'Google Sign-In successful!');
        console.log('User signed in:', result.data.user.email);
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Google Sign-In failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testGoogleSignOut = async () => {
    setIsLoading(true);
    try {
      const result = await GoogleSignInService.signOutWithGoogle();
      if (result.success) {
        Alert.alert('Success', 'Signed out successfully!');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Sign out failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testNotificationService = async () => {
    try {
      const result = await NotificationService.testNotification();
      if (result) {
        Alert.alert('Success', 'Notification service is working!');
      } else {
        Alert.alert('Error', 'Notification service test failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Notification test failed: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Test Component</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Authentication Status</Text>
        <Text style={styles.status}>
          {currentUser ? `Signed in as: ${currentUser.email}` : 'Not signed in'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FCM Token</Text>
        <Text style={styles.token} numberOfLines={3}>
          {fcmToken || 'No token available'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={testGoogleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Signing In...' : 'Test Google Sign-In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={testGoogleSignOut}
          disabled={isLoading || !currentUser}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Signing Out...' : 'Test Google Sign-Out'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.infoButton]}
          onPress={testNotificationService}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
  token: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#4285F4',
  },
  secondaryButton: {
    backgroundColor: '#EA4335',
  },
  infoButton: {
    backgroundColor: '#34A853',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FirebaseTest;
