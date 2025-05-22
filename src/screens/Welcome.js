import React, { useState, useRef, useEffect } from "react";
import { Text, View, TextInput, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/WelcomeStyles";
import { setCarPlate, setUserCars } from "../redux/actions";
import { createOrUpdateCar } from "../BE_Api/ApiCalls";
import ScreenContainer from "../components/ScreenContainer";
import CameraButton from "../components/CameraButton";

const Welcome = ({ navigation, route }) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { userInfo } = useSelector((state) => state.user) || {};
  const userName = userInfo?.user?.name || "Ben";
  const userId = userInfo?.user?.id;

  const isButtonDisabled = isLoading || plateNumber.replace(/[^a-zA-Z0-9]/g, '').trim().length < 6;
  
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // Update plateNumber if we returned from the camera screen with a detected plate
  useEffect(() => {
    if (route.params?.detectedPlate) {
      setPlateNumber(route.params.detectedPlate);
    }
  }, [route.params?.detectedPlate]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };

  const handleCameraPress = () => {
    // First dismiss the keyboard if it's open
    dismissKeyboard();
    
    // Navigate to the plate recognition screen
    navigation.navigate("PlateRecognition");
  };

  const handlePlateSubmit = async () => {
    // Validate plate number
    if (!plateNumber.trim()) {
      Alert.alert("Error", "Please enter a valid plate number");
      return;
    }

    setIsLoading(true);

    try {
      // Save plate number in Redux
      dispatch(setCarPlate(plateNumber));

      // In a real app, we would register the car with the API
      // For demo purposes, we'll use a mock approach
      console.log("Registering car with plate:", plateNumber);

      // Mock successful car registration
      const mockRegisteredCar = {
        id: Math.floor(Math.random() * 1000),
        plateNumber: plateNumber.toUpperCase(),
        userId: userId,
      };

      // Update Redux with the registered car
      dispatch(setUserCars([mockRegisteredCar]));

      // Navigate to Main screen
      navigation.replace("Main");
    } catch (error) {
      console.error("Error registering car:", error);
      Alert.alert("Error", "Failed to register your car. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.welcomeText}>
              Hi {userName},
            </Text>
            <Text style={styles.welcomeText}>
              Welcome to 
              <Text style={styles.brandText}> unBlock</Text> .
            </Text>
          </View>

          <Text style={styles.subtitle}>
            Scan or enter your license{"\n"}
            plate to get started.
          </Text>

          <View style={styles.cameraButtonContainer}>
            <CameraButton onPress={handleCameraPress} disabled={isLoading} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                isFocused && styles.inputFocused,
              ]}
              placeholder="Plate number"
              placeholderTextColor="#888"
              value={plateNumber}
              onChangeText={setPlateNumber}
              onSubmitEditing={handlePlateSubmit}
              keyboardType="default"
              autoCapitalize="characters"
              editable={!isLoading}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
              }}
              ref={inputRef}
            />
          </View>
           
          <TouchableOpacity 
            style={[
              styles.submitButton,
              isButtonDisabled && styles.submitButtonDisabled
            ]}
            onPress={handlePlateSubmit}
            disabled={isButtonDisabled}
          >
            <Text style={[
              styles.submitButtonText,
              isButtonDisabled && styles.submitButtonTextDisabled
            ]}>
              Check
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default Welcome;
