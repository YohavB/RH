import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import NotificationService from '../services/NotificationService';
import { Colors } from '../styles/GlobalStyle';

const NotificationTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (message, isSuccess = true) => {
    setTestResults(prev => [...prev, {
      id: Date.now(),
      message,
      isSuccess,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testBasicNotification = async () => {
    setIsLoading(true);
    try {
      addTestResult('🧪 Testing basic notification...', true);
      
      const result = await NotificationService.testBasicNotification();
      
      if (result) {
        addTestResult('✅ Basic notification test passed!', true);
        Alert.alert('Success', 'Basic notification test passed! Check your notification area.');
      } else {
        addTestResult('❌ Basic notification test failed!', false);
        Alert.alert('Error', 'Basic notification test failed! Check console logs.');
      }
    } catch (error) {
      addTestResult(`❌ Basic notification error: ${error.message}`, false);
      console.error('Basic notification test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testNotificationChannels = async () => {
    setIsLoading(true);
    try {
      addTestResult('🔧 Testing notification channels...', true);
      
      const result = await NotificationService.testNotificationChannels();
      
      if (result) {
        addTestResult('✅ Notification channels test passed!', true);
        Alert.alert('Success', 'Notification channels test passed! Check console logs.');
      } else {
        addTestResult('❌ Notification channels test failed!', false);
        Alert.alert('Error', 'Notification channels test failed! Check console logs.');
      }
    } catch (error) {
      addTestResult(`❌ Channel test error: ${error.message}`, false);
      console.error('Channel test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testCustomNotification = async () => {
    setIsLoading(true);
    try {
      addTestResult('🎵 Testing custom notification with sound...', true);
      
      const result = await NotificationService.testNotification();
      
      if (result) {
        addTestResult('✅ Custom notification test passed!', true);
        Alert.alert('Success', 'Custom notification test passed! You should hear car horn sounds.');
      } else {
        addTestResult('❌ Custom notification test failed!', false);
        Alert.alert('Error', 'Custom notification test failed! Check console logs.');
      }
    } catch (error) {
      addTestResult(`❌ Custom notification error: ${error.message}`, false);
      console.error('Custom notification test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testForegroundMessage = async () => {
    setIsLoading(true);
    try {
      addTestResult('📨 Testing foreground message handling...', true);
      
      // Simulate a foreground message
      const mockMessage = {
        data: {
          notificationType: 'FREE_TO_GO'
        },
        notification: {
          title: '🧪 Test Foreground Message',
          body: 'This simulates an FCM message received while app is open'
        }
      };
      
      // Call the foreground handler directly
      await NotificationService.handleForegroundMessage(mockMessage);
      
      addTestResult('✅ Foreground message test completed!', true);
      Alert.alert('Success', 'Foreground message test completed! Check if notification appeared.');
      
    } catch (error) {
      addTestResult(`❌ Foreground message error: ${error.message}`, false);
      console.error('Foreground message test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkNotificationStatus = async () => {
    setIsLoading(true);
    try {
      addTestResult('🔍 Checking notification status...', true);
      
      // Check if notification service is initialized
      if (NotificationService.isInitialized) {
        addTestResult('✅ Notification service is initialized', true);
      } else {
        addTestResult('❌ Notification service is NOT initialized', false);
      }
      
      // Check current notifications
      const notifications = await NotificationService.notifee?.getDisplayedNotifications();
      addTestResult(`📋 Current displayed notifications: ${notifications?.length || 0}`, true);
      
      // Check channels
      const channels = await NotificationService.notifee?.getChannels();
      addTestResult(`🔧 Available channels: ${channels?.length || 0}`, true);
      
      Alert.alert('Status Check', 'Notification status check completed! Check the results below.');
      
    } catch (error) {
      addTestResult(`❌ Status check error: ${error.message}`, false);
      console.error('Status check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧪 Notification Test Panel</Text>
      <Text style={styles.subtitle}>Use this to debug notification issues</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={testBasicNotification}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Basic Notification</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={testNotificationChannels}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Notification Channels</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={testCustomNotification}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Custom Sound Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={testForegroundMessage}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Foreground Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.infoButton]} 
          onPress={checkNotificationStatus}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Check Notification Status</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearResults}
        >
          <Text style={styles.buttonText}>Clear Results</Text>
        </TouchableOpacity>
      </View>
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Testing...</Text>
        </View>
      )}
      
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Test Results:</Text>
        {testResults.map((result) => (
          <View key={result.id} style={[styles.resultItem, { backgroundColor: result.isSuccess ? '#e8f5e8' : '#ffe8e8' }]}>
            <Text style={[styles.resultText, { color: result.isSuccess ? '#2e7d32' : '#c62828' }]}>
              {result.message}
            </Text>
            <Text style={styles.resultTimestamp}>{result.timestamp}</Text>
          </View>
        ))}
        {testResults.length === 0 && (
          <Text style={styles.noResults}>No test results yet. Run a test to see results here.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.textDark,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.textLight,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: Colors.mainOrange,
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  infoButton: {
    backgroundColor: '#4CAF50',
  },
  clearButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.mainOrange,
    fontWeight: '600',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.textDark,
  },
  resultItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: Colors.mainOrange,
  },
  resultText: {
    fontSize: 14,
    marginBottom: 5,
  },
  resultTimestamp: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  noResults: {
    textAlign: 'center',
    color: Colors.textLight,
    fontStyle: 'italic',
    padding: 20,
  },
});

export default NotificationTest;
