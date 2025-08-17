import { Animated, Dimensions, Easing } from "react-native";

const { height } = Dimensions.get("window");

class SplashAnimationService {
  constructor() {
    this.animationValues = {
      topLeftRectAnim: new Animated.Value(0),
      topRightRectAnim: new Animated.ValueXY({ x: 0, y: 0 }),
      bottomRectAnim: new Animated.ValueXY({ x: 0, y: 0 }),
      fadeAnim: new Animated.Value(0),
      carRotation: new Animated.Value(0),
    };
    
    this.animationPhase = 0;
    this.onAnimationComplete = null;
  }

  // Reset all animation values to initial state
  resetAnimationValues() {
    this.animationValues.topLeftRectAnim.setValue(0);
    this.animationValues.topRightRectAnim.setValue({ x: 0, y: 0 });
    this.animationValues.bottomRectAnim.setValue({ x: 0, y: 0 });
    this.animationValues.fadeAnim.setValue(0);
    this.animationValues.carRotation.setValue(0);
    this.animationPhase = 0;
  }

  // Get interpolated rotation value for car animation
  getRotateInterpolated() {
    return this.animationValues.carRotation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["0deg", "-15deg", "0deg"],
    });
  }

  // Start the complete animation sequence
  startAnimation(onPhaseChange, onComplete) {
    this.onAnimationComplete = onComplete;
    this.resetAnimationValues();
    
    // Initial fade in of all rectangles
    Animated.parallel([
      Animated.timing(this.animationValues.fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(this.animationValues.topLeftRectAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => this.startCarMovementSequence(onPhaseChange), 300);
    });
  }

  // Start the car movement sequence
  startCarMovementSequence(onPhaseChange) {
    this.animationPhase = 1;
    onPhaseChange && onPhaseChange(this.animationPhase);
    
    // Animation positions
    const initialPosition = { x: 0, y: 0 };
    const moveOutPosition = { x: 40, y: 40 };
    const finalPosition = { x: 0, y: -45 };
    
    // Full animation sequence
    Animated.sequence([
      // 1. Move bottom car out of the way with rotation
      Animated.parallel([
        Animated.timing(this.animationValues.bottomRectAnim, {
          toValue: moveOutPosition,
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(this.animationValues.carRotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]),
      
      // 2. Top car exits
      Animated.timing(this.animationValues.topRightRectAnim, {
        toValue: { x: 0, y: height },
        duration: 1200,
        useNativeDriver: true,
      }),
      
      // 3. Bottom car returns to original position then moves up
      Animated.sequence([
        // Return to starting position
        Animated.parallel([
          Animated.timing(this.animationValues.bottomRectAnim, {
            toValue: initialPosition,
            duration: 600,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
          }),
          Animated.timing(this.animationValues.carRotation, {
            toValue: 0,
            duration: 600,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
          }),
        ]),
        // Move to final position
        Animated.timing(this.animationValues.bottomRectAnim, {
          toValue: finalPosition,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(this.animationValues.topRightRectAnim, {
          toValue: { x: 0, y: 45 },
          duration: 1200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      this.onAnimationComplete && this.onAnimationComplete();
    });
  }

  // Get animation styles for the rectangles
  getAnimationStyles() {
    return {
      topLeftRectStyle: {
        opacity: this.animationValues.topLeftRectAnim,
      },
      topRightRectStyle: {
        opacity: this.animationValues.fadeAnim,
        transform: [
          { translateX: this.animationValues.topRightRectAnim.x },
          { translateY: this.animationValues.topRightRectAnim.y },
        ],
      },
      bottomRectStyle: {
        opacity: this.animationValues.fadeAnim,
        transform: [
          { translateX: this.animationValues.bottomRectAnim.x },
          { translateY: this.animationValues.bottomRectAnim.y },
          { rotate: this.getRotateInterpolated() },
        ],
      },
    };
  }

  // Get animation values for external use
  getAnimationValues() {
    return this.animationValues;
  }
}

export default SplashAnimationService; 