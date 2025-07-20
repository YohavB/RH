import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserCars } from "../redux/actions";
import ScreenContainer from "../components/ScreenContainer";
import styles from "../styles/screenStyles/CarConfirmationStyles";
import { Colors } from "../styles/GlobalStyle";
import { ScreenNames, UserStatus, CarDTO } from "../classes/RHClasses";
import { ENV, isDemoMode } from "../config/env";
import {
  createOrUpdateCar,
  updateBlockedCarByPlateNumber,
  saveCar,
} from "../BE_Api/ApiCalls";
import CarSelector from "../components/CarSelector";

const CarConfirmationScreen = ({ navigation, route }) => {
  // Screen load logging
  useEffect(() => {
    console.log("Car Confirmation Screen Loaded");
    if (route?.params) {
      console.log("Route params:", route.params);
    }
  }, []);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, userCars = [] } = useSelector((state) => state.user) || {};
  const userName = userInfo?.user?.name || "Ben Jacobs";
  const userId = userInfo?.user?.id || null;
  
  // Get the source and car info from route params
  const source = route.params?.source || ScreenNames.MAIN;
  const carInfo = route.params?.carInfo;

  // Log the source for debugging
  useEffect(() => {
    console.log("CarConfirmationScreen source:", source);
  }, [source]);

  const [selectedUserCar, setSelectedUserCar] = useState(null);

  // Handle confirming car details
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      let response;
      
      if (isDemoMode()) {
        // Call the new saveCar API with mock response, passing existing cars
        response = await saveCar(carInfo, userId, userCars);
      } else {
        // TODO: Implement real API call
        response = await fetch(`${ENV.API_URL}/cars/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo?.token}`,
          },
          body: JSON.stringify(carInfo),
        }).then(res => res.json());
      }

      if (response.success) {
        // Save the returned cars to Redux store
        if (response.userCars) {
          console.log('🚗 ADDING CAR TO STORE:');
          console.log(`  New car: ${carInfo.plateNumber} - ${carInfo.brand} ${carInfo.model} (${carInfo.color})`);
          console.log(`  User ID: ${userId}`);
          console.log(`  Source: ${source}`);
          
          dispatch(setUserCars(response.userCars));
        }

        // Navigate based on source screen
        if (source === ScreenNames.SETTINGS) {
          navigation.navigate(ScreenNames.SETTINGS);
        } else {
          navigation.navigate(ScreenNames.MAIN);
        }
      } else {
        throw new Error('Failed to confirm car');
      }
    } catch (error) {
      console.error('Error confirming car:', error);
      Alert.alert(
        'Error',
        'Failed to confirm car. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "I'm blocked by this car" action
  const handleBlockedBy = async () => {
    if (!validateCarSelection()) return;

    const userCarPlate = getUserCarPlate();
    if (!userCarPlate) {
      Alert.alert("Error", "You need to register a car first.");
      return;
    }

    setIsLoading(true);
    try {
      // Call API to update blocked status
      const response = await updateBlockedCarByPlateNumber(
        carInfo.plateNumber, // blocking car
        userCarPlate, // blocked car (user's selected car)
        userId,
        UserStatus.BLOCKED
      );

      if (response && response.data) {
        returnToMain("blocked");
      } else {
        throw new Error("Failed to update blocked status");
      }
    } catch (error) {
      console.error("Error updating blocked status:", error);
      Alert.alert(
        "Error",
        "Failed to update blocked status. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "I'm blocking this car" action
  const handleBlocking = async () => {
    if (!validateCarSelection()) return;

    const userCarPlate = getUserCarPlate();
    if (!userCarPlate) {
      Alert.alert("Error", "You need to register a car first.");
      return;
    }

    setIsLoading(true);
    try {
      // Call API to update blocking status
      const response = await updateBlockedCarByPlateNumber(
        userCarPlate, // blocking car (user's selected car)
        carInfo.plateNumber, // blocked car
        userId,
        UserStatus.BLOCKING
      );

      if (response && response.data) {
        returnToMain("blocking");
      } else {
        throw new Error("Failed to update blocking status");
      }
    } catch (error) {
      console.error("Error updating blocking status:", error);
      Alert.alert(
        "Error",
        "Failed to update blocking status. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding another car - just go back
  const handleCancel = () => {
    navigation.goBack();
  };

  // Validate car selection when needed
  const validateCarSelection = () => {
    if (userCars.length > 1 && !selectedUserCar) {
      Alert.alert("Error", "Please select which of your cars is involved.");
      return false;
    }
    return true;
  };

  // Get the appropriate car plate number based on user's cars
  const getUserCarPlate = () => {
    if (userCars.length === 0) {
      return null;
    }
    if (userCars.length === 1) {
      return userCars[0].plateNumber;
    }
    return selectedUserCar?.plateNumber;
  };

  // Return to main screen with appropriate action
  const returnToMain = (action) => {
    navigation.navigate(ScreenNames.MAIN, {
      carDetails: carInfo,
      plateNumber: carInfo.plateNumber,
      action: action,
    });
  };

  // Render loading state
  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.mainOrange} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  // If no car information is provided, show an error message
  if (!carInfo) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No car information provided</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Found it !</Text>
          <Text style={styles.subHeaderText}>
            {source === ScreenNames.MAIN
              ? "How do you want to proceed?"
              : "Is this your car?"}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plate #:</Text>
            <Text style={styles.detailValue}>{carInfo.plateNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Country:</Text>
            <Text style={styles.detailValue}>{carInfo.country}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Make:</Text>
            <Text style={styles.detailValue}>{carInfo.brand}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model:</Text>
            <Text style={styles.detailValue}>{carInfo.model}</Text>
          </View>

          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>{carInfo.color}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {source === ScreenNames.MAIN ? (
            <View style={styles.blockingButtonsContainer}>
              {userCars.length > 1 && (
                <CarSelector
                  cars={userCars}
                  selectedCar={selectedUserCar}
                  onSelect={setSelectedUserCar}
                  style={styles.carSelector}
                />
              )}

              <TouchableOpacity
                style={[styles.actionButton, styles.blockedByButton]}
                onPress={handleBlockedBy}
              >
                <Text style={styles.actionButtonText}>
                  I'm blocked by this car
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.blockingButton]}
                onPress={handleBlocking}
              >
                <Text
                  style={[styles.actionButtonText, styles.blockingButtonText]}
                >
                  I'm blocking this car
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Show save and re-enter buttons when coming from welcome or setup
            <View style={styles.saveButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default CarConfirmationScreen;
