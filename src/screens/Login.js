import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Text, TextInput, View, Pressable, Image } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { setUserIdFromDB, setUserInfo } from "../redux/actions";

import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../../utils/KeyboardAvoidingWrapper";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { findCarByPlateNumber } from "../BE_Api/ApiCalls";

const Login = ({ navigation }) => {
  const { userInfo, expoToken } = useSelector((state) => state.userReducer);

  const [plateNumber, setPlateNumber] = useState("");
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [isValidPlate, setIsValidPlate] = useState(false);

  useEffect(() => {
    console.log("Use Effect User Info");
    console.log(userInfo);
    const res = postToDB(userInfo);
findCarByPlateNumber("3254433").then(res => setPlateNumber(res)).catch(err=> errorScreen)
    return () => {
      second;
    };
  }, [userInfo]);

  const dispatch = useDispatch();

  const postToDB = async (userInfo) => {
    try {
      const response = await fetch("http://localhost:8008/api/users/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userInfo.givenName,
          lastName: userInfo.familyName,
          email: userInfo.email,
          pushNotificationToken: expoToken,
          urlPhoto: user.photo,
          externalId: user.id,
        }),
      });
      const json = await response.json();
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    console.log("Loggin with Google");
    try {
      await GoogleSignin.hasPlayServices();
      const userFromGoogle = await GoogleSignin.signIn();
      console.log(userFromGoogle);
      dispatch(setUserInfo(userFromGoogle));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("Sign in Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("Sign in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("Play service is not available");
      } else {
        // some other error happened
        console.log(error.message);
      }
    }
  };

  return (
    <SafeAreaView
      style={[GlobalStyle.MainContainer, { justifyContent: "flex-start" }]}
    >
      <Text style={GlobalStyle.Title}>Welcome To Rush Hour</Text>
      <Text style={GlobalStyle.Text}>Please LogIn</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
        disabled={isSigninInProgress && !isPlateValid}
      />
    </SafeAreaView>
  );
};

export default Login;
