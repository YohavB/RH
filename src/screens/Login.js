import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, Pressable, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserIdFromDB, setUserInfo } from "../redux/actions";

import styles from "../styles/LoginStyles";
import { findCarByPlateNumber } from "../BE_Api/ApiCalls";

import GoogleLogo from "../../assets/google_logo.svg";

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

  const manualLogin = () => {
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
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Get started with</Text>
          <Text style={styles.titleBrand}>unBlock</Text>
          <Text style={styles.subtitle}>Park without fear.</Text>
        </View>

        <Pressable style={styles.googleButton} onPress={manualLogin}>
          <View style={styles.googleButtonContent}>
            <GoogleLogo width={24} height={24} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>
              Sign in with Google
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
