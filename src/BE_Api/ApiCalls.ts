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
  return apiCall(`${CARS_URL}/save`, 'post', { carInfo, userId, existingCars });
};

export const deleteCar = async (carId: number, userId: string, existingCars: any[] = []): Promise<any> => {
  return apiCall(`${CARS_URL}/delete`, 'post', { carId, userId });
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