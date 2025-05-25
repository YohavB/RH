import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { Colors, Fonts } from "../styles/GlobalStyle";
import styles from "../styles/PlateRecognitionStyles";
import {
  Countries,
  Brands,
  Colors as CarColors,
  CarDTO,
  ScreenNames,
} from "../classes/RHClasses";



const PlateRecognitionScreen = ({ navigation, route }) => {
  // Screen load logging
  useEffect(() => {
    console.log("Plate Recognition Screen Loaded");
    if (route?.params) {
      console.log("Route params:", route.params);
    }
  }, []);
  
  // Check if we're in demo environment
  const IS_DEMO = true; // Toggle this for demo/production mode
  // Get the source screen from route params
  const source = route?.params?.source || ScreenNames.PLATE_RECOGNITION;
  
  // Camera and permission states
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);

  // Recognition states
  const [detectedPlate, setDetectedPlate] = useState("");
  const [detectedCountry, setDetectedCountry] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // Animation and refs
  const scanAnimation = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        console.error("Error requesting camera permissions:", error);
        setHasPermission(false);
      }
    })();
  }, []);

  // Animate scanner line when scanning
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

  // Periodic scanning
  useEffect(() => {
    if (IS_DEMO) return;

    if (isScanning && !isProcessing && !detectedPlate) {
      const interval = setInterval(() => {
        captureHandler();
      }, 3000); // Try to detect every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isScanning, isProcessing, detectedPlate]);

  // Main capture handler
  const captureHandler = async () => {
    if (isProcessing || detectedPlate) return;

    setIsProcessing(true);

    // Take picture (or skip in demo mode)
    const photo = IS_DEMO ? null : await takePicture();
    const imageUri = photo?.uri || "";

    // Process with OCR (real or mock)
    const result = await processWithOCR(imageUri);

    if (result) {
      setDetectedPlate(result.plate);
      setDetectedCountry(result.country);
      setIsScanning(false);
    }

    setIsProcessing(false);
  };

  // Take a picture using camera
  const takePicture = async () => {
    if (!cameraRef.current || !cameraReady) {
      console.log("Camera not ready, using simulated data");
      return null;
    }

    try {
      return await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
    } catch (error) {
      console.error("Error taking picture:", error);
      return null;
    }
  };

  // Process image with OCR
  const processWithOCR = async (imageUri) => {
    setIsProcessing(true);

    try {
      if (IS_DEMO) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return {
          plate: "32-544-33",
          country: Countries.IL,
        };
      } else {
        // Production mode: Call real OCR API
        // TODO: Implement real OCR API call here
        console.log("Processing image:", imageUri);
      }
    } catch (error) {
      console.error("OCR processing error:", error);
      return null;
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // Handle using the detected plate
  const handleUseDetectedPlate = async () => {
    if (detectedPlate && detectedCountry) {
      // Show processing state
      setIsProcessing(true);
      try {
        // Get the source screen from route params
        const carInfo = await getCarInfo(detectedPlate, detectedCountry);

        // Reset the recognition screen state
        setDetectedCountry("");
        setDetectedPlate("");

        navigation.navigate(ScreenNames.USER_CARS, {
          carInfo,
          source,
        });
      } catch (error) {
        console.error("Error handling plate recognition:", error);
        Alert.alert(
          "Error",
          "Failed to process the plate information. Please try again.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Mock API call to get car info
  const getCarInfo = async (plateNumber, country) => {
    // In demo mode, return mock data after a delay
    if (IS_DEMO) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock car DTO with proper enum types and serializable date
      let car = new CarDTO(
        plateNumber,
        country,
        Brands.DACIA,
        "Sandero",
        CarColors.BLACK,
        "2025-06-01", // Changed from new Date("2025-06-01") to string
        false,
        false
      );

      return car;
    } else {
      // TODO: Replace with actual API call
      try {
        throw new Error("Failed to fetch car information");
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  };

  // Animation for scanner line movement
  const scanLineTranslateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Height of the bracket
  });

  // Main render
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />

      {hasPermission && !IS_DEMO ? (
        // Real camera in production mode
        <Camera
          ref={cameraRef}
          style={styles.camera}
          onCameraReady={() => setCameraReady(true)}
          ratio="16:9"
        >
          <CameraOverlay
            isScanning={isScanning}
            scanLineTranslateY={scanLineTranslateY}
            detectedPlate={detectedPlate}
            detectedCountry={detectedCountry}
            isProcessing={isProcessing}
            handleCancel={handleCancel}
            handleUseDetectedPlate={handleUseDetectedPlate}
            handleManualCapture={captureHandler}
          />
        </Camera>
      ) : (
        // Simulated camera view in demo mode
        <View style={styles.camera}>
          <CameraOverlay
            isScanning={isScanning}
            scanLineTranslateY={scanLineTranslateY}
            detectedPlate={detectedPlate}
            detectedCountry={detectedCountry}
            isProcessing={isProcessing}
            handleCancel={handleCancel}
            handleUseDetectedPlate={handleUseDetectedPlate}
            handleManualCapture={captureHandler}
          />
        </View>
      )}
    </View>
  );
};

// Camera overlay component (UI elements over camera)
const CameraOverlay = ({
  isScanning,
  scanLineTranslateY,
  detectedPlate,
  detectedCountry,
  isProcessing,
  handleCancel,
  handleUseDetectedPlate,
  handleManualCapture,
}) => (
  <View style={styles.overlay}>
    <View style={styles.bracketContainer}>
      <Text style={styles.bracketText}>
        Position license plate{"\n"}within bracket
      </Text>

      <View style={styles.bracket}>
        {isScanning && (
          <Animated.View
            style={[
              styles.scanLine,
              { transform: [{ translateY: scanLineTranslateY }] },
            ]}
          />
        )}
      </View>

      {/* Detection result or status */}
      {detectedPlate ? (
        <View style={styles.detectedContainer}>
          <View style={styles.countryRow}>
            <Text style={styles.detectedText}>{detectedPlate}</Text>
          </View>
          <Text style={styles.countryText}>
            Country : {detectedCountry || "Unknown"}
          </Text>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          {isProcessing ? (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="small" color={Colors.white} />
              <Text style={styles.loadingText}>Processing...</Text>
            </View>
          ) : (
            <View style={styles.processingContainer}>
              <Text style={styles.loadingText}>Detecting plate...</Text>
            </View>
          )}
        </View>
      )}
    </View>

    {/* Action buttons */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      {detectedPlate ? (
        <TouchableOpacity
          style={styles.useButton}
          onPress={handleUseDetectedPlate}
        >
          <Text style={styles.useButtonText}>Confirm</Text>
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
