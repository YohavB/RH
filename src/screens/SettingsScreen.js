import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Clipboard } from "react-native";
import { Alert } from "../components/CustomAlert";
import { useSelector, useDispatch } from "react-redux";
import { setUserCars, setUserInfo, setAuthToken } from "../redux/actions";
import { removeCarFromUser } from "../BE_Api/ApiManager";
import ScreenContainer from "../components/ScreenContainer";
import styles from "../styles/screenStyles/SettingsScreenStyles";
import { PersonIcon, CarIcon, BackIcon } from "../components/Icons";
import { Gradients } from "../styles/GlobalStyle";
import SectionHeader from "../components/SectionHeader";
import InfoField from "../components/InfoField";
import CarCard from "../components/CarCard";
import DeleteNotification from "../components/DeleteNotification";
import { ScreenNames } from "./ScreenNames";
import GoogleSignInService from "../services/GoogleSignInService";
import CountryPicker from "../components/CountryPicker";
import StorageManager from "../utils/StorageManager";
import NotificationService from "../services/NotificationService";
import { auth } from "../firebase/config";

const Settings = ({ navigation, route }) => {
  // Get the source from route params to understand where user came from
  const source = route.params?.source;

  const dispatch = useDispatch();
  const { userInfo, userCars = [] } = useSelector((state) => state.user) || {};

  const [deletedCar, setDeletedCar] = useState(null);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false);

  // Use real user data from Redux
  const getUserData = () => {
    if (userInfo) {
      return {
        name: `${userInfo.firstName} ${userInfo.lastName}`,
        email: userInfo.email,
      };
    }
    return {
      name: "Unknown",
      email: "Not provided",
    };
  };

  const userData = getUserData();

  // Screen load logging
  useEffect(() => {
    console.log("Settings Screen Loaded");
    console.log("User Info:", userInfo);
    console.log("User Data:", userData);
    console.log("User Cars:", userCars);
    console.log("Source:", source);
  }, []);

  useEffect(() => {
    console.log("🚗 IS DELETING:", isDeleting);
  }, [isDeleting]);

  // Load default country from storage
  useEffect(() => {
    const loadDefaultCountry = async () => {
      try {
        const storedCountry = await StorageManager.getDefaultCountry();
        if (storedCountry !== null) {
          setDefaultCountry(storedCountry);
        }
      } catch (error) {
        console.error("Error loading default country:", error);
      }
    };

    loadDefaultCountry();
  }, []);

  // Load FCM token
  useEffect(() => {
    const loadFCMToken = async () => {
      try {
        const token = await NotificationService.getToken();
        setFcmToken(token);
      } catch (error) {
        console.error("Error loading FCM token:", error);
      }
    };

    loadFCMToken();
  }, []);

  // Handle deleting a car
  const handleDeleteCar = async (car) => {
    if (isDeleting) return; // Prevent multiple simultaneous deletions

    console.log("🚗 DELETING CAR FROM STORE:");

    setIsDeleting(true);

    try {
      const response = await removeCarFromUser(car.id, userInfo.id);

      if (response) {
        setDeletedCar({
          brand: car.brand,
          model: car.model,
          plateNumber: car.plateNumber,
        });

        dispatch(setUserCars(response.userCars));

        setShowDeleteNotification(true);
      } else {
        throw new Error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      Alert.alert("Error", "Failed to delete car. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle closing the delete notification
  const handleCloseNotification = () => {
    setShowDeleteNotification(false);
    setDeletedCar(null);
  };

  // Navigate to add car screen
  const handleAddCar = () => {
    navigation.navigate(ScreenNames.ADD_CAR, {
      source: ScreenNames.SETTINGS,
    });
  };

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };

  // Handle default country change
  const handleDefaultCountryChange = async (country) => {
    try {
      setDefaultCountry(country);
      await StorageManager.setDefaultCountry(country);
      console.log("Default country saved:", country);
    } catch (error) {
      console.error("Error saving default country:", error);
      Alert.alert(
        "Error",
        "Failed to save default country setting. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const signOutWithGoogle = async () => {
    // Show confirmation dialog before signing out
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            console.log("Starting sign out process...");

            // Sign out from Google
            const result = await GoogleSignInService.signOutWithGoogle();

            if (result.success) {
              console.log("Google sign out successful");

              // Clear all user data from Redux store
              dispatch(setUserInfo(null));
              dispatch(setUserCars([]));
              dispatch(setAuthToken(""));

              console.log("User data cleared from Redux store");

              // Navigate back to login screen
              navigation.reset({
                index: 0,
                routes: [{ name: ScreenNames.LOGIN }],
              });
            } else {
              console.log("Google sign out failed:", result.error);
              Alert.alert(
                "Sign Out Error",
                "Failed to sign out from Google. Please try again.",
                [{ text: "OK" }]
              );
            }
          } catch (error) {
            console.log("Sign out error:", error);
            Alert.alert(
              "Sign Out Error",
              "An unexpected error occurred while signing out. Please try again.",
              [{ text: "OK" }]
            );
          }
        },
      },
    ]);
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header with back button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackIcon gradient={Gradients.orangeToPink} />
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            {/* Personal Info Section */}
            <View style={styles.section}>
              <SectionHeader
                title="Personal info"
                icon={
                  <View style={styles.iconContainer}>
                    <PersonIcon />
                  </View>
                }
              />

              <View style={styles.infoContainer}>
                <InfoField label="Name:" value={userData.name} />

                <InfoField label="Email:" value={userData.email} />

                <InfoField
                  label="Default Plate Recognition Country:"
                  value={
                    <CountryPicker
                      value={defaultCountry}
                      onValueChange={handleDefaultCountryChange}
                      style={styles.defaultCountryPicker}
                    />
                  }
                />

                <TouchableOpacity
                  style={styles.googleButton}
                  onPress={signOutWithGoogle}
                >
                  <Text style={styles.googleButtonText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Car Details Section */}
            <View style={styles.section}>
              <SectionHeader
                title={
                  userCars && userCars.length > 1
                    ? "Cars Details"
                    : "Car Details"
                }
                icon={
                  <View style={styles.iconContainer}>
                    <CarIcon />
                  </View>
                }
              />

              {/* Display user cars if any */}
              {userCars && userCars.length > 0 ? (
                userCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onDelete={isDeleting ? null : handleDeleteCar}
                    isLastCar={userCars.length === 1}
                  />
                ))
              ) : (
                <View style={styles.noCarsContainer}>
                  <Text style={styles.noCarsText}>No cars added yet.</Text>
                  <Text style={styles.noCarsText}>
                    You must add a car to start using the app.
                  </Text>
                </View>
              )}

              {/* Add another car button */}
              <TouchableOpacity
                style={styles.addCarButton}
                onPress={handleAddCar}
              >
                {userCars && userCars.length > 0 ? (
                  <Text style={styles.addCarText}>Add another car</Text>
                ) : (
                  <Text style={styles.addCarText}>Add a car</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Notification Test Section */}
            <View style={styles.section}>
              <SectionHeader
                title="Notification Testing"
                icon={
                  <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>🔔</Text>
                  </View>
                }
              />

              <View style={styles.infoContainer}>
                <Text style={styles.sectionDescription}>
                  Test notifications to debug issues with custom sounds and foreground notifications.
                </Text>

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      console.log('🧪 Testing basic notification from settings...');
                      const result = await NotificationService.testBasicNotification();
                      if (result) {
                        Alert.alert('Success', 'Basic notification test passed! Check your notification area.');
                      } else {
                        Alert.alert('Error', 'Basic notification test failed! Check console logs.');
                      }
                    } catch (error) {
                      console.error('Notification test error:', error);
                      Alert.alert('Error', `Notification test failed: ${error.message}`);
                    }
                  }}
                >
                  <Text style={styles.testButtonText}>Test Basic Notification</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      console.log('🧪 Testing custom notification from settings...');
                      const result = await NotificationService.testNotification();
                      if (result) {
                        Alert.alert('Success', 'Custom notification test passed! You should hear car horn sounds.');
                      } else {
                        Alert.alert('Error', 'Custom notification test failed! Check console logs.');
                      }
                    } catch (error) {
                      console.error('Custom notification test error:', error);
                      Alert.alert('Error', `Custom notification test failed: ${error.message}`);
                    }
                  }}
                >
                  <Text style={styles.testButtonText}>Test Custom Sound Notification</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      console.log('🧪 Testing foreground message from settings...');
                      const mockMessage = {
                        data: { notificationType: 'FREE_TO_GO' },
                        notification: {
                          title: '🧪 Test Foreground Message',
                          body: 'This simulates an FCM message received while app is open'
                        }
                      };
                      await NotificationService.handleForegroundMessage(mockMessage);
                      Alert.alert('Success', 'Foreground message test completed! Check if notification appeared.');
                    } catch (error) {
                      console.error('Foreground message test error:', error);
                      Alert.alert('Error', `Foreground message test failed: ${error.message}`);
                    }
                  }}
                >
                  <Text style={styles.testButtonText}>Test Foreground Message</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Firebase Test Section */}
            <View style={styles.section}>
              <SectionHeader
                title="Firebase Test"
                icon={
                  <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>🔥</Text>
                  </View>
                }
              />

              <View style={styles.infoContainer}>
                <InfoField label="Authentication Status:" value={userInfo ? "Signed In" : "Signed Out"} />
                <InfoField label="Current User UID:" value={userInfo?.uid || "N/A"} />
                <InfoField label="FCM Token:" value={fcmToken ? `${fcmToken.substring(0, 20)}...` : "Loading..."} />

                {fcmToken && (
                  <TouchableOpacity
                    style={[styles.testButton, styles.copyButton]}
                    onPress={async () => {
                      try {
                        await Clipboard.setString(fcmToken);
                        Alert.alert('Success', 'FCM Token copied to clipboard!');
                      } catch (error) {
                        console.error('Copy to clipboard error:', error);
                        Alert.alert('Error', 'Failed to copy token to clipboard');
                      }
                    }}
                  >
                    <Text style={styles.testButtonText}>📋 Copy FCM Token</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      console.log('🧪 Testing Firebase Authentication...');
                      const user = auth.currentUser;
                      if (user) {
                        Alert.alert('Success', `User ${user.displayName || user.email} is signed in.`);
                      } else {
                        Alert.alert('Info', 'No user signed in.');
                      }
                    } catch (error) {
                      console.error('Firebase auth test error:', error);
                      Alert.alert('Error', `Firebase auth test failed: ${error.message}`);
                    }
                  }}
                >
                  <Text style={styles.testButtonText}>Test Firebase Auth</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      setIsLoadingFirebase(true);
                      console.log('🧪 Testing FCM Token...');
                      const token = await NotificationService.getToken();
                      setFcmToken(token);
                      Alert.alert('Success', `FCM Token refreshed! Token: ${token.substring(0, 30)}...`);
                    } catch (error) {
                      console.error('FCM token test error:', error);
                      Alert.alert('Error', `FCM token test failed: ${error.message}`);
                    } finally {
                      setIsLoadingFirebase(false);
                    }
                  }}
                  disabled={isLoadingFirebase}
                >
                  <Text style={styles.testButtonText}>
                    {isLoadingFirebase ? 'Refreshing...' : 'Refresh FCM Token'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      setIsLoadingFirebase(true);
                      console.log('🧪 Testing Firebase connectivity...');
                      
                      // Test Firebase app initialization
                      const app = auth.app;
                      if (app) {
                        Alert.alert('Success', 'Firebase app is properly initialized!');
                      } else {
                        Alert.alert('Error', 'Firebase app is not initialized!');
                      }
                    } catch (error) {
                      console.error('Firebase connectivity test error:', error);
                      Alert.alert('Error', `Firebase connectivity test failed: ${error.message}`);
                    } finally {
                      setIsLoadingFirebase(false);
                    }
                  }}
                  disabled={isLoadingFirebase}
                >
                  <Text style={styles.testButtonText}>Test Firebase Connectivity</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      setIsLoadingFirebase(true);
                      console.log('🧪 Testing Google Sign-In...');
                      
                      const result = await GoogleSignInService.signInWithGoogle();
                      if (result.success) {
                        Alert.alert('Success', 'Google Sign-In test successful!');
                      } else {
                        Alert.alert('Error', `Google Sign-In failed: ${result.error}`);
                      }
                    } catch (error) {
                      console.error('Google Sign-In test error:', error);
                      Alert.alert('Error', `Google Sign-In test failed: ${error.message}`);
                    } finally {
                      setIsLoadingFirebase(false);
                    }
                  }}
                  disabled={isLoadingFirebase}
                >
                  <Text style={styles.testButtonText}>Test Google Sign-In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.testButton}
                  onPress={async () => {
                    try {
                      setIsLoadingFirebase(true);
                      console.log('🧪 Testing Google Sign-Out...');
                      
                      const result = await GoogleSignInService.signOutWithGoogle();
                      if (result.success) {
                        Alert.alert('Success', 'Google Sign-Out test successful!');
                      } else {
                        Alert.alert('Error', `Google Sign-Out failed: ${result.error}`);
                      }
                    } catch (error) {
                      console.error('Google Sign-Out test error:', error);
                      Alert.alert('Error', `Google Sign-Out test failed: ${error.message}`);
                    } finally {
                      setIsLoadingFirebase(false);
                    }
                  }}
                  disabled={isLoadingFirebase}
                >
                  <Text style={styles.testButtonText}>Test Google Sign-Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Delete success notification */}
      {deletedCar && (
        <DeleteNotification
          visible={showDeleteNotification}
          brand={deletedCar.brand}
          model={deletedCar.model}
          licensePlate={deletedCar.plateNumber}
          onClose={handleCloseNotification}
        />
      )}
    </ScreenContainer>
  );
};

export default Settings;
