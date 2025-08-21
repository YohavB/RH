/** @format */

import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "../styles/componentStyles/CameraOverlayStyles";

// Camera overlay component (UI elements over camera)
const CameraOverlay = ({
  isScanning,
  isFindingCar,
  detectedPlate,
  detectedCountry,
  handleCancel,
  capturePhoto,
  processDetectedCar,
}) => {
  const scanAnimation = useRef(new Animated.Value(0)).current;

  const scanLineTranslateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Height of the bracket
  });

  // Scanning Animation
  useEffect(() => {
    if (isScanning) {
      console.log("📱 PlateRecognitionScreen: Scanning Animation Starting");
      Animated.loop(
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isScanning]);

  return (
    <View style={styles.overlay}>
      <View style={styles.bracketContainer}>
        <Text style={styles.bracketText}>Position license plate{"\n"}within bracket</Text>

        <View style={styles.bracket}>
          {isScanning && (
            <Animated.View
              style={[styles.scanLine, { transform: [{ translateY: scanLineTranslateY }] }]}
            />
          )}
        </View>

        {/* Detection result or status */}
        {detectedPlate && (
          <View style={styles.detectedContainer}>
            <View style={styles.countryRow}>
              <Text style={styles.detectedText}>{detectedPlate}</Text>
            </View>
            <Text style={styles.countryText}>Country : {detectedCountry || "Unknown"}</Text>
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {detectedPlate ? (
          <TouchableOpacity style={styles.useButton} onPress={processDetectedCar}>
            <Text style={styles.useButtonText}>Confirm</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.useButton, isFindingCar && styles.disabledButton]}
            onPress={capturePhoto}
            disabled={isFindingCar}
          >
            <Text style={styles.useButtonText}>Capture</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CameraOverlay;
