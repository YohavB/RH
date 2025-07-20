import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/componentStyles/InfoFieldStyles';

/**
 * Reusable component for displaying labeled information
 * @param {string} label - Field label
 * @param {string} value - Field value
 * @param {object} style - Additional styles for the container
 */
const InfoField = ({ label, value, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};



export default InfoField; 