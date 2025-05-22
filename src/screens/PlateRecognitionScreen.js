import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  ActivityIndicator,
  Dimensions,
  Platform
} from "react-native";
import { Camera } from "expo-camera";
import { Colors, Fonts } from "../styles/GlobalStyle";
import styles from "../styles/PlateRecognitionStyles";
import { useDispatch } from "react-redux";
import { setCarPlate } from "../redux/actions";

// Real camera implementation with fallback to simulation
const PlateRecognitionScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [detectedPlate, setDetectedPlate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [useSimulation, setUseSimulation] = useState(true); // Start with simulation by default
  const scanAnimation = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);
  const dispatch = useDispatch();
  
  // Request camera permissions
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
        // Even if we have permission, start with simulation for now
        // since we're having camera type issues
        setUseSimulation(true);
      } catch (error) {
        console.error("Error requesting camera permissions:", error);
        setHasPermission(false);
        setUseSimulation(true);
      }
    })();
  }, []);

  // Animate scanner line
  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanAnimation.stopAnimation();
    }
    
    return () => scanAnimation.stopAnimation();
  }, [isScanning]);
  
  // Simulate periodic scanning
  useEffect(() => {
    if (isScanning && !isProcessing && !detectedPlate) {
      const interval = setInterval(() => {
        // Only use simulation for now until camera issues are fixed
        simulateCapture();
      }, 3000); // Try to detect every 3 seconds
      
      return () => clearInterval(interval);
    }
  }, [isScanning, isProcessing, detectedPlate]);

  // Take a picture with real camera
  const capturePicture = async () => {
    if (cameraRef.current && !isProcessing && cameraReady) {
      try {
        setIsProcessing(true);
        
        // Take picture
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        
        console.log("Photo taken:", photo.uri);
        
        // For now, just simulate processing the image
        processImage(photo.uri);
      } catch (error) {
        console.error("Error capturing picture:", error);
        setIsProcessing(false);
        // Fall back to simulation if camera fails
        simulateCapture();
      }
    } else {
      simulateCapture();
    }
  };
  
  // Process the captured image (for now just simulated OCR)
  const processImage = (imageUri) => {
    // In a real app, this would send the image to an OCR service
    // For now, we'll just simulate detection after a delay
    
    setTimeout(() => {
      // 70% chance of detecting a plate
      const success = Math.random() > 0.3;
      
      if (success) {
        setDetectedPlate("552-16-503");
        setIsScanning(false);
      } else {
        setIsProcessing(false);
      }
    }, 1500);
  };

  // Simulate taking a picture and processing it (fallback)
  const simulateCapture = () => {
    if (!isProcessing) {
      setIsProcessing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        // 70% chance of detecting a plate after processing
        const success = Math.random() > 0.3;
        
        if (success) {
          setDetectedPlate("552-16-503");
          setIsScanning(false);
        } else {
          setIsProcessing(false);
        }
      }, 1500);
    }
  };

  const handleUseDetectedPlate = () => {
    if (detectedPlate) {
      // Add the detected plate to Redux
      dispatch(setCarPlate(detectedPlate));
      
      // Navigate back to Welcome screen with the detected plate
      navigation.navigate("Welcome", { detectedPlate });
    }
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const handleManualCapture = () => {
    setIsProcessing(true);
    // Always use simulation for now
    simulateCapture();
  };

  // Animation for scanner line movement
  const scanLineTranslateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Height of the bracket
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />
      
      {/* Camera view container */}
      <View style={styles.cameraContainer}>
        {/* Always use simulation for now due to camera issues */}
        <View style={styles.camera}>
          <CameraOverlay 
            isScanning={isScanning}
            scanLineTranslateY={scanLineTranslateY}
            detectedPlate={detectedPlate}
            isProcessing={isProcessing}
            handleCancel={handleCancel}
            handleUseDetectedPlate={handleUseDetectedPlate}
            handleManualCapture={handleManualCapture}
          />
        </View>
      </View>
    </View>
  );
};

// Extract overlay UI to a separate component to avoid duplication
const CameraOverlay = ({ 
  isScanning, 
  scanLineTranslateY, 
  detectedPlate, 
  isProcessing, 
  handleCancel, 
  handleUseDetectedPlate,
  handleManualCapture
}) => (
  <View style={styles.overlay}>
    <Text style={styles.headerText}>
      Position license plate{"\n"}within bracket
    </Text>
    
    <View style={styles.bracketContainer}>
      <View style={styles.bracket}>
        {/* Animated scan line */}
        {isScanning && (
          <Animated.View 
            style={[
              styles.scanLine,
              {
                transform: [{ translateY: scanLineTranslateY }],
              }
            ]}
          />
        )}
      </View>
    </View>
    
    {detectedPlate ? (
      <View style={styles.detectedContainer}>
        <Text style={styles.detectedText}>{detectedPlate}</Text>
      </View>
    ) : (
      <View style={styles.loadingContainer}>
        {isProcessing ? (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="small" color={Colors.white} />
            <Text style={styles.processingText}>Processing...</Text>
          </View>
        ) : (
          <Text style={styles.loadingText}>
            Detecting plate...
          </Text>
        )}
      </View>
    )}
    
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={handleCancel}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      
      {detectedPlate ? (
        <TouchableOpacity 
          style={styles.useButton} 
          onPress={handleUseDetectedPlate}
        >
          <Text style={styles.useButtonText}>Check</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={[styles.useButton, isProcessing && styles.disabledButton]} 
          onPress={handleManualCapture}
          disabled={isProcessing}
        >
          <Text style={styles.useButtonText}>Capture</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default PlateRecognitionScreen; 