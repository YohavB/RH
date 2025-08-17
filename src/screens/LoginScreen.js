import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { Alert } from "../components/CustomAlert";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserInfo,
  setUserCars,
  setAuthToken,
  setGoogleIdToken,
} from "../redux/actions";

import styles from "../styles/screenStyles/LoginScreenStyles";
import { googleLogin, getCurrentUserCars } from "../BE_Api/ApiManager";
import ScreenContainer from "../components/ScreenContainer";
import GoogleSignInService from "../services/GoogleSignInService";
import { ScreenNames } from "./ScreenNames";
import UserConsentModal from "../components/UserConsentModal";

import GoogleLogo from "../assets/icons/google_logo.svg";
import { APP_CONFIG } from "../config/appConfig";

const Login = ({ navigation, route }) => {
  // Redux & navigation helpers
  const dispatch = useDispatch();
  const googleIdTokenFromStore = useSelector(
    (state) => state?.user?.googleIdToken || state?.googleIdToken || null
  );
  const source = route.params?.source;

  // UI / Auth states
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [authStep, setAuthStep] = useState("idle"); // idle | google | server | cars
  const [canRetryServerAuth, setCanRetryServerAuth] = useState(false);

  // Tokens & consent
  const [prelimaryUserInfo, setPrelimaryUserInfo] = useState(null);
  const [pendingIdToken, setPendingIdToken] = useState(null);
  const [showConsentModal, setShowConsentModal] = useState(false);

  /** ─────────── Effects ─────────── */
  useEffect(() => {
    console.log("Login Screen loaded from:", source);
  }, []);

  // Preload Google token from Redux if available
  useEffect(() => {
    if (!prelimaryUserInfo && googleIdTokenFromStore) {
      setPrelimaryUserInfo({ idToken: googleIdTokenFromStore });
    }
  }, [googleIdTokenFromStore]);

  // Trigger auth when we get prelimary Google info
  useEffect(() => {
    if (prelimaryUserInfo) authUser();
  }, [prelimaryUserInfo]);

  /** ─────────── Google Sign In ─────────── */
  const signInWithGoogle = async () => {
    try {
      setIsSigninInProgress(true);
      setAuthStep("google");
      setCanRetryServerAuth(false);

      const result = await GoogleSignInService.signInWithGoogle();
      if (!result.success) throw new Error(result.error);

      const idToken = result?.data?.idToken;
      if (idToken) dispatch(setGoogleIdToken(idToken));

      setPrelimaryUserInfo(result.data);
    } catch (error) {
      console.log("Google sign-in error:", error);
      Alert.alert("Sign In Error", "Failed to sign in with Google.", [
        { text: "OK" },
      ]);
      resetAuthState();
    }
  };

  /** ─────────── Server Auth ─────────── */
  const authUser = async () => {
    const effectiveIdToken = prelimaryUserInfo?.idToken || googleIdTokenFromStore;
    if (!effectiveIdToken) {
      Alert.alert("Authentication Error", "No Google ID token found.", [
        { text: "OK" },
      ]);
      return resetAuthState();
    }

    try {
      setIsSigninInProgress(true);
      setAuthStep("server");

      const result = await googleLogin(effectiveIdToken);

      if (!result?.user) throw new Error("Missing user data");

      dispatch(setAuthToken(result.token));
      dispatch(setUserInfo(result.user));

      const hasCars = await retrieveUserCars();
      navigateAfterAuth(hasCars);

    } catch (error) {
      console.log("authUser error:", error);

      // Special case: consent required
      if (error.status === 403 && error.code === "USER_CONSENT_REQUIRED") {
        setPendingIdToken(effectiveIdToken);
        setShowConsentModal(true);
        return resetAuthState();
      }

      Alert.alert("Authentication Error", "Server authentication failed.", [
        { text: "OK" },
      ]);
      resetAuthState(true);
    }
  };

  /** ─────────── Cars Retrieval ─────────── */
  const retrieveUserCars = async () => {
    try {
      setAuthStep("cars");
      const cars = (await getCurrentUserCars())?.cars || [];
      dispatch(setUserCars(cars));
      return cars.length > 0;
    } catch (error) {
      console.log("Error retrieving cars:", error);
      return false; // fail silently
    }
  };

  /** ─────────── Consent Handling ─────────── */
  const handleConsentAccept = async () => {
    if (!pendingIdToken) return;

    try {
      setIsSigninInProgress(true);
      setAuthStep("server");
      setShowConsentModal(false);

      const result = await googleLogin(pendingIdToken, true);
      if (!result?.user) throw new Error("Consent auth failed");

      dispatch(setAuthToken(result.token));
      dispatch(setUserInfo(result.user));

      const hasCars = await retrieveUserCars();
      navigateAfterAuth(hasCars);

    } catch (error) {
      console.log("Consent auth error:", error);
      Alert.alert("Authentication Error", "Failed after consent.", [
        { text: "OK" },
      ]);
      resetAuthState(true);
    } finally {
      setPendingIdToken(null);
    }
  };

  /** ─────────── Helpers ─────────── */
  const resetAuthState = (allowRetry = false) => {
    setIsSigninInProgress(false);
    setAuthStep("idle");
    setCanRetryServerAuth(allowRetry);
  };

  const navigateAfterAuth = (hasCars) => {
    navigation.replace(hasCars ? ScreenNames.MAIN : ScreenNames.ADD_CAR, {
      source: ScreenNames.LOGIN,
    });
    setCanRetryServerAuth(false);
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

  /** ─────────── UI ─────────── */
  return (
    <>
      <ScreenContainer>
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Get started with</Text>
            <Text style={styles.titleBrand}>{APP_CONFIG.APP_NAME}</Text>
            <Text style={styles.subtitle}>Park without fear.</Text>
          </View>

          {/* Auth buttons */}
          {canRetryServerAuth ? (
            <Pressable
              style={[
                styles.retryLoginButton,
                isSigninInProgress && styles.retryLoginButtonDisabled,
              ]}
              onPress={authUser}
              disabled={isSigninInProgress}
            >
              <Text style={styles.retryLoginButtonText}>
                {isSigninInProgress ? "Retrying..." : "Retry to Log in"}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={[
                styles.googleButton,
                isSigninInProgress && styles.googleButtonDisabled,
              ]}
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
          )}

          {isSigninInProgress && (
            <Text style={styles.loadingText}>{getLoadingText()}</Text>
          )}
        </View>
      </ScreenContainer>

      {/* Consent Modal */}
      <UserConsentModal
        isVisible={showConsentModal}
        onAccept={handleConsentAccept}
      />
    </>
  );
};

export default Login;