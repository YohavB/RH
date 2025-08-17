import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated } from "react-native";
import { Alert } from "../components/CustomAlert";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients } from "../styles/GlobalStyle";
import styles from "../styles/screenStyles/SplashScreenStyles";
import ScreenContainer from "../components/ScreenContainer";
import { ScreenNames } from "./ScreenNames";
import GoogleSignInService from "../services/GoogleSignInService";
import SplashAnimationService from "../services/SplashAnimationService";
import {
  setUserCars,
  setUserInfo,
  setAuthToken,
  setGoogleIdToken,
} from "../redux/actions";
import {
  getCurrentUserCars,
  googleLogin,
  testServerConnectivity,
} from "../BE_Api/ApiManager";
import { useDispatch } from "react-redux";
import { APP_CONFIG } from "../config/appConfig";

const SplashScreen = ({ navigation }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [prelimaryUserInfo, setPrelimaryUserInfo] = useState(null);
  const [hasRegisteredCar, setHasRegisteredCar] = useState(false);
  const dispatch = useDispatch();

  // Animation service instance
  const animationService = useRef(new SplashAnimationService()).current;

  // Navigate to appropriate screen when both animation and auth are complete
  useEffect(() => {
    if (animationComplete && authComplete) {
      const timer = setTimeout(() => {
        if (authSuccess) {
                  if (!hasRegisteredCar) {
          navigation.replace(ScreenNames.ADD_CAR, {
            source: ScreenNames.SPLASH,
          });
        } else {
          navigation.replace(ScreenNames.MAIN, {
            source: ScreenNames.SPLASH,
          });
        }
        } else {
          navigation.replace(ScreenNames.LOGIN, {
            source: ScreenNames.SPLASH,
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [animationComplete, authComplete, authSuccess, navigation]);

  // Start animation and authentication in parallel when component mounts
  useEffect(() => {
    console.log("Splash Screen Loaded");
    firstTestServerConnectivity();
    startAnimation();
    startAuthenticationFlow();
  }, []);

  useEffect(() => {
    if (prelimaryUserInfo) {
      authUser();
    }
  }, [prelimaryUserInfo]);

  const firstTestServerConnectivity = async () => {
    console.log("🔍 Testing server connectivity...");
    const isServerReachable = await testServerConnectivity();
    if (!isServerReachable) {
      Alert.alert(
        "Server Connection Error",
        "Cannot connect to the server. Please retry in a few minutes.",
        [{ text: "OK" }]
      );
      return;
    }
  };

  const startAnimation = () => {
    animationService.startAnimation(
      (phase) => setAnimationPhase(phase),
      () => setAnimationComplete(true)
    );
  };

  const startAuthenticationFlow = async () => {
    try {
      console.log("Starting authentication flow");
      await signInSilently();
    } catch (error) {
      console.log("Authentication flow failed:", error);
      setAuthComplete(true);
      setAuthSuccess(false);
    }
  };

  const signInSilently = async () => {
    try {
      console.log("signInSilently in Splash Screen");
      const result = await GoogleSignInService.getGoogleCurrentUserSilently();
      if (result.success) {
        console.log("signInSilently success in Splash Screen");
        setPrelimaryUserInfo(result.data);
        // Store Google ID token so Login screen can retry server auth if needed
        try {
          const idToken = result?.data?.idToken || null;
          if (idToken) {
            dispatch(setGoogleIdToken(idToken));
          }
        } catch (_) {}
      } else {
        console.log("Silent sign-in failed:", result.error);
        // If silent sign-in fails, mark auth as complete with failure
        dispatch(setGoogleIdToken(null));
        setAuthComplete(true);
        setAuthSuccess(false);
      }
    } catch (error) {
      console.log("signInSilently error in Splash Screen");
      console.log(error);
      setAuthComplete(true);
      setAuthSuccess(false);
    }
  };

  const authUser = async () => {
    try {
      console.log("authUser");

      const idToken = prelimaryUserInfo.idToken;
      if (!idToken) {
        console.log("No idToken found in Google user info");
        setAuthComplete(true);
        setAuthSuccess(false);
        return;
      }

      const result = await googleLogin(idToken);
      console.log("authUser result");

      if (result && result.user) {
        dispatch(setAuthToken(result.token));
        dispatch(setUserInfo(result.user));

        console.log("Authentication successful");
        console.log("Token stored in Redux");

        // Retrieve user cars
        const hasRegisteredCar = await retrieveUserCars();

        console.log(
          "Authentication complete, navigating based on registration status",
          hasRegisteredCar
        );

        setHasRegisteredCar(hasRegisteredCar);
        setAuthComplete(true);
        setAuthSuccess(true);
        // Optional: clear stored Google token after successful server auth
        // dispatch(setGoogleIdToken(null));
      } else {
        console.log("Authentication failed - no user data");
        setAuthComplete(true);
        setAuthSuccess(false);
        // Keep Google token so Login can retry server auth
      }
    } catch (error) {
      console.log("authUser error:", error);
      setAuthComplete(true);
      setAuthSuccess(false);
      // Keep Google token so Login can retry server auth
    }
  };

  const retrieveUserCars = async () => {
    try {
      console.log("Retrieving current user cars...");

      const userCarsDto = await getCurrentUserCars();
      const cars = userCarsDto?.cars || [];

      console.log("User cars retrieved:", cars);

      dispatch(setUserCars(cars));

      console.log("User cars stored in Redux");

      return cars.length > 0;
    } catch (error) {
      console.log("Error retrieving user cars:", error);
      // Don't fail the entire auth flow if cars retrieval fails
      // Just log the error and continue
      return false;
    }
  };

  // Get animation styles from the service
  const { topLeftRectStyle, topRightRectStyle, bottomRectStyle } =
    animationService.getAnimationStyles();

  return (
    <ScreenContainer safeArea={false}>
      <LinearGradient
        colors={Gradients.orangeToPink.colors}
        style={styles.container}
        start={Gradients.orangeToPink.start}
        end={Gradients.orangeToPink.end}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{APP_CONFIG.APP_NAME}</Text>
          <View style={styles.logoContainer}>
            <View style={styles.topRow}>
              <Animated.View style={[styles.rectangle, topLeftRectStyle]} />
              <Animated.View style={[styles.rectangle, topRightRectStyle]} />
            </View>
            <View style={styles.bottomRow}>
              <Animated.View style={[styles.rectangle, bottomRectStyle]} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScreenContainer>
  );
};

export default SplashScreen;
