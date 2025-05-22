import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import GlobalStyle, { Colors } from '../styles/GlobalStyle';

/**
 * A container component that applies global styling to all screens
 * Use this component as the root container for all screens to ensure consistent styling
 */
const ScreenContainer = ({ children, style, safeArea = true }) => {
  if (safeArea) {
    return (
      <SafeAreaView style={[GlobalStyle.container, style]}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={[GlobalStyle.container, style]}>
      {children}
    </View>
  );
};

export default ScreenContainer; 