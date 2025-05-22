import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated, Dimensions, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients } from "../styles/GlobalStyle";
import styles from "../styles/SplashScreenStyles";

const { height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const [_, setAnimationPhase] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation values
  const topLeftRectAnim = useRef(new Animated.Value(0)).current;
  const topRightRectAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const bottomRectAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const carRotation = useRef(new Animated.Value(0)).current;

  // Create interpolated rotation value - simplified to just use 0-2 range
  const rotateInterpolated = carRotation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0deg", "-15deg", "0deg"],
  });

  // Navigate to login page after animation completes
  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        navigation.replace("Login");
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [animationComplete, navigation]);

  // Start animation when component mounts
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Reset animation values
    topLeftRectAnim.setValue(0);
    topRightRectAnim.setValue({ x: 0, y: 0 });
    bottomRectAnim.setValue({ x: 0, y: 0 });
    fadeAnim.setValue(0);
    carRotation.setValue(0);
    setAnimationPhase(0);
    setAnimationComplete(false);

    // Initial fade in of all rectangles
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(topLeftRectAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => startCarMovementSequence(), 300);
    });
  };

  const startCarMovementSequence = () => {
    setAnimationPhase(1);
    // Animation positions
    const initialPosition = { x: 0, y: 0 };
    const moveOutPosition = { x: 40, y: 40 };
    const finalPosition = { x: 0, y: -45 };
    
    // Full animation sequence
    Animated.sequence([
      // 1. Move bottom car out of the way with rotation
      Animated.parallel([
        Animated.timing(bottomRectAnim, {
          toValue: moveOutPosition,
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(carRotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]),
      
      // 2. Top car exits
      Animated.timing(topRightRectAnim, {
        toValue: { x: 0, y: height },
        duration: 1200,
        useNativeDriver: true,
      }),
      
      // 3. Bottom car returns to original position then moves up
      Animated.sequence([
        // Return to starting position
        Animated.parallel([
          Animated.timing(bottomRectAnim, {
            toValue: initialPosition,
            duration: 600,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
          }),
          Animated.timing(carRotation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        // Move to final position
        Animated.timing(bottomRectAnim, {
          toValue: finalPosition,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setAnimationComplete(true);
    });
  };

  // Animation styles
  const topLeftRectStyle = {
    ...styles.rectangle,
    opacity: topLeftRectAnim,
  };

  const topRightRectStyle = {
    ...styles.rectangle,
    opacity: fadeAnim,
    transform: [
      { translateX: topRightRectAnim.x },
      { translateY: topRightRectAnim.y },
    ],
  };

  const bottomRectStyle = {
    ...styles.rectangle,
    opacity: fadeAnim,
    transform: [
      { translateX: bottomRectAnim.x },
      { translateY: bottomRectAnim.y },
      { rotate: rotateInterpolated },
    ],
  };

  return (
    <LinearGradient
      colors={Gradients.orangeToPink.colors}
      style={styles.container}
      start={Gradients.orangeToPink.start}
      end={Gradients.orangeToPink.end}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>unBlock</Text>
        <View style={styles.logoContainer}>
          <View style={styles.topRow}>
            <Animated.View style={topLeftRectStyle} />
            <Animated.View style={topRightRectStyle} />
          </View>
          <View style={styles.bottomRow}>
            <Animated.View style={bottomRectStyle} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;
