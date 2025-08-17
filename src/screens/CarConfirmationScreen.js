import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Alert } from "../components/CustomAlert";
import { useSelector, useDispatch } from "react-redux";
import { setCarRelations, setUserCars } from "../redux/actions";
import ScreenContainer from "../components/ScreenContainer";
import styles from "../styles/screenStyles/CarConfirmationStyles";
import { Colors } from "../styles/GlobalStyle";
import { UserCarSituation } from "../BE_Api/ServerDTOs";
import { ScreenNames } from "./ScreenNames";
import { createCarRelationship, assignCarToUser } from "../BE_Api/ApiManager";
import CarSelector from "../components/CarSelector";
import RushHourLoader from "../components/RushHourLoader";

const CarConfirmationScreen = ({ navigation, route }) => {
   const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, userCars = [] } = useSelector((state) => state.user) || {};
  const [selectedUserCar, setSelectedUserCar] = useState(null);
  const [foundCar, setFoundCar] = useState(null);
  const userId = userInfo?.id;

  // Get the source and car info from route params
  const source = route.params?.source;

   // Screen load logging
   useEffect(() => {
    console.log("Car Confirmation Screen Loaded");

    const foundCar = route.params?.foundCar;
    setFoundCar(foundCar);
  }, []);

  // Handle confirming car details
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      let response = await assignCarToUser(userId, foundCar.id);

      // Save the returned cars to Redux store
      console.log("🚗 RESPONSE:", response);
      if (response.cars) {
        console.log("🚗 ADDING CAR TO STORE:");
        console.log(`  New car: id ${foundCar.id} - ${foundCar.plateNumber})`);
        console.log(`  To CurrentUser ID: ${userId}`);

        dispatch(setUserCars(response.cars));
      }

      // Navigate based on source screen
      if (source === ScreenNames.SETTINGS) {
        navigation.navigate(ScreenNames.SETTINGS, {
          source: ScreenNames.ADD_CAR,
        });
      } else {
        navigation.navigate(ScreenNames.MAIN, {
          source: ScreenNames.ADD_CAR,
        });
      }
    } catch (error) {
      console.error("Error assigning car to user:", error);
      Alert.alert("Error", "Failed to assign car to user. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "I'm blocked by this car" action
  const handleBlockedBy = async () => {
    validateCarSelection();

    console.log("🚗 SELECTED USER CAR ID:", selectedUserCar.id);
    console.log("🚗 FOUND CAR ID:", foundCar.id);

    setIsLoading(true);
    try {
      // Create the blocking relationship
      const response = await createCarRelationship(
        foundCar.id, // blocking car ID
        selectedUserCar.id, // blocked car ID (user's car)
        UserCarSituation.IS_BLOCKED
      );

      console.log(response)

      if (response) {
        console.log("Blocking relationship created:", response.message);
        returnToMain();
      } else {
        throw new Error("Failed to create blocking relationship");
      }
    } catch (error) {
      console.error("Error creating blocking relationship:", error);
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
    validateCarSelection();

    setIsLoading(true);
    try {
      // Create the blocking relationship

      console.log("🚗 SELECTED USER CAR:", selectedUserCar);
      console.log("🚗 CAR INFO:", foundCar);

      console.log("🚗 SELECTED USER CAR ID:", selectedUserCar.id);
      console.log("🚗 FOUND CAR ID:", foundCar.id);

      const response = await createCarRelationship(
        selectedUserCar.id, // blocking car ID (user's car)
        foundCar.id, // blocked car ID
        UserCarSituation.IS_BLOCKING
      );

      if (response) {
        console.log("Blocking relationship created:", response.message);

        dispatch(setCarRelations(response));

        returnToMain();
      } else {
        throw new Error("Failed to create blocking relationship");
      }
    } catch (error) {
      console.error("Error creating blocking relationship:", error);
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
    console.log("🚗 USER CARS:", userCars);
    setSelectedUserCar(userCars[0]);
    console.log("🚗 SELECTED USER CAR:", userCars[0]);
    return true;
  };

  // Check if blocking buttons should be disabled
  const isBlockingButtonsDisabled = () => {
    if (userCars.length === 0) {
      return true; // No cars registered
    }
    if (userCars.length === 1) {
      return false; // Single car is always selected
    }
    return !selectedUserCar; // Multiple cars but none selected
  };

  // Return to main screen with appropriate action
  const returnToMain = () => {
    navigation.navigate(ScreenNames.MAIN, {
      source: ScreenNames.ADD_CAR,
    });
  };

  // Render loading state
  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <RushHourLoader
            size={1}
            color={Colors.mainOrange}
            speed={1}
            loop={true}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  // If no car information is provided, show an error message
  if (!foundCar) {
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
          <Text style={styles.headerText}>
            Found <Text style={styles.brandText}>it</Text>!
          </Text>
          <Text style={styles.subHeaderText}>
            {source === ScreenNames.MAIN
              ? "How do you want to proceed ?"
              : "Is this your car ?"}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plate #:</Text>
            <Text style={styles.detailValue}>{foundCar.plateNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Country:</Text>
            <Text style={styles.detailValue}>{foundCar.country}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Make:</Text>
            <Text style={styles.detailValue}>{foundCar.brand}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model:</Text>
            <Text style={styles.detailValue}>{foundCar.model}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Year:</Text>
            <Text style={styles.detailValue}>{foundCar.year}</Text>
          </View>

          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>{foundCar.color}</Text>
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
                style={[
                  styles.actionButton,
                  styles.blockedByButton,
                  isBlockingButtonsDisabled() && styles.actionButtonDisabled,
                ]}
                onPress={handleBlockedBy}
                disabled={isBlockingButtonsDisabled()}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    isBlockingButtonsDisabled() &&
                      styles.actionButtonTextDisabled,
                  ]}
                >
                  I'm blocked by this car
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.blockingButton,
                  isBlockingButtonsDisabled() && styles.actionButtonDisabled,
                ]}
                onPress={handleBlocking}
                disabled={isBlockingButtonsDisabled()}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    styles.blockingButtonText,
                    isBlockingButtonsDisabled() &&
                      styles.actionButtonTextDisabled,
                  ]}
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

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
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
