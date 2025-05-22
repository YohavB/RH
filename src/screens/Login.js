import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Alert, Text, TextInput, View, Pressable, Image } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { setUserIdFromDB, setUserInfo } from "../redux/actions";

import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle, { Colors } from "../../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../../utils/KeyboardAvoidingWrapper";

// Temporarily remove direct GoogleSignin import
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

import { findCarByPlateNumber } from "../BE_Api/ApiCalls";

const Login = ({ navigation }) => {
  // Fix Redux selector to match store structure
  const { userInfo, expoToken } = useSelector((state) => state.user);

  const [plateNumber, setPlateNumber] = useState("");
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [isValidPlate, setIsValidPlate] = useState(false);

  useEffect(() => {
    console.log("Login Screen Loaded");
    // Temporarily comment out problematic code
    // console.log(userInfo);
    // const res = postToDB(userInfo);
    // findCarByPlateNumber("3254433").then(res => setPlateNumber(res)).catch(err=> errorScreen)
  }, []);

  const dispatch = useDispatch();

  const postToDB = async (userInfo) => {
    // Temporarily commented out
    console.log("Would post to DB");
  };

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
      }
    };
    dispatch(setUserInfo(mockUserInfo));
    navigation.replace("Main");
  };

  return (
    <SafeAreaView
      style={[GlobalStyle.MainContainer, { justifyContent: "flex-start" }]}
    >
      <Text style={GlobalStyle.Title}>Welcome To unBlock</Text>
      <Text style={GlobalStyle.Text}>Please LogIn</Text>
      
      {/* Replace GoogleSigninButton with a regular button */}
      <Pressable
        style={{
          width: 192,
          height: 48,
          backgroundColor: Colors.mainOrange,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20
        }}
        onPress={manualLogin}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
