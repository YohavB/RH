/** @format */

import React, { useState, useEffect, useRef } from "react";
import { View, Text, StatusBar } from "react-native";
import { Alert } from "../components/CustomAlert";
import { Camera, useCameraDevices, useCameraPermission } from "react-native-vision-camera";
import styles from "../styles/screenStyles/PlateRecognitionStyles";
import { ScreenNames } from "./ScreenNames";
import { findOrCreateCar } from "../BE_Api/ApiManager";
import * as FileSystem from "expo-file-system";
import CameraOverlay from "../components/CameraOverlay";
import { Colors } from "../styles/GlobalStyle";
import RushHourLoader from "../components/RushHourLoader";

const PlateRecognitionScreen = ({ navigation, route }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [deviceCamera, setDeviceCamera] = useState(null);
  const [detectedPlate, setDetectedPlate] = useState("");
  const [detectedCountry, setDetectedCountry] = useState("");
  const [isFindingCar, setIsFindingCar] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const { hasPermission, requestPermission } = useCameraPermission();

  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const source = route?.params?.source || ScreenNames.PLATE_RECOGNITION;
  // Screen load logging
  useEffect(() => {
    console.log("📱 PlateRecognitionScreen: Screen Loaded");
    console.log("📱 PlateRecognitionScreen: Getting camera permissions and devices...");
    if (route?.params) {
      console.log("📱 PlateRecognitionScreen: Route params:", route.params);
    }
    getBackCamera(devices);
  }, []);

  //Scanning Flag
  useEffect(() => {
    if (isFindingCar || detectedPlate || !deviceCamera) {
      setIsScanning(false);
    } else {
      setIsScanning(true);
    }
  }, [isFindingCar, detectedPlate, deviceCamera]);

  // Periodic scanning
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        capturePhoto();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        console.log("📱 PlateRecognitionScreen: No permission, requesting...");
        try {
          const permissionResult = await requestPermission();
          console.log("📱 PlateRecognitionScreen: Permission request result:", permissionResult);
          setCameraReady(permissionResult);
        } catch (error) {
          console.error("📱 PlateRecognitionScreen: Error requesting permission:", error);
        }
      } else {
        console.log("📱 PlateRecognitionScreen: Already have camera permission");
        setCameraReady(true);
      }
    })();
  }, [hasPermission]);

  const getBackCamera = (devices) => {
    let device = null;
    if (devices && typeof devices === "object") {
      if (Array.isArray(devices)) {
        // If devices is an array, find the back camera
        device = devices.find((d) => d.position === "back");
        console.log("📱 PlateRecognitionScreen: Devices is array, found back device:", !!device);
      } else {
        // If devices is an object with back/front properties
        device = devices.back;
        console.log("📱 PlateRecognitionScreen: Devices is object, using devices.back");
      }
    }
    setDeviceCamera(device);
  };

   // Enhanced captureHandler with cache clearing after processing
   const capturePhoto = async () => {
    if (isFindingCar || detectedPlate || !cameraRef.current || !cameraReady) {
      console.log("📱 PlateRecognitionScreen: Capture photo not allowed");
      console.log("📱 PlateRecognitionScreen: isFindingCar should be false:", isFindingCar);
      console.log("📱 PlateRecognitionScreen: detectedPlate should be empty:", detectedPlate.length === 0);
      console.log("📱 PlateRecognitionScreen: cameraRef.current should not be null:", cameraRef.current !== null);
      console.log("📱 PlateRecognitionScreen: cameraReady should be true:", cameraReady);
      return;
    }

    try {
      console.log("📱 PlateRecognitionScreen: Taking photo...");

      const photo = await cameraRef.current.takePhoto({ quality: 80, skipProcessing: false });

      console.log("📱 PlateRecognitionScreen: Photo taken:", photo.path);

      const photoProcessingResult = await photoProcessing(photo);

      // console.log("📱 PlateRecognitionScreen: Car has been detected, clearing cache");
      // clearPhotoAsync(photo.path);

      if (photoProcessingResult) {
        setDetectedPlate(photoProcessingResult.plate);
        setDetectedCountry(photoProcessingResult.country);
      }
    } catch (error) {
      console.error("📱 PlateRecognitionScreen: Capture error:", error);
    }
  };

  const photoProcessing = async (photo) => {
    console.log("📱 PlateRecognitionScreen: Processing photo...");
    const ocrResult = null;
    console.log("📱 PlateRecognitionScreen: OCR result:", ocrResult);
    return ocrResult;
  };

  const clearPhotoAsync = async (filePath) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    FileSystem.deleteAsync(filePath, { idempotent: true })
      .then(() => console.log("🧹 Deleted photo file:", filePath))
      .catch((error) => console.log("🧹 Error deleting file:", filePath, error));
  };

  const processDetectedCar = async () => {
    console.log("📱 PlateRecognitionScreen: Using detected plate, clearing cache and navigating");
    if (detectedPlate && detectedCountry) {
      setIsFindingCar(true);
      try {
        const foundCar = await getCarInfo(detectedPlate, detectedCountry);

        setDetectedCountry("");
        setDetectedPlate("");

        navigation.navigate(ScreenNames.CAR_CONFIRMATION, { source, foundCar });
      } catch (error) {
        console.error("Error handling plate recognition:", error);
        Alert.alert("Error", "Failed to process the plate information. Please try again.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } finally {
        setIsFindingCar(false);
      }
    }
  };

  const getCarInfo = async (plateNumber, country) => {
    try {
      const car = await findOrCreateCar(plateNumber, country);
      return car;
    } catch (error) {
      console.error("API error:", error);
      throw new Error("Failed to fetch car information");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />

      {hasPermission && deviceCamera ? (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={deviceCamera}
          isActive={true}
          photo={true}
          onError={(error) => {
            console.error("📱 PlateRecognitionScreen: Camera error:", error);
          }}
        ></Camera>
      ) : (
        // Fallback view when camera permission is not granted, device not available
        <View style={styles.camera}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            {!hasPermission
              ? "Camera permission not granted"
              : !deviceCamera
              ? "Camera not available"
              : "Camera not available"}
          </Text>
        </View>
      )}

      <CameraOverlay
        isScanning={isScanning}
        isFindingCar={isFindingCar}
        detectedPlate={detectedPlate}
        detectedCountry={detectedCountry}
        handleCancel={handleCancel}
        capturePhoto={capturePhoto}
        processDetectedCar={processDetectedCar}
      />

      {isFindingCar && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Processing...</Text>
          <RushHourLoader size={0.7} color={Colors.white} speed={1.2} loop={true} />
        </View>
      )}
    </View>
  );
};

export default PlateRecognitionScreen;
