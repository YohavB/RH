import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "../components/CustomAlert";
import { useSelector } from "react-redux";
import ScreenContainer from "../components/ScreenContainer";
import PlateNumberInput from "../components/PlateNumberInput";
import CameraButton from "../components/CameraButton";
import styles from "../styles/screenStyles/MainScreenStyles";
import { Colors, Gradients } from "../styles/GlobalStyle";
import { ScreenNames } from "./ScreenNames";
import { ProfileIcon } from "../components/Icons";
import { APP_CONFIG } from "../config/appConfig";
import RushHourLoader from "../components/RushHourLoader";
import {
  findOrCreateCar,
  getCurrentUserCarRelations,
  removeAllCarRelations,
  updatePushNotificationToken,
} from "../BE_Api/ApiManager";
import UserCarsRelations from "../components/UserCarsRelations";
import NotificationService from "../services/NotificationService";
import { PermissionsAndroid } from "react-native";
import { getMessaging, getApp } from "../firebase/config";

const MainScreen = ({ navigation, route }) => {
  // Screen load logging and reset navigation stack
  const [userCarsRelations, setUserCarsRelations] = useState(null);
  const [plateNumber, setPlateNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Redux state
  const {
    userInfo,
    userCars = [],
    userToken,
  } = useSelector((state) => state.user) || {};

  const getUserDisplayName = () => {
    return `${userInfo?.firstName || 'User'}`;
  };

  const userName = getUserDisplayName();
  const hasRegisteredCars = userCars && userCars.length > 0;

  useEffect(() => {
    const getTokenAndUpdate = async () => {
      const pushNotificationToken = await getPushNotificationToken();
      console.log("🔔 PUSH NOTIFICATION TOKEN !!!! :", pushNotificationToken);

      if (!userInfo.pushNotificationToken || pushNotificationToken === null) {
      console.log("user has no push notification token, requesting from user");
      // request push notification token from user
      //if ios, request permission
      if (Platform.OS === "ios") {
        requestUserPermission();
      }
      //if android, request permission
      if (Platform.OS === "android") {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the POST_NOTIFICATIONS");
          } else {
            console.log("POST_NOTIFICATIONS permission denied");
          }
        });
      }
    }

      if (!userInfo.pushNotificationToken || userInfo.pushNotificationToken !== pushNotificationToken) {
        console.log("updating push notification token");
        updatePushNotificationToken(pushNotificationToken);
      }else{
        console.log("push notification token is already up to date");
      }
    };

    getTokenAndUpdate();
  }, [userInfo]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Main Screen Focused");

      // Reset navigation stack to make MainScreen the root screen
      // Only reset if we have more than one screen in the stack
      const currentState = navigation.getState();
      if (currentState.routes.length > 1) {
        navigation.reset({
          index: 0,
          routes: [{ name: ScreenNames.MAIN }],
        });
      }

      if (route?.params?.source === ScreenNames.CAR_CONFIRMATION) {
        resetInput();
      }

      getUserCarsRelation();
      console.log("🚗 USER CARS RELATIONS:", userCarsRelations);
    }, [route?.params?.source])
  );

  async function requestUserPermission() {
    try {
      const messaging = getMessaging(getApp());
      const authStatus = await messaging.requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        criticalAlert: false,
        provisional: false,
        sound: true, // This is crucial for sound!
      });
      
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
        console.log('Sound permission granted:', authStatus);
      } else {
        console.log('Notification permission denied');
      }
      
      return enabled;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  const getPushNotificationToken = async () => {
    try {
      const pushNotificationToken = await NotificationService.getToken();
      console.log("FCM pushNotificationToken", pushNotificationToken);
      return pushNotificationToken;
    } catch (error) {
      console.error("Error getting push notification token:", error);
      return null;
    }
  }

  const getUserCarsRelation = async () => {
    const response = await getCurrentUserCarRelations();
    console.log("🚗 USER CARS RELATIONS:", response);
    setUserCarsRelations(response);
  };

  const handleCameraPress = () => {
    Keyboard.dismiss();
    navigation.navigate(ScreenNames.PLATE_RECOGNITION, {
      source: ScreenNames.MAIN,
    });
  };

  const resetInput = () => {
    setPlateNumber("");
    setSelectedCountry("");
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
      console.log("🚗 FINDING OR CREATING CAR:", plateNumber, selectedCountry);
      const foundCar = await findOrCreateCar(plateNumber, selectedCountry);

      console.log("🚗 RESPONSE FIND OR CREATE CAR MAIN SCREEN:", foundCar);

      if (foundCar) {
        navigation.navigate(ScreenNames.CAR_CONFIRMATION, {
          source: ScreenNames.MAIN,
          foundCar,
        });
      } else {
        throw new Error("Car not found");
      }
    } catch (error) {
      console.error("Error searching car:", error);
      Alert.alert("Error", "Failed to find car. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled =
    isLoading ||
    plateNumber.replace(/[^a-zA-Z0-9]/g, "").trim().length < 6 ||
    selectedCountry === "";

  const handleProfilePress = () => {
    navigation.navigate(ScreenNames.SETTINGS, {
      source: ScreenNames.MAIN,
    });
  };

  const handleGoToSettings = () => {
    navigation.navigate(ScreenNames.SETTINGS, {
      source: ScreenNames.MAIN,
    });
  };

  const userCarLeft = (userCarId) => {
    removeAllCarRelations(userCarId).then(() => {
      getUserCarsRelation();
    });
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={handleProfilePress}
          >
            <ProfileIcon size={30} gradient={Gradients.orangeToPink} />
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.nameText}>{userName}</Text>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.contentContainerStyle}>
                {!hasRegisteredCars ? (
                  <>
                    <Text style={styles.noCarText}>
                      Before using {APP_CONFIG.APP_NAME} you must have a
                      registered car.{"\n\n"}
                      Please go to settings to add your car.
                    </Text>

                    <TouchableOpacity
                      style={styles.goToSettingsButton}
                      onPress={handleGoToSettings}
                    >
                      <Text style={styles.goToSettingsButtonText}>
                        Go to Settings
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.instructionText}>
                      Are you blocking a car ? Or being blocked ? Let's check it
                      out !
                    </Text>

                    <View style={styles.cameraButtonContainer}>
                      <CameraButton
                        onPress={handleCameraPress}
                        disabled={isLoading}
                      />
                    </View>

                    <PlateNumberInput
                      plateNumber={plateNumber}
                      setPlateNumber={setPlateNumber}
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      onSubmit={isButtonDisabled ? null : handleSubmit}
                      isLoading={isLoading}
                      style={styles.inputContainer}
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

                    {userCarsRelations && userCarsRelations.length > 0 && (
                      <View style={styles.userCarsRelationsContainer}>
                        <UserCarsRelations
                          userCarsRelations={userCarsRelations}
                          userCarLeft={userCarLeft}
                        />
                      </View>
                    )}
                  </>
                )}
              </View>
            </View>
          </ScrollView>

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <RushHourLoader color={Colors.mainOrange} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default MainScreen;
