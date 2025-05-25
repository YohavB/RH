import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/AddCarScreenStyles";
import { setCarPlate, setUserCars } from "../redux/actions";
import { createOrUpdateCar, findCarByPlateNumber } from "../BE_Api/ApiCalls";
import {
  Countries,
  CarDTO,
  Brands,
  Colors as CarColors,
  ScreenNames,
} from "../classes/RHClasses";
import ScreenContainer from "../components/ScreenContainer";
import CameraButton from "../components/CameraButton";
import CountryPicker from "../components/CountryPicker";
import { isDemoMode } from "../config/env";
import PlateNumberInput from '../components/PlateNumberInput';

const AddCarScreen = ({ navigation, route }) => {
  // Screen load logging
  useEffect(() => {
    console.log("Add Car Screen Loaded");
    if (route?.params) {
      console.log("Route params:", route.params);
    }
  }, []);

  const [plateNumber, setPlateNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Get user information from Redux store
  const { userInfo, userCars } = useSelector((state) => state.user) || {};
  const userName = userInfo?.user?.name || "Ben";
  const userId = userInfo?.user?.id;

  // Check if we're in demo environment
  const IS_DEMO = true;

  const source = ScreenNames.ADD_CAR;

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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const handleCameraPress = () => {
    dismissKeyboard();
    navigation.navigate("PlateRecognition", { 
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

    try {
      const carInfo = await getCarInfo(plateNumber, selectedCountry);

      //reset the plate recognition screen
      setSelectedCountry("");
      setPlateNumber("");

      navigation.navigate("CarConfirmation", {
        carInfo,
        source,
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
    if (isDemoMode()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let car = new CarDTO(
        plateNumber,
        country,
        "DACIA",
        "Sandero",
        "Black",
        "2025-06-01",
        false,
        false
      );
      return car;
    } else {
      try {
        throw new Error("Failed to fetch car information");
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.contentContainer}>
          {hasRegisteredCars ? (
            <>
              <Text style={styles.welcomeText}>Hey {userName},</Text>
              <Text style={styles.welcomeText}>
                Adding another car?{" "}
                <Text style={styles.brandText}>unBlock</Text> has got you
                covered.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.welcomeText}>Hi {userName},</Text>
              <Text style={styles.welcomeText}>
                Welcome to
                <Text style={styles.brandText}> unBlock</Text> .
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
                isButtonDisabled && styles.submitButtonTextDisabled,
              ]}
            >
              Check
            </Text>
          </TouchableOpacity>

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={Colors.mainOrange} />
              <Text style={styles.loadingText}>Checking plate number...</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default AddCarScreen; 