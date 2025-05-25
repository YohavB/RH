import React, { useState, useEffect } from "react";
import { 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Image, 
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Colors, Fonts } from "../styles/GlobalStyle";
import KeyboardAvoidingWrapper from "../../utils/KeyboardAvoidingWrapper";
import CameraButton from "../components/CameraButton";
import { ScreenNames } from "../classes/RHClasses";

export default function Main({ navigation, route }) {
  // Screen load logging
  useEffect(() => {
    console.log("Main Screen Loaded");
    if (route?.params) {
      console.log("Route params:", route.params);
    }
  }, []);

  // State for the license plate input
  const [plateNumber, setPlateNumber] = useState("");
  
  // Get user data from Redux store
  const userState = useSelector((state) => state.user) || {};
  const userName = userState.userInfo?.user?.name || "User";
  const userCar = userState.userInfo?.carNumber || "";
  
  const dispatch = useDispatch();
  
  // Check if we received a car plate from another screen
  useEffect(() => {
    if (route?.params?.plateNumber) {
      setPlateNumber(route.params.plateNumber);
    }
  }, [route?.params]);

  // Navigate to settings
  const handleSettings = () => {
    navigation.navigate("Settings");
  };
  
  // Handle camera button press to scan license plate
  const handleCameraScan = () => {
    navigation.navigate("PlateRecognition", { 
      source: ScreenNames.MAIN 
    });
  };
  
  // Navigate to recognition result screen with appropriate action
  const handlePlateCheck = () => {
    if (!plateNumber.trim()) {
      Alert.alert("Error", "Please enter a license plate number");
      return;
    }
    
    // Navigate to the car details screen with the plate number
    navigation.navigate("UserCars", { 
      detectedPlate: plateNumber
    });
  };
  
  // Handle when user is blocked
  const handleBlockedByCar = () => {
    // In a real app, this would send a notification to the car owner
    Alert.alert(
      "Notification Sent",
      "We've notified the driver that you need to leave"
    );
    
    // Additional logic for notification sending would go here
  };
  
  // Handle when user is blocking
  const handleBlockingCar = () => {
    // In a real app, this would register that the user is blocking this car
    Alert.alert(
      "Registered",
      "You've registered that you're blocking this car. The driver can now contact you if needed."
    );
    
    // Additional logic for registering the blocking action would go here
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        {/* Settings button */}
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={handleSettings}
        >
          <Image 
            source={require("../../assets/images/settings.png")} 
            style={styles.settingsIcon} 
          />
        </TouchableOpacity>
        
        {/* Welcome screen content (Home) */}
        <View style={styles.homeContent}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Let's <Text style={styles.orangeText}>unBlock</Text>.
            </Text>
          </View>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Scan or enter the license plate 
            of the car you're blocked by, or 
            are blocking.
          </Text>
          
          {/* Camera Button */}
          <View style={{marginVertical: 40}}>
            <CameraButton onPress={handleCameraScan} />
          </View>
          
          {/* Plate Input */}
          <TextInput
            style={styles.plateInput}
            placeholder="Plate number"
            placeholderTextColor="#888"
            value={plateNumber}
            onChangeText={setPlateNumber}
            onSubmitEditing={handlePlateCheck}
            autoCapitalize="characters"
          />
        </View>
        
        {/* Car Details Screen Content (shown after plate recognition) */}
        {route.params?.carDetails && (
          <View style={styles.carDetailsContent}>
            <View style={styles.carInfoContainer}>
              {/* This would be populated with car owner details */}
            </View>
            
            <Text style={styles.detectedPlateText}>
              {route.params.plateNumber || "552-16-503"}
            </Text>
            
            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={styles.blockedByButton}
                onPress={handleBlockedByCar}
              >
                <Text style={styles.buttonText}>
                  I'm blocked by this car
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.blockingButton}
                onPress={handleBlockingCar}
              >
                <Text style={styles.buttonText}>
                  I'm blocking this car
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  settingsButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  settingsIcon: {
    width: 35,
    height: 35,
    tintColor: "#8e8e93",
  },
  homeContent: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  orangeText: {
    color: Colors.mainOrange,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4a4a4a",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 60,
  },
  cameraButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.mainOrange,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    // Gradient background would be implemented with a library like linear-gradient
  },
  cameraIcon: {
    width: 50,
    height: 50,
    tintColor: "white",
  },
  plateInput: {
    width: "100%",
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
  
  // Car Details Screen (after plate recognition)
  carDetailsContent: {
    flex: 1,
    backgroundColor: "#7c85a8", // Dark blue-gray background
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  carInfoContainer: {
    width: "80%",
    height: 180,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 20,
  },
  detectedPlateText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginVertical: 40,
  },
  actionButtonsContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  blockedByButton: {
    width: "100%",
    height: 60,
    backgroundColor: Colors.mainOrange,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  blockingButton: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
