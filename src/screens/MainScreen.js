import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Alert } from "../components/CustomAlert";
import { useSelector } from 'react-redux';
import ScreenContainer from '../components/ScreenContainer';
import PlateNumberInput from '../components/PlateNumberInput';
import CameraButton from '../components/CameraButton';
import styles from '../styles/screenStyles/MainScreenStyles';
import { Colors, Gradients } from '../styles/GlobalStyle';
import { ScreenNames } from './ScreenNames';
import { ProfileIcon } from '../components/Icons';
import { APP_CONFIG } from '../config/appConfig';
import RushHourLoader from '../components/RushHourLoader';
import { findOrCreateCar, getCurrentUserCarRelations } from '../BE_Api/ApiManager';

const MainScreen = ({ navigation }) => { 
  // Screen load logging and reset navigation stack
  const { userInfo, userCars = [], userToken } = useSelector((state) => state.user) || {};
  const [userCarsRelations, setUserCarsRelations] = useState(null);

  useEffect(() => {
    console.log("Main Screen Loaded");
    
    // Reset navigation stack to make MainScreen the root screen
    // Only reset if we have more than one screen in the stack
    const currentState = navigation.getState();
    if (currentState.routes.length > 1) {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.MAIN }],
      });
    }

    getUserCarsRelation();
    console.log("🚗 USER CARS RELATIONS:", userCarsRelations);
  }, []);

  const [plateNumber, setPlateNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const getUserDisplayName = () => {
    return `${userInfo.firstName}`;
  };

  const getUserCarsRelation = async () => {
    const response = await getCurrentUserCarRelations();
    console.log("🚗 USER CARS RELATIONS:", response);
    setUserCarsRelations(response);
  };
  
  const userName = getUserDisplayName();
  const hasRegisteredCars = userCars && userCars.length > 0;

  const handleCameraPress = () => {
    Keyboard.dismiss();
    navigation.navigate(ScreenNames.PLATE_RECOGNITION, {
      source: ScreenNames.MAIN,
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
      const response = await findOrCreateCar(plateNumber, selectedCountry);

      console.log("🚗 RESPONSE:", response);

      if (response) {
        navigation.navigate(ScreenNames.CAR_CONFIRMATION, {
          source: ScreenNames.MAIN,
          foundCar: response,
        });
      } else {
        throw new Error('Car not found');
      }
    } catch (error) {
      console.error('Error searching car:', error);
      Alert.alert(
        'Error',
        'Failed to find car. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled =
    isLoading ||
    plateNumber.replace(/[^a-zA-Z0-9]/g, '').trim().length < 6 ||
    selectedCountry === '';

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

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{userName}</Text>
          </View>

          <View style={styles.contentContainer}>
            {hasRegisteredCars ? (
              <>
                <Text style={styles.instructionText}>
                  Are you blocking a car ? Or being blocked ? Let's check it out !
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
              </>
            ) : (
              <>
                <Text style={styles.noCarText}>
                  Before using {APP_CONFIG.APP_NAME} you must have a registered car.{'\n\n'}
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
            )}
          </View>

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <RushHourLoader size={1} color={Colors.mainOrange} speed={1} loop={true} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default MainScreen; 