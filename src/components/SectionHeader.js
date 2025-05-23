import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../styles/GlobalStyle';

/**
 * Reusable section header component with icon
 * @param {string} title - Section title
 * @param {React.ReactNode} icon - Icon component to display
 * @param {object} style - Custom style for the container
 */
const SectionHeader = ({ title, icon, style }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: '#000',
  },
});

export default SectionHeader; 