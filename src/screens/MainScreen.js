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
import styles from '../styles/MainScreenStyles';
import { Colors, Gradients } from '../styles/GlobalStyle';
import { ScreenNames } from '../classes/RHClasses';
import { ENV, isDemoMode } from '../config/env';
import ProfileIcon from '../../assets/profile_icon.svg';

const MainScreen = ({ navigation, route }) => {
  // Screen load logging
  useEffect(() => {
    console.log("Main Screen Loaded");
    if (route?.params) {
      console.log("Route params:", route.params);
    }
  }, []);

  const [plateNumber, setPlateNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.user) || {};
  const userName = userInfo?.user?.name || 'Guest';

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
            'Authorization': `Bearer ${userInfo?.token}`,
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
    navigation.navigate('Settings');
  };

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Profile Button */}
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={handleProfilePress}
          >
            <LinearGradient
              colors={Gradients.orangeToPink.colors}
              style={styles.profileIconContainer}
              start={Gradients.orangeToPink.start}
              end={Gradients.orangeToPink.end}
            >
              <ProfileIcon width={24} height={24} fill="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{userName}</Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.instructionText}>
              Enter a plate number or scan it with your camera
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