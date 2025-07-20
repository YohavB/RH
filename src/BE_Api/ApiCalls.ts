import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Countries } from "../classes/RHClasses";

// Use environment variables to manage the base URL for different environments
const BASE_URL = process.env.API_BASE_URL || "http://localhost:8008";

// Create axios instance without auth header first
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to requests if available
const setupAuthHeader = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error setting up auth header:", error);
  }
};

// Call setup once
setupAuthHeader();

// Common error handler function
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      console.log("Network error. Please check your connection.");
    } else {
      console.log(`Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    }
  } else {
    console.log("An unexpected error occurred.");
  }
};

// Helper function to make API calls
const apiCall = async (url: string, method: 'get' | 'post', data?: any) => {
  try {
    const response = await axiosInstance[method](url, data);
    return response.data;
  } catch (error) {
    handleError(error); // Call the error handler
    throw error; // Re-throw the error after logging it
  }
};

/* CARS API */
const CARS_URL = `${BASE_URL}/api/cars`;

export const findAllCars = async (): Promise<any[]> => {
  return apiCall(`${CARS_URL}/`, 'get');
};

export const findCarByPlateNumber = async (plateNumber: string, country: Countries): Promise<any> => {
  return apiCall(`${CARS_URL}/by-plate?plateNumber=${plateNumber}&country=${country}`, 'get');
};

export const createOrUpdateCar = async (
  plateNumber: string, 
  country: Countries,
  userId: number | null,
): Promise<any> => {
  return apiCall(`${CARS_URL}/car`, 'post', { plateNumber, userId, country });
};

export const saveCar = async (carInfo: any, userId: string, existingCars: any[] = []): Promise<any> => {
  console.log('🚗 API CALL - saveCar():');
  console.log(`  Car: ${carInfo.plateNumber} - ${carInfo.brand} ${carInfo.model}`);
  console.log(`  User ID: ${userId}`);
  console.log(`  Existing cars: ${existingCars.length}`);
  console.log(`  Mode: ${process.env.NODE_ENV === 'development' ? 'DEMO' : 'PRODUCTION'}`);
  
  // For demo mode, return a mock response with saved user cars
  if (process.env.NODE_ENV === 'development') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a unique ID for the new car
    const newCarId = Math.floor(Math.random() * 10000);
    
    // Create the new car object
    const newCar = {
      id: newCarId,
      plateNumber: carInfo.plateNumber,
      country: carInfo.country,
      brand: carInfo.brand,
      model: carInfo.model,
      color: carInfo.color,
      carLicenseExpireDate: carInfo.expiryDate,
      isBlocking: false,
      isBlocked: false,
      // Add some additional properties that might be needed
      make: carInfo.brand,
      year: '2020',
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Mock response - return all existing cars plus the new one
    const mockResponse = {
      success: true,
      message: 'Car saved successfully',
      userCars: [...existingCars, newCar]
    };
    
    console.log('🚗 API RESPONSE - saveCar():');
    console.log(`  Success: ${mockResponse.success}`);
    console.log(`  Message: ${mockResponse.message}`);
    console.log(`  Previous cars: ${existingCars.length}`);
    console.log(`  New car added: ${carInfo.plateNumber}`);
    console.log(`  Total returned cars: ${mockResponse.userCars.length}`);
    console.log('  All cars:');
    mockResponse.userCars.forEach((car, index) => {
      console.log(`    ${index + 1}. ${car.plateNumber} - ${car.brand} ${car.model} (${car.color})`);
    });
    console.log('');
    
    return mockResponse;
  } else {
    // In production, make real API call
    return apiCall(`${CARS_URL}/save`, 'post', { carInfo, userId, existingCars });
  }
};

export const deleteCar = async (carId: number, userId: string, existingCars: any[] = []): Promise<any> => {
  console.log('🚗 API CALL - deleteCar():');
  console.log(`  Car ID: ${carId}`);
  console.log(`  User ID: ${userId}`);
  console.log(`  Existing cars: ${existingCars.length}`);
  console.log(`  Mode: ${process.env.NODE_ENV === 'development' ? 'DEMO' : 'PRODUCTION'}`);
  
  // For demo mode, return a mock response with remaining user cars
  if (process.env.NODE_ENV === 'development') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find the car to delete for logging
    const carToDelete = existingCars.find(car => car.id === carId);
    
    // Filter out the deleted car
    const remainingCars = existingCars.filter(car => car.id !== carId);

    // Mock response - return remaining cars after deletion
    const mockResponse = {
      success: true,
      message: 'Car deleted successfully',
      userCars: remainingCars
    };
    
    console.log('🚗 API RESPONSE - deleteCar():');
    console.log(`  Success: ${mockResponse.success}`);
    console.log(`  Message: ${mockResponse.message}`);
    if (carToDelete) {
      console.log(`  Deleted car: ${carToDelete.plateNumber} - ${carToDelete.brand} ${carToDelete.model}`);
    }
    console.log(`  Previous cars: ${existingCars.length}`);
    console.log(`  Remaining cars: ${mockResponse.userCars.length}`);
    if (mockResponse.userCars.length > 0) {
      console.log('  Remaining cars:');
      mockResponse.userCars.forEach((car, index) => {
        console.log(`    ${index + 1}. ${car.plateNumber} - ${car.brand} ${car.model} (${car.color})`);
      });
    } else {
      console.log('  No cars remaining');
    }
    console.log('');
    
    return mockResponse;
  } else {
    // In production, make real API call
    return apiCall(`${CARS_URL}/delete`, 'post', { carId, userId });
  }
};

/* USERS CARS API */
const USERS_CARS_URL = `${BASE_URL}/api/users-cars`;

export const getAllUsersCars = async (): Promise<any> => {
  return apiCall(`${USERS_CARS_URL}/car`, 'post');
};

export const getUsersCarsByPlateNumber = async (plateNumber: string): Promise<any[]> => {
  return apiCall(`${USERS_CARS_URL}/car`, 'post', { params: { plateNumber } });
};

export const getUsersCarsByUserId = async (userId: number): Promise<any[]> => {
  return apiCall(`${USERS_CARS_URL}/by-user`, 'post', { params: { userId } });
};

export const getUsersCarsByUserAndPlate = async (userId: number, plateNumber: string): Promise<any> => {
  return apiCall(`${USERS_CARS_URL}/by-user-and-plate`, 'post', { params: { userId, plateNumber } });
};

export const getUsersCarsByBlockedPlateNumber = async (blockedPlateNumber: string): Promise<any> => {
  return apiCall(`${USERS_CARS_URL}/blocked`, 'post', { params: { blockedPlateNumber } });
};

export const getUsersCarsByBlockingPlateNumber = async (blockingPlateNumber: string): Promise<any> => {
  return apiCall(`${USERS_CARS_URL}/blocking`, 'post', { params: { blockingPlateNumber } });
};

export const updateBlockedCarByPlateNumber = async (
    blockingCarPlate: string,
    blockedCarPlate: string,
    userId: number,
    userStatus: any
): Promise<any> => {
  return apiCall(`${USERS_CARS_URL}/update-blocked`, 'post', {
    params: { blockingCarPlate, blockedCarPlate, userId, userStatus },
  });
};

export const releaseBlockedCarByPlateNumber = async (
    blockingCarPlate: string,
    blockedCarPlate: string,
    userId: number,
    userStatus: any
): Promise<any> => {
  return apiCall(`${USERS_CARS_URL}/release-blocked`, 'post', {
    params: { blockingCarPlate, blockedCarPlate, userId, userStatus },
  });
};

/* USERS API */
const USERS_URL = `${BASE_URL}/api/users`;

export const findAllUsers = async (): Promise<any> => {
  return apiCall(`${USERS_URL}/`, 'get');
};

export const findUserById = async (id: number): Promise<any> => {
  return apiCall(`${USERS_URL}/by-id`, 'get', { params: { id } });
};

export const findUserByEmail = async (email: string): Promise<any> => {
  return apiCall(`${USERS_URL}/by-email`, 'get', { params: { email } });
};

export const findUserByExternalId = async (externalId: string): Promise<any> => {
  return apiCall(`${USERS_URL}/by-external-id`, 'get', { params: { externalId } });
};

export const createOrUpdateUser = async (userDTO: any): Promise<any> => {
  return apiCall(`${USERS_URL}/`, 'post', userDTO);
};