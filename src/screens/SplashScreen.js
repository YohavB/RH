import React, { useEffect, useState, useRef } from "react";
import { Text, View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients } from "../styles/GlobalStyle";
import styles from "../styles/screenStyles/SplashScreenStyles";
import ScreenContainer from '../components/ScreenContainer';
import { ScreenNames } from "../classes/RHClasses";
import GoogleSignInService from "../services/GoogleSignInService";
import SplashAnimationService from "../services/SplashAnimationService";
import { setUserCars, setUserInfo, setAuthToken, setUserDetails } from "../redux/actions";
import { getUserCars, googleLogin } from "../BE_Api/ApiManager";
import { useDispatch } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [prelimaryUserInfo, setPrelimaryUserInfo] = useState(null);
  const dispatch = useDispatch();

  // Animation service instance
  const animationService = useRef(new SplashAnimationService()).current;

  // Navigate to appropriate screen when both animation and auth are complete
  useEffect(() => {
    if (animationComplete && authComplete) {
      const timer = setTimeout(() => {
        if (authSuccess) {
          navigation.replace(ScreenNames.MAIN);
        } else {
          navigation.replace(ScreenNames.LOGIN);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [animationComplete, authComplete, authSuccess, navigation]);

  // Start animation and authentication in parallel when component mounts
  useEffect(() => {
    console.log("Splash Screen Loaded");
    startAnimation();
    startAuthenticationFlow();
  }, []);

  useEffect(() => {
    console.log("prelimaryUserInfo");
    console.log(prelimaryUserInfo);
    if (prelimaryUserInfo) {
      authUser();
    }
  }, [prelimaryUserInfo]);

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
      const result = await GoogleSignInService.getCurrentUser();
      if (result.success) {
        console.log("signInSilently success in Splash Screen");
        console.log(result.data);
        setPrelimaryUserInfo(result.data);
      } else {
        console.log("Silent sign-in failed:", result.error);
        // If silent sign-in fails, mark auth as complete with failure
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
      console.log(prelimaryUserInfo);

      const idToken = prelimaryUserInfo.idToken;
      if (!idToken) {
        console.log("No idToken found in Google user info");
        setAuthComplete(true);
        setAuthSuccess(false);
        return;
      }

      const result = await googleLogin(idToken);
      console.log("authUser result");
      console.log(result);

      if (result && result.user) {
        dispatch(setAuthToken(result.token));
        dispatch(setUserDetails(result.user));
        dispatch(setUserInfo(result.user));

        console.log("Authentication successful");
        console.log("Token stored in Redux");

        // Retrieve user cars
        await retrieveUserCars(result.user.id);
        
        setAuthComplete(true);
        setAuthSuccess(true);
      } else {
        console.log("Authentication failed - no user data");
        setAuthComplete(true);
        setAuthSuccess(false);
      }
    } catch (error) {
      console.log("authUser error:", error);
      setAuthComplete(true);
      setAuthSuccess(false);
    }
  };

  const retrieveUserCars = async (userId) => {
    try {
      console.log("getting user cars");
      const userCars = await getUserCars(userId);
      console.log("userCars", userCars);
      dispatch(setUserCars(userCars));
    } catch (error) {
      console.log("Error retrieving user cars:", error);
      // Don't fail the entire auth flow if cars retrieval fails
    }
  };

  // Get animation styles from the service
  const { topLeftRectStyle, topRightRectStyle, bottomRectStyle } = animationService.getAnimationStyles();

  return (
    <ScreenContainer safeArea={false}>
      <LinearGradient
        colors={Gradients.orangeToPink.colors}
        style={styles.container}
        start={Gradients.orangeToPink.start}
        end={Gradients.orangeToPink.end}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>unBlock</Text>
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
