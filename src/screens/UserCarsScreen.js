import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserCars } from '../redux/actions';
import ScreenContainer from '../components/ScreenContainer';
import styles from '../styles/UserCarsStyles';
import { Colors } from '../styles/GlobalStyle';

const UserCarsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const plateNumber = route.params?.detectedPlate || '';
  const { userInfo } = useSelector((state) => state.user) || {};
  const userName = userInfo?.user?.name || 'Ben Jacobs';
  
  // Mock car details - in a real app, this would come from API
  const [carDetails, setCarDetails] = useState({
    owner: userName,
    licensePlate: plateNumber,
    make: 'Kia',
    model: 'Sportage',
    year: '2023',
    color: 'White',
    image: { uri: 'https://cdn.pixabay.com/photo/2018/03/21/18/16/kia-sportage-3247649_960_720.jpg' },
  });
  
  // Simulate fetching car details from API based on license plate
  useEffect(() => {
    if (plateNumber) {
      fetchCarDetails(plateNumber);
    }
  }, [plateNumber]);
  
  // Mock API call to fetch car details
  const fetchCarDetails = (plate) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would be an actual API call
      setCarDetails({
        owner: userName,
        licensePlate: plate,
        make: 'Kia',
        model: 'Sportage',
        year: '2023',
        color: 'White',
        image: { uri: 'https://cdn.pixabay.com/photo/2018/03/21/18/16/kia-sportage-3247649_960_720.jpg' },
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Handle confirming car details
  const handleConfirm = () => {
    // Show loading state
    setIsLoading(true);
    
    // Simulate API call to save car
    setTimeout(() => {
      // Create car object to save to Redux
      const car = {
        id: Math.floor(Math.random() * 1000),
        plateNumber: carDetails.licensePlate,
        make: carDetails.make,
        model: carDetails.model,
        year: carDetails.year,
        color: carDetails.color,
      };
      
      // Update Redux with the registered car
      dispatch(setUserCars([car]));
      
      // Navigate to Main screen
      setIsLoading(false);
      navigation.replace('Main');
    }, 1000);
  };
  
  // Handle adding another car
  const handleAddAnotherCar = () => {
    // Go back to Welcome screen to enter another plate
    navigation.navigate('Welcome');
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={Colors.mainOrange} />
          <Text style={{ marginTop: 20, fontFamily: 'Poppins_500Medium' }}>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }
  
  return (
    <ScreenContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>All set.</Text>
          <Text style={styles.subHeaderText}>Here are your car details:</Text>
        </View>
        
        <View style={styles.cardContainer}>
          <View style={styles.carImageContainer}>
            <Image 
              source={carDetails.image}
              style={styles.carImage}
            />
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Owner:</Text>
            <Text style={styles.detailValue}>{carDetails.owner}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>License #:</Text>
            <Text style={styles.detailValue}>{carDetails.licensePlate}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Make:</Text>
            <Text style={styles.detailValue}>{carDetails.make}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Model:</Text>
            <Text style={styles.detailValue}>{carDetails.model}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Year:</Text>
            <Text style={styles.detailValue}>{carDetails.year}</Text>
          </View>
          
          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <Text style={styles.detailLabel}>Color:</Text>
            <Text style={styles.detailValue}>{carDetails.color}</Text>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.addCarButton}
            onPress={handleAddAnotherCar}
          >
            <Text style={styles.addCarText}>Add another car</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.okButton}
            onPress={handleConfirm}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default UserCarsScreen; 