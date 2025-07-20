import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserCars } from "../redux/actions";
import { deleteCar } from "../BE_Api/ApiManager";
import ScreenContainer from "../components/ScreenContainer";
import styles from "../styles/screenStyles/SettingsScreenStyles";
import { PersonIcon, CarIcon, BackIcon } from "../components/Icons";
import { Gradients } from "../styles/GlobalStyle";
import SectionHeader from "../components/SectionHeader";
import InfoField from "../components/InfoField";
import CarCard from "../components/CarCard";
import DeleteNotification from "../components/DeleteNotification";
import { ScreenNames } from "../classes/RHClasses";

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user) || {};
  const { userCars } = useSelector((state) => state.user) || { userCars: [] };

  const [deletedCar, setDeletedCar] = useState(null);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mock user data - in a real app, this would come from Redux or API
  const userData = {
    name: userInfo?.user?.name || "Ben Jacobs",
    email: userInfo?.user?.email || "Ben@sunbit.com",
    phone: userInfo?.user?.phone || "058-089-2242",
  };

  // Screen load logging
  useEffect(() => {
    console.log("Settings Screen Loaded");
  }, []);

  // Handle deleting a car
  const handleDeleteCar = async (car) => {
    if (isDeleting) return; // Prevent multiple simultaneous deletions

    console.log("🚗 DELETING CAR FROM STORE:");
    console.log(
      `  Deleted car: ${car.plateNumber} - ${car.make || car.brand} ${
        car.model
      } (${car.color})`
    );
    console.log(`  Car ID: ${car.id}`);
    console.log(`  User: ${userInfo?.user?.name || "Unknown"}`);

    setIsDeleting(true);

    try {
      // Call the deleteCar API
      const response = await deleteCar(car.id, userInfo?.user?.id, userCars);

      if (response.success) {
        // Store the deleted car info for notification
        setDeletedCar({
          make: car.make || car.brand,
          plateNumber: car.plateNumber,
        });

        // Update Redux state with the returned cars
        dispatch(setUserCars(response.userCars));

        // Show success notification
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
                  label="Phone:"
                  value={userData.phone}
                  style={{ marginBottom: 0 }}
                />
              </View>
            </View>

            {/* Car Details Section */}
            <View style={styles.section}>
              <SectionHeader
                title={userCars && userCars.length > 1 ? "Cars Details" : "Car Details"}
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
                  <Text style={styles.noCarsText}>
                    No cars added yet.
                  </Text>
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
                <Text style={styles.addCarText}>Add another car</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Delete success notification */}
      {deletedCar && (
        <DeleteNotification
          visible={showDeleteNotification}
          make={deletedCar.make}
          licensePlate={deletedCar.plateNumber}
          onClose={handleCloseNotification}
        />
      )}
    </ScreenContainer>
  );
};

export default Settings;
