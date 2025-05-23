import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../styles/GlobalStyle';

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

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: '#000',
  },
});

export default InfoField; 