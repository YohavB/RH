import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Alert } from "../components/CustomAlert";
import { useSelector } from "react-redux";
import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/screenStyles/AddCarScreenStyles";
import { findOrCreateCar } from "../BE_Api/ApiManager";
import { ScreenNames } from "./ScreenNames";
import ScreenContainer from "../components/ScreenContainer";
import CameraButton from "../components/CameraButton";
import RushHourLoader from "../components/RushHourLoader";
import PlateNumberInput from '../components/PlateNumberInput';
import { APP_CONFIG } from "../config/appConfig";
import StorageManager from "../utils/StorageManager";

const AddCarScreen = ({ navigation, route }) => {
  // Screen load logging
  useEffect(() => {
    console.log("Add Car Screen Loaded");
    if (route?.params) {
      console.log("Route params:", route.params);
    }
    console.log("userInfo", userInfo);
  }, []);

  const [plateNumber, setPlateNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // Get user information from Redux store
  const { userInfo, userCars = [] } = useSelector((state) => state.user) || {};
  const userName = userInfo?.firstName;
  
  // Get the source from route params to determine navigation behavior
  const source = route.params?.source || ScreenNames.MAIN;

  // Check if user already has cars registered
  const hasRegisteredCars = userCars && userCars.length > 0;

  const isButtonDisabled =
    isLoading ||
    plateNumber.replace(/[^a-zA-Z0-9]/g, "").trim().length < 6 ||
    selectedCountry === "";

  const inputRef = useRef(null);

  // Update plateNumber if we returned from the camera screen with a detected plate
  useEffect(() => {
    if (route.params?.detectedPlate) {
      setPlateNumber(route.params.detectedPlate);
    }

    // Update country if returned from camera screen with a country
    if (route.params?.detectedCountry) {
      setSelectedCountry(route.params.detectedCountry);
    }
  }, [route.params]);

  // Load default country from storage when screen loads
  useEffect(() => {
    const loadDefaultCountry = async () => {
      try {
        const storedCountry = await StorageManager.getDefaultCountry();
        if (storedCountry !== null && selectedCountry === "") {
          setSelectedCountry(storedCountry);
          console.log("Default country loaded in AddCarScreen:", storedCountry);
        }
      } catch (error) {
        console.error("Error loading default country:", error);
      }
    };

    loadDefaultCountry();
  }, [selectedCountry]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const handleCameraPress = () => {
    dismissKeyboard();
    navigation.navigate(ScreenNames.PLATE_RECOGNITION, { 
      source: ScreenNames.ADD_CAR 
    });
  };

  const handleSubmit = async () => {
    if (!plateNumber.trim()) {
      Alert.alert("Error", "Please enter a valid plate number");
      return;
    }
    if (selectedCountry === "") {
      Alert.alert("Error", "Please select a country");
      return;
    }

    setIsLoading(true);

    // Save the selected country as default if user doesn't have one set
    try {
      const currentDefault = await StorageManager.getDefaultCountry();
      if (currentDefault === null) {
        await StorageManager.setDefaultCountry(selectedCountry);
        console.log("Default country saved:", selectedCountry);
      }
    } catch (error) {
      console.error("Error saving default country:", error);
    }

    try {
      console.log("🚗 FINDING OR CREATING CAR add car screen:", plateNumber, selectedCountry);
      const foundCar = await getCarInfo(plateNumber, selectedCountry);
      console.log("🚗 CAR INFO ADD CAR SCREEN:", foundCar);

      //reset the plate recognition screen
      setSelectedCountry("");
      setPlateNumber("");

      navigation.navigate(ScreenNames.CAR_CONFIRMATION, {
        source,
        foundCar,
      });
    } catch (error) {
      console.error("Error checking car plate:", error);
      Alert.alert(
        "Error",
        "Failed to validate your license plate. Please try again."
      );
    } finally {
      setIsLoading(false);
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

  // Navigate based on source screen
  const handleCancel = () => {
    if (source === ScreenNames.SPLASH || source === ScreenNames.LOGIN) {
      navigation.navigate(ScreenNames.MAIN);
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.contentContainer}>
          
          {hasRegisteredCars ? (
            <>
              <Text style={styles.welcomeText}>
                Adding another car?{" "}
                <Text style={styles.brandText}>{APP_CONFIG.APP_NAME}</Text> has got you
                covered.
              </Text>
            </>
          ) : (
            <>
            <Text style={styles.welcomeText}>
                Hey <Text style={[styles.brandText, {fontSize: 24}]}>{userName}</Text> !
              </Text>
              <Text style={styles.welcomeText}>
                Welcome back to{" "}
                <Text style={styles.brandText}>{APP_CONFIG.APP_NAME}</Text>.
              </Text>
            </>
          )}

          <Text style={styles.subtitle}>
            Scan or enter your country and{"\n"}
            plate number to get started.
          </Text>

          <View style={styles.cameraButtonContainer}>
            <CameraButton onPress={handleCameraPress} disabled={isLoading} />
          </View>

          <PlateNumberInput
            plateNumber={plateNumber}
            setPlateNumber={setPlateNumber}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            onSubmit={isButtonDisabled ? null : handleSubmit}
            isLoading={isLoading}
            style={styles.inputContainer}
            inputRef={inputRef}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              isButtonDisabled && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isButtonDisabled}
          >
            <Text
              style={[
                styles.submitButtonText,
                isButtonDisabled,
              ]}
            >
              Check
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <Text style={styles.loadingText}>Checking plate number...</Text>
              <RushHourLoader size={1} color={Colors.mainOrange} speed={1} loop={true} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default AddCarScreen; 