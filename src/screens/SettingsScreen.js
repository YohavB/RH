import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserCars } from '../redux/actions';
import ScreenContainer from '../components/ScreenContainer';
import styles from '../styles/SettingsScreenStyles';
import { PersonIcon, CarIcon, BackIcon } from '../components/Icons';
import SectionHeader from '../components/SectionHeader';
import InfoField from '../components/InfoField';
import CarCard from '../components/CarCard';
import DeleteNotification from '../components/DeleteNotification';
import { ScreenNames } from '../classes/RHClasses';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user) || {};
  const { userCars } = useSelector((state) => state.car) || { userCars: [] };
  
  const [deletedCar, setDeletedCar] = useState(null);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  
  // Mock user data - in a real app, this would come from Redux or API
  const userData = {
    name: userInfo?.user?.name || 'Ben Jacobs',
    email: userInfo?.user?.email || 'Ben@sunbit.com',
    phone: userInfo?.user?.phone || '058-089-2242',
  };
  
  // Screen load logging
  useEffect(() => {
    console.log("Settings Screen Loaded");
  }, []);
  
  // Handle deleting a car
  const handleDeleteCar = (car) => {
    // Store the deleted car info for notification
    setDeletedCar({
      make: car.make,
      plateNumber: car.plateNumber
    });
    
    // Update Redux state to remove the car
    const updatedCars = userCars.filter(c => c.id !== car.id);
    dispatch(setUserCars(updatedCars));
    
    // Show success notification
    setShowDeleteNotification(true);
  };
  
  // Handle closing the delete notification
  const handleCloseNotification = () => {
    setShowDeleteNotification(false);
    setDeletedCar(null);
  };
  
  // Navigate to add car screen
  const handleAddCar = () => {
    navigation.navigate(ScreenNames.ADD_CAR, {
      source: ScreenNames.SETTINGS
    });
  };
  
  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };
  
  return (
    <ScreenContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackIcon />
          </TouchableOpacity>
        </View>
        
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
              <InfoField 
                label="Name:" 
                value={userData.name} 
              />
              
              <InfoField 
                label="Email:" 
                value={userData.email} 
              />
              
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
              title="Car Details" 
              icon={
                <View style={styles.iconContainer}>
                  <CarIcon />
                </View>
              }
            />
            
            {/* Display user cars if any */}
            {userCars && userCars.length > 0 ? (
              userCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onDelete={handleDeleteCar} 
                />
              ))
            ) : (
              <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                No cars added yet
              </Text>
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
