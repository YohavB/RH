import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../styles/GlobalStyle';

// Import SVG assets
import PhotoIcon from '../../assets/photo.svg';
import Ellipse5 from '../../assets/Ellipse 5.svg';

/**
 * A reusable camera button component with gradient background
 * @param {function} onPress - Function to call when button is pressed
 * @param {boolean} disabled - Whether the button is disabled
 * @param {object} style - Additional styles for the container
 * @param {number} size - Size of the button (default: 120)
 * @param {number} iconSize - Size of the camera icon (default: 48)
 * @param {number} ringSize - Size of the outer ring (default: 126)
 * @returns {JSX.Element}
 */
const CameraButton = ({ 
  onPress, 
  disabled = false, 
  style,
  size = 100,
  iconSize =53,
  ringSize = 100
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, style]}
      disabled={disabled}
    >
      <View style={styles.ringContainer}>
        <Ellipse5 width={ringSize} height={ringSize} />
      </View>
      <LinearGradient
        colors={Gradients.orangeToPink.colors}
        style={[styles.gradientButton, { width: size, height: size, borderRadius: size / 2 }]}
        start={Gradients.orangeToPink.start}
        end={Gradients.orangeToPink.end}
      >
        <PhotoIcon width={iconSize} height={iconSize} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: 'center',
  },
  ringContainer: {
    position: 'absolute',

  },
  gradientButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraButton; 