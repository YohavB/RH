import React, { useEffect, useState, useRef } from "react";
import { Image, Text, View, Animated, Dimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

import { useSelector, useDispatch } from "react-redux";
import { setExpoToken, setUserInfo } from "../redux/actions";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import GlobalStyle, { Gradients } from "../../utils/GlobalStyle";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

// Get screen dimensions for animation calculations
const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const { expoToken, userInfo } = useSelector((state) => state.userReducer);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Animation values
  const topLeftRectAnim = useRef(new Animated.Value(0)).current;
  const topRightRectAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const bottomRectAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect in SplashScreen");
    initApp();
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Reset animation values
    topLeftRectAnim.setValue(0);
    topRightRectAnim.setValue({ x: 0, y: 0 });
    bottomRectAnim.setValue({ x: 0, y: 0 });
    fadeAnim.setValue(0);
    setAnimationPhase(0);

    // Initial fade in of all rectangles
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(topLeftRectAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After initial fade in, start the car movement sequence
      setTimeout(() => startCarMovementSequence(), 500);
    });
  };

  const startCarMovementSequence = () => {
    // Phase 1: Bottom rectangle (blocking car) moves diagonally to bottom right
    setAnimationPhase(1);
    Animated.timing(bottomRectAnim, {
      toValue: { x: 60, y: 60 },
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      // Phase 2: Top right rectangle (blocked car) exits downward
      setAnimationPhase(2);
      Animated.timing(topRightRectAnim, {
        toValue: { x: 0, y: height },
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        // Phase 3: Bottom rectangle moves to take top right's place
        setAnimationPhase(3);
        Animated.timing(bottomRectAnim, {
          toValue: { x: 48, y: -60 }, // Move to top-right position
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  const initApp = async () => {
    googleConfigure();
    await registerForPushNotificationsAsync();
    await setupSync();
  };

  const setupSync = async () => {
    await isSignedInQuery();
    !isSignedIn ? await signInSilentlyFromGoogle() : await getCurrentUser();
  };

  const googleConfigure = () => {
    console.log("Google.configure");
    GoogleSignin.configure({
      //scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "864165576083-harqo14kmlvj6lrhmmrjomemo2v6ervu.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  };

  const isSignedInQuery = async () => {
    console.log("is SignedIn Query");
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsSignedIn(isSignedIn);
  };

  const getCurrentUser = async () => {
    console.log("Get current user");
    const currentUser = await GoogleSignin.getCurrentUser();
    dispatch(setUserInfo(currentUser));
  };

  const signInSilentlyFromGoogle = async () => {
    console.log("signin silently");
    try {
      const userInfo = await GoogleSignin.signInSilently();
      dispatch(setUserInfo(userInfo));
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
      console.log("The ExpoPushToken of this device is " + token);
      dispatch(setExpoToken(token));
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

  // Animation styles
  const topLeftRectStyle = {
    ...GlobalStyle.SplashRectangle,
    opacity: topLeftRectAnim,
  };

  const topRightRectStyle = {
    ...GlobalStyle.SplashRectangle,
    opacity: fadeAnim,
    transform: [
      { translateX: topRightRectAnim.x },
      { translateY: topRightRectAnim.y },
    ],
  };

  const bottomRectStyle = {
    ...GlobalStyle.SplashRectangle,
    opacity: fadeAnim,
    transform: [
      { translateX: bottomRectAnim.x },
      { translateY: bottomRectAnim.y },
    ],
  };

  return (
    <LinearGradient
      colors={Gradients.orangeToPink.colors}
      style={GlobalStyle.SplashContainer}
      start={Gradients.orangeToPink.start}
      end={Gradients.orangeToPink.end}
    >
      <View style={GlobalStyle.SplashContentContainer}>
        <Text style={GlobalStyle.SplashTitle}>unBlock</Text>
        <View style={GlobalStyle.SplashLogoContainer}>
          <View style={GlobalStyle.SplashTopRow}>
            <Animated.View style={topLeftRectStyle} />
            <Animated.View style={topRightRectStyle} />
          </View>
          <View style={GlobalStyle.SplashBottomRow}>
            <Animated.View style={bottomRectStyle} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;
