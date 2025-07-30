import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, setUserCars } from "../redux/actions";

import styles from "../styles/screenStyles/LoginScreenStyles";
import { getUsersCarsByUserId } from "../BE_Api/ApiManager";
import ScreenContainer from "../components/ScreenContainer";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

// Import the SVG file directly
import GoogleLogo from "../assets/icons/google_logo.svg";

const Login = ({ navigation }) => {
  // Fix Redux selector to match store structure
  const [userInfo, setUserInfo] = useState(null);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Login Screen Loaded");
    GoogleSignin.configure({
      webClientId:
        "864165576083-harqo14kmlvj6lrhmmrjomemo2v6ervu.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      // scopes: "", // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: "", // specifies a hosted domain restriction
      forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: "", // [Android] specifies an account name on the device that should be used
      iosClientId:
        "864165576083-ql4f8beguutmtrel407bbqog25otpu21.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
      openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    getCurrentUser();
  }, []);

  const isSuccessResponse = (response) => {
    return response && response.data;
  };

  const isErrorWithCode = (error) => {
    return error && error.code;
  };

  const signInWithGoogle = async () => {
    try {
      console.log("signInWithGoogle");
      setIsSigninInProgress(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUserInfo(response.data);
      } else {
        console.log("Sign in cancelled by user");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Sign in already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play services not available");
            break;
          default:
            console.log("Some other error happened");
        }
      } else {
        console.log("An error that's not related to google sign in occurred");
      }
    } finally {
      setIsSigninInProgress(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      console.log("getCurrentUser");
      const response = await GoogleSignin.signInSilently();
      if (isSuccessResponse(response)) {
        console.log("getCurrentUser success");
        setUserInfo(response.data);
      } else if (isNoSavedCredentialFoundResponse(response)) {
        console.log("getCurrentUser no saved credential found");
      }
    } catch (error) {
      console.log("getCurrentUser error");
      console.log(error);
    }
  };

  const signOutWithGoogle = async () => {
    await GoogleSignin.signOut();
    setUserInfo(null);
  };

  return (
    <ScreenContainer>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Get started with</Text>
          <Text style={styles.titleBrand}>unBlock</Text>
          <Text style={styles.subtitle}>Park without fear.</Text>
        </View>

        {userInfo === null ? (
          <>
            <Pressable style={styles.googleButton} onPress={signInWithGoogle}>
              <View style={styles.googleButtonContent}>
                <GoogleLogo style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
              </View>
            </Pressable>

            {isSigninInProgress && <Text>Signing in...</Text>}
          </>
        ) : (
          <Text>{JSON.stringify(userInfo)}</Text>
        )}

        {/* sign out */}
        <Pressable style={styles.googleButton} onPress={signOutWithGoogle}>
          <View style={styles.googleButtonContent}>
            <Text style={styles.googleButtonText}>Sign out</Text>
          </View>
        </Pressable>
      </View>
    </ScreenContainer>
  );
};

export default Login;
