import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Animated,
  Dimensions,
  Easing,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalStyle, { Gradients } from "../../utils/GlobalStyle";

// Get screen dimensions for animation calculations
const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation values
  const topLeftRectAnim = useRef(new Animated.Value(0)).current;
  const topRightRectAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const bottomRectAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const carRotation = useRef(new Animated.Value(0)).current;

  // Create interpolated rotation value
  const rotateInterpolated = carRotation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["0deg", "-15deg", "0deg", "15deg"],
  });

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
      // After initial fade in, start the car movement sequence
      setTimeout(() => startCarMovementSequence(), 300);
    });
  };

  const startCarMovementSequence = () => {
    // Phase 1: Bottom rectangle (blocking car) moves diagonally to create space
    setAnimationPhase(1);
    const initialBottomPosition = { x: 0, y: 0 };
    const tempPosition = { x: 40, y: 40 };
    const finalPosition = { x: 0, y: -45 };

    // Move bottom car away with rotation
    Animated.parallel([
      Animated.timing(bottomRectAnim, {
        toValue: tempPosition,
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(carRotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Phase 2: Top right rectangle (blocked car) exits downward
      setAnimationPhase(2);

      Animated.timing(topRightRectAnim, {
        toValue: { x: 0, y: height },
        duration: 1200,
        useNativeDriver: true,
      }).start(() => {
        // Phase 3 : Bottom car returns to starting position and immediately moves up
        setAnimationPhase(3);

        // Create a sequence that moves to original position and then immediately to final position
        Animated.sequence([
          Animated.parallel([
            Animated.timing(bottomRectAnim, {
              toValue: initialBottomPosition,
              duration: 600,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(carRotation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(carRotation, {
                toValue: 2,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.timing(bottomRectAnim, {
            toValue: finalPosition,
            duration: 500,
            useNativeDriver: true,
          })
        ]).start(() => {
          setAnimationComplete(true);
        });
      });
    });
  };

  const goToLogin = () => {
    navigation.replace("Login");
  };

  // Animation styles
  const topLeftRectStyle = {
    ...GlobalStyle.SplashRectangle,
    opacity: topLeftRectAnim,
  };

  const topRightRectStyle = {
    ...GlobalStyle.SplashRectangle,
    opacity: fadeAnim,
    transform: [
      { translateX: topRightRectAnim.x },
      { translateY: topRightRectAnim.y },
    ],
  };

  const bottomRectStyle = {
    ...GlobalStyle.SplashRectangle,
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
      style={GlobalStyle.SplashContainer}
      start={Gradients.orangeToPink.start}
      end={Gradients.orangeToPink.end}
    >
      <View style={GlobalStyle.SplashContentContainer}>
        <Text style={GlobalStyle.SplashTitle}>unBlock</Text>
        <View style={GlobalStyle.SplashLogoContainer}>
          <View style={GlobalStyle.SplashTopRow}>
            <Animated.View style={topLeftRectStyle} />
            <Animated.View style={topRightRectStyle} />
          </View>
          <View style={GlobalStyle.SplashBottomRow}>
            <Animated.View style={bottomRectStyle} />
          </View>
        </View>

        {/* Dev controls */}
        <View
          style={{
            position: "absolute",
            bottom: 40,
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={startAnimation}
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              padding: 10,
              borderRadius: 8,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: "white" }}>Replay Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToLogin}
            style={{
              backgroundColor: "rgba(255,255,255,0.3)",
              padding: 10,
              borderRadius: 8,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: "white" }}>Continue to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;
