import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserIdFromDB, setUserInfo } from "../redux/actions";

import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/LoginStyles";
import { findCarByPlateNumber } from "../BE_Api/ApiCalls";

// Google icon as base64 to avoid requiring external file
const GOOGLE_ICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJxSURBVHgB1VVNaxNRFD33TZJp0tAPbAPWRdK6MAiFQkEQBOnGZQWpf8CdLly5cCtudeNKlwouXCgIIm4siCIoWLBYalLTUmjaJmmamTfjvXmTSWaStE3BlYfDvPfmzrn33HffA8xDYf09aHrQjEjVNLsSjD9gKBbF0oUQTs85IaWEosEOiRBiMjYyb3c8PvQ3M+r+5cRTJDZSoE4JVVVBXLQXl6KIvvoAr9sNRolAGUlTwMmxz/nuhfdyLwBTDffgRR2O1I1LxM5HcSvWxnXhFjKfklMCQ0E1Ghg8/oZVz32cXfHMEYVs2ykF8sKqH8lSfUSJ9p2hPdewn0tj//YXBiWwvBzEq91PyGfTsFstVo2i0Ui45Hc7jxB0e5DJ5UkIYkb1DQAHx/sgRFccrNPo7B9ifScDRfTkpVAIL3Z3kc1ksLawgOjyMh5tbeFTqzUpMH6MxfhF9Nv7LRhCOtrFHu5EW3DZbLhcLKLCmr91u1FqNDAo5PDLM9aQYYzLg+1nINjXZBVVvQq3w4HDahXxRAKGrkMxo8dC/6G5hWFjTUQg/Oc7fPOsomzohhkDDnS7ODUMNFhITjLbPrIEG4G2LgVY/0hVkSmXkSoUcK3bxZG6jjbXYF30jyuY7WC+5OZ5s9XC18PDMXmKPj85nZiT9QuwIpPf4h+FKXAw+uPNBP4ixMwStVrN+U+qUy1yxFZQOv2OemMPzwMvYbVYkC/n8aG4g5rQcDXkgVVSJhebEShXvk9S4WoCV7wruB1uweXQkGcJsrUKHp96wbnE/SQjDZ4TRnw40c18KZabD3q+OPBEomcWzHnGvwHkYb3mUMJKtwAAAABJRU5ErkJggg==";

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
            <Image
              source={{ uri: `data:image/png;base64,${GOOGLE_ICON_BASE64}` }}
              style={styles.googleIcon}
              resizeMode="contain"
            />
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
