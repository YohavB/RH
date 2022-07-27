import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";
import { setUserName, setCarNumber } from "./redux/action";

import GlobalStyle from "../utils/GlobalStyle";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const SplashScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    console.log("useEffect in SplashScreen");
    // getData();
    console.log("Google.configure");
    GoogleSignin.configure({
      //scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "864165576083-harqo14kmlvj6lrhmmrjomemo2v6ervu.apps.googleusercontent.com",
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: "", // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: "", // [Android] specifies an account name on the device that should be used
     // iosClientId: "864165576083-harqo14kmlvj6lrhmmrjomemo2v6ervu.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    isSignedInQuery();
    if (!isSignedIn) signInSilentlyFromGoogle();
    else {
      getCurrentUser();
      navigation.replace("Main");
    }
  }, []);

  const dispatch = useDispatch();

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
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsSignedIn(isSignedIn);
  };

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    setUserInfo(currentUser);
  };

  const signInSilentlyFromGoogle = async () => {
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

  return (
    <SafeAreaView style={GlobalStyle.MainContainer}>
      <Image
        source={require("../assets/RH.png")}
        style={{ width: "100%", height: "60%" }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
