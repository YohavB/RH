import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, setUserCars } from "../redux/actions";

import styles from "../styles/LoginScreenStyles";
import { getUsersCarsByUserId } from "../BE_Api/ApiCalls";
import ScreenContainer from '../components/ScreenContainer';

// Import the SVG file directly
import GoogleLogo from "../assets/icons/google_logo.svg";

const Login = ({ navigation }) => {
  // Fix Redux selector to match store structure
  const { userInfo, expoToken } = useSelector((state) => state.user);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Login Screen Loaded");
  }, []);

  const signInWithGoogle = async () => {
    console.log("Google Sign In temporarily disabled");
    // Go to main screen for testing
    navigation.replace("Main");
  };

  const manualLogin = async () => {
    setIsSigninInProgress(true);
    try {
      // Temporary manual login for testing
      const mockUserInfo = {
        user: {
          email: "test@example.com",
          id: "12345",
          name: "Test User",
          photo: "https://via.placeholder.com/150",
        },
      };
      dispatch(setUserInfo(mockUserInfo));
      
      // Check if user has registered cars - in a real app, this would use the API
      // For demo purposes, we'll use a mock approach
      const mockHasRegisteredCars = false; // Set to true to bypass Welcome screen
      
      if (mockHasRegisteredCars) {
        // Mock data for registered cars
        const mockCars = [{
          id: 1,
          plateNumber: "ABC123",
          userId: 12345
        }];
        dispatch(setUserCars(mockCars));
        navigation.replace("Main");
      } else {
        // No cars registered, go to Welcome screen
        navigation.replace("AddCarScreen");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSigninInProgress(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Get started with</Text>
          <Text style={styles.titleBrand}>unBlock</Text>
          <Text style={styles.subtitle}>Park without fear.</Text>
        </View>

        <Pressable style={styles.googleButton} onPress={manualLogin}>
          <View style={styles.googleButtonContent}>
            <GoogleLogo style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>
              Sign in with Google
            </Text>
          </View>
        </Pressable>
      </View>
    </ScreenContainer>
  );
};

export default Login;
