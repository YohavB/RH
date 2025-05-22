import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CameraButton from './CameraButton';

/**
 * Examples of using the CameraButton component with different props
 * This is just for documentation purposes
 */
const CameraButtonExamples = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Button Examples</Text>
      
      <View style={styles.example}>
        <Text style={styles.label}>Default (size 120)</Text>
        <CameraButton onPress={() => console.log('Default button pressed')} />
      </View>

      <View style={styles.example}>
        <Text style={styles.label}>Small (size 80)</Text>
        <CameraButton 
          onPress={() => console.log('Small button pressed')} 
          size={80}
          iconSize={32}
          ringSize={86}
        />
      </View>
      
      <View style={styles.example}>
        <Text style={styles.label}>Large (size 160)</Text>
        <CameraButton 
          onPress={() => console.log('Large button pressed')} 
          size={160}
          iconSize={64}
          ringSize={166}
        />
      </View>
      
      <View style={styles.example}>
        <Text style={styles.label}>Disabled</Text>
        <CameraButton 
          onPress={() => console.log('This should not be logged')} 
          disabled={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  example: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CameraButtonExamples; 