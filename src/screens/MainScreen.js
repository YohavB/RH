import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../components/ScreenContainer';
import PlateNumberInput from '../components/PlateNumberInput';
import CameraButton from '../components/CameraButton';
import styles from '../styles/screenStyles/MainScreenStyles';
import { Colors, Gradients } from '../styles/GlobalStyle';
import { ScreenNames } from '../classes/RHClasses';
import { ENV, isDemoMode } from '../config/env';
import { ProfileIcon } from '../components/Icons';

const MainScreen = ({ navigation, route }) => {
  // Screen load logging and reset navigation stack
  useEffect(() => {
    console.log("Main Screen Loaded");
    console.log("User Details:", userDetails);
    console.log("User Info:", userInfo);
    console.log("Display Name:", userName);
    
    if (route?.params) {
      console.log("Route params:", route.params);
    }
    
    // Reset navigation stack to make MainScreen the root screen
    // Only reset if we have more than one screen in the stack
    const currentState = navigation.getState();
    if (currentState.routes.length > 1) {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.MAIN }],
      });
    }
  }, [navigation, userDetails, userInfo, userName]);

  const [plateNumber, setPlateNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo, userCars = [], authToken, userDetails } = useSelector((state) => state.user) || {};
  
  // Use real user data from Redux
  const getUserDisplayName = () => {
    if (userDetails) {
      return `${userDetails.firstName} ${userDetails.lastName}`;
    }
    if (userInfo?.user?.name) {
      return userInfo.user.name;
    }
    return 'Guest';
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
      if (isDemoMode()) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, ENV.DEMO_DELAY));
        
        // Navigate to car confirmation with mock data
        navigation.navigate(ScreenNames.CAR_CONFIRMATION, {
          carInfo: {
            plateNumber,
            country: selectedCountry,
            brand: 'DACIA',
            model: 'Sandero',
            color: 'Black',
            expiryDate: '2025-06-01',
          },
          source: ScreenNames.MAIN,
        });
      } else {
        // TODO: Implement real API call
        const response = await fetch(`${ENV.API_URL}/cars/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            plateNumber,
            country: selectedCountry,
          }),
        }).then(res => res.json());

        if (response.success) {
          navigation.navigate(ScreenNames.CAR_CONFIRMATION, {
            carInfo: response.car,
            source: ScreenNames.MAIN,
          });
        } else {
          throw new Error('Car not found');
        }
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
    navigation.navigate(ScreenNames.SETTINGS);
  };

  const handleGoToSettings = () => {
    navigation.navigate(ScreenNames.SETTINGS);
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
                  Before using unBlock you must have a registered car.{'\n\n'}
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
              <ActivityIndicator size="large" color={Colors.mainOrange} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default MainScreen; 