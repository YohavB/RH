import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import SplashAnimationService from '../services/SplashAnimationService';

/**
 * RushHourLoader
 * Animated loader using the existing SplashAnimationService.
 *
 * Props:
 * - size: number multiplier for base rectangle size (default 1)
 * - color: rectangle color (default 'white')
 * - speed: animation speed multiplier, 1 = normal, 2 = 2x faster (default 1)
 * - loop: whether to loop continuously (default true)
 * - style: optional container style override
 */
const RushHourLoader = ({ size = 1, color = 'white', speed = 1, loop = true, style }) => {
  const animationService = useRef(new SplashAnimationService()).current;
  const [animationStyles, setAnimationStyles] = React.useState({});

  useEffect(() => {
    // Override the service's timing values based on speed
    const originalTiming = Animated.timing;
    const speedAdjustedTiming = (value, config) => {
      const adjustedConfig = {
        ...config,
        duration: Math.max(50, config.duration / Math.max(0.1, speed))
      };
      return originalTiming(value, adjustedConfig);
    };

    // Temporarily replace Animated.timing with speed-adjusted version
    Animated.timing = speedAdjustedTiming;

    const startLoaderAnimation = () => {
      if (loop) {
        // For continuous looping, restart animation when it completes
        const handleComplete = () => {
          setTimeout(() => {
            if (loop) {
              startLoaderAnimation();
            }
          }, 100);
        };
        
        animationService.startAnimation(
          () => {}, // onPhaseChange not needed for loader
          handleComplete
        );
      } else {
        // Single cycle
        animationService.startAnimation(
          () => {}, // onPhaseChange not needed for loader
          () => {} // onComplete not needed for single cycle
        );
      }
    };

    startLoaderAnimation();

    // Cleanup: restore original Animated.timing
    return () => {
      Animated.timing = originalTiming;
      animationService.resetAnimationValues();
    };
  }, [speed, loop]);

  // Update animation styles when they change
  useEffect(() => {
    const updateStyles = () => {
      const styles = animationService.getAnimationStyles();
      setAnimationStyles(styles);
    };

    // Update styles immediately
    updateStyles();

    // Set up interval to update styles for smooth animation
    const interval = setInterval(updateStyles, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  const base = {
    rectWidth: 26 * size,
    rectHeight: 37 * size,
    gap: 8 * size,
  };

  const rectStyle = {
    width: base.rectWidth,
    height: base.rectHeight,
    borderRadius: 4 * size,
    backgroundColor: color,
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.topRow, { gap: base.gap, marginBottom: base.gap }]}>
        <Animated.View style={[rectStyle, animationStyles.topLeftRectStyle]} />
        <Animated.View style={[rectStyle, animationStyles.topRightRectStyle]} />
      </View>
      <View style={styles.bottomRow}>
        <Animated.View style={[rectStyle, animationStyles.bottomRectStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
  },
  bottomRow: {
    alignSelf: 'flex-end',
  },
});

export default RushHourLoader;

