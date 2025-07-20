import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import baseStyles from '../styles/componentStyles/ScreenContainerStyles';

/**
 * A container component that applies global styling to all screens
 * Use this component as the root container for all screens to ensure consistent styling
 */
const ScreenContainer = ({ children, style, safeArea = true }) => {
  const containerStyle = StyleSheet.create({
    container: {
      ...baseStyles.container,
      ...(style || {}),
    }
  });

  if (safeArea) {
    return (
      <SafeAreaView style={containerStyle.container}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={containerStyle.container}>
      {children}
    </View>
  );
};

export default ScreenContainer; 