import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";
import { setUserName, setCarNumber } from "./redux/action";

import * as Device from 'expo-device';

import * as Notifications from 'expo-notifications';

import GlobalStyle from "../utils/GlobalStyle";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const SplashScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [expoToken, setExpoToken] = useState("");

  useEffect(() => {
    console.log("useEffect in SplashScreen");
    // getData();
    console.log("Google.configure");
    googleConfigure();
    registerForPushNotificationsAsync();
    isSignedInQuery();
    if (!isSignedIn) signInSilentlyFromGoogle();
    else {
      getCurrentUser();
      navigation.replace("Main");
    } 
  }, []);

  const dispatch = useDispatch();

  const googleConfigure = () => {
    GoogleSignin.configure({
      //scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "864165576083-harqo14kmlvj6lrhmmrjomemo2v6ervu.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  };

  const getData = () => {
    try {
      AsyncStorageLib.getItem("userInfo").then((value) => {
        if (value != null) {
          console.log("getData from SplashScreen -> Main");
          navigation.replace("Main");
          let userInfo = JSON.parse(value);
          dispatch(setUserName(userInfo.name));
          dispatch(setCarNumber(userInfo.plateNumber));
        } else {
          console.log("No Data found from SplashScreen -> Login");
          navigation.replace("Login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isSignedInQuery = async () => {
    console.log("is SignedIn Query");
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsSignedIn(isSignedIn);
  };

  const getCurrentUser = async () => {
    console.log("Get current user");
    const currentUser = await GoogleSignin.getCurrentUser();
    setUserInfo(currentUser);
  };

  const signInSilentlyFromGoogle = async () => {
    console.log("signin silently");
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo);
      console.log("UserInfo from Google retrieved");
      navigation.replace("Main");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log("UserInfo from Google not retrieved need to sign in");
        navigation.replace("Login");
      } else {
        // some other error
        console.log("another error" + error.code + " : " + error.message);
      }
    }
  };

  const registerForPushNotificationsAsync = async () => {
    console.log("register for push");
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("The ExpoPushTOken of this device is " +token);
      setExpoToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.MainContainer}>
      <Image
        source={require("../assets/images/RH.png")}
        style={{ width: "100%", height: "60%" }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
