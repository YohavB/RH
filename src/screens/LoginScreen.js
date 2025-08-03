import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserInfo,
  setUserCars,
  setAuthToken,
  setUserDetails,
} from "../redux/actions";

import styles from "../styles/screenStyles/LoginScreenStyles";
import { googleLogin, getUserCars } from "../BE_Api/ApiManager";
import ScreenContainer from "../components/ScreenContainer";
import GoogleSignInService from "../services/GoogleSignInService";
import { ScreenNames } from "../classes/RHClasses";

import GoogleLogo from "../assets/icons/google_logo.svg";

const Login = ({ navigation }) => {
  const [prelimaryUserInfo, setPrelimaryUserInfo] = useState(null);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [authStep, setAuthStep] = useState("idle"); // idle, google, server, cars
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Login Screen Loaded");
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log("prelimaryUserInfo");
    console.log(prelimaryUserInfo);
    if (prelimaryUserInfo) {
      authUser();
    }
  }, [prelimaryUserInfo]);

  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in process...");
      setIsSigninInProgress(true);
      setAuthStep("google");
      
      const result = await GoogleSignInService.signInWithGoogle();
      
      if (result.success) {
        console.log("Google sign-in successful");
        setPrelimaryUserInfo(result.data);
      } else {
        console.log("Google sign-in failed:", result.error);
        Alert.alert(
          "Sign In Error",
          "Failed to sign in with Google. Please try again.",
          [{ text: "OK" }]
        );
        setIsSigninInProgress(false);
        setAuthStep("idle");
      }
    } catch (error) {
      console.log("Sign in error:", error);
      Alert.alert(
        "Sign In Error",
        "An unexpected error occurred during sign in. Please try again.",
        [{ text: "OK" }]
      );
      setIsSigninInProgress(false);
      setAuthStep("idle");
    }
  };

  const getCurrentUser = async () => {
    try {
      console.log("Checking for existing Google user...");
      const result = await GoogleSignInService.getCurrentUser();
      if (result.success) {
        console.log("Found existing Google user");
        console.log(result.data);
        setPrelimaryUserInfo(result.data);
      } else {
        console.log("No existing Google user found:", result.error);
      }
    } catch (error) {
      console.log("getCurrentUser error");
      console.log(error);
    }
  };

  const authUser = async () => {
    try {
      console.log("Starting BE server authentication...");
      setAuthStep("server");
      console.log("prelimaryUserInfo");
      console.log(prelimaryUserInfo);

      const idToken = prelimaryUserInfo.idToken;
      if (!idToken) {
        console.log("No idToken found in Google user info");
        Alert.alert(
          "Authentication Error",
          "Failed to get authentication token from Google. Please try again.",
          [{ text: "OK" }]
        );
        setIsSigninInProgress(false);
        setAuthStep("idle");
        return;
      }

      const result = await googleLogin(idToken);
      console.log("BE server authentication result");
      console.log(result);

      if (result && result.user) {
        console.log("BE server authentication successful");
        
        // Store authentication data in Redux
        dispatch(setAuthToken(result.token));
        dispatch(setUserDetails(result.user));
        dispatch(setUserInfo(result.user));

        console.log("Authentication data stored in Redux");

        // Retrieve user cars
        await retrieveUserCars(result.user.id);
        
        // Navigate to main screen
        console.log("Authentication complete, navigating to main screen");
        navigation.replace(ScreenNames.MAIN);
      } else {
        console.log("BE server authentication failed - no user data");
        Alert.alert(
          "Authentication Error",
          "Failed to authenticate with server. Please try again.",
          [{ text: "OK" }]
        );
        setIsSigninInProgress(false);
        setAuthStep("idle");
      }
    } catch (error) {
      console.log("authUser error:", error);
      Alert.alert(
        "Authentication Error",
        "An error occurred during authentication. Please try again.",
        [{ text: "OK" }]
      );
      setIsSigninInProgress(false);
      setAuthStep("idle");
    }
  };

  const retrieveUserCars = async (userId) => {
    try {
      console.log("Retrieving user cars...");
      setAuthStep("cars");
      
      const userCars = await getUserCars(userId);
      console.log("User cars retrieved:", userCars);
      dispatch(setUserCars(userCars));
      
      console.log("User cars stored in Redux");
    } catch (error) {
      console.log("Error retrieving user cars:", error);
      // Don't fail the entire auth flow if cars retrieval fails
      // Just log the error and continue
    }
  };

  const getLoadingText = () => {
    switch (authStep) {
      case "google":
        return "Signing in with Google...";
      case "server":
        return "Authenticating with server...";
      case "cars":
        return "Loading your cars...";
      default:
        return "Signing in...";
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

        <Pressable 
          style={[styles.googleButton, isSigninInProgress && styles.googleButtonDisabled]} 
          onPress={signInWithGoogle}
          disabled={isSigninInProgress}
        >
          <View style={styles.googleButtonContent}>
            <GoogleLogo style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>
              {isSigninInProgress ? "Signing in..." : "Sign in with Google"}
            </Text>
          </View>
        </Pressable>

        {isSigninInProgress && (
          <Text style={styles.loadingText}>{getLoadingText()}</Text>
        )}
      </View>
    </ScreenContainer>
  );
};

export default Login;
