import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  Countries, 
  UserDTO, 
  CarDTO, 
  AuthResponseDTO, 
  UserCarsDTO, 
  CarRelationsDTO,
  UserCarRequestDTO,
  CarsRelationRequestDTO,
  FindCarRequestDTO,
  UserCreationDTO,
  OAuthLoginRequestDTO,
  HealthResponse,
  NotificationResponse,
  ErrorResponse,
  UserCarSituation
} from "../classes/RHClasses";
import { getApiUrl, isDevelopmentMode } from "../config/env";

// Use environment configuration to manage the base URL for different environments
const BASE_URL = getApiUrl();

// Create axios instance without auth header first
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log the API configuration
console.log(`🚀 API Configuration:`);
console.log(`   Base URL: ${BASE_URL}`);
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`   Development Mode: ${isDevelopmentMode()}`);
console.log(`   Connecting to local server on port 8008`);
console.log('');

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
const handleError = (error: any): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      console.log("Network error. Please check your connection.");
      return { cause: "Network error. Please check your connection.", errorCode: 0 };
    } else {
      const errorData = error.response.data as ErrorResponse;
      console.log(`Error: ${error.response.status} - ${errorData?.cause || 'Unknown error'}`);
      return errorData || { cause: 'Unknown error', errorCode: error.response.status };
    }
  } else {
    console.log("An unexpected error occurred.");
    return { cause: "An unexpected error occurred.", errorCode: 500 };
  }
};

// Helper function to make API calls
const apiCall = async <T>(url: string, method: 'get' | 'post' | 'put' | 'delete', data?: any): Promise<T> => {
  try {
    const response = await axiosInstance[method](url, data);
    return response.data;
  } catch (error) {
    const errorResponse = handleError(error);
    throw errorResponse;
  }
};

// Helper function to update auth token
export const updateAuthToken = async (token: string) => {
  await AsyncStorage.setItem('authToken', token);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Helper function to clear auth token
export const clearAuthToken = async () => {
  await AsyncStorage.removeItem('authToken');
  delete axiosInstance.defaults.headers.common['Authorization'];
};

/* HEALTH ENDPOINTS */

export const healthCheck = async (): Promise<HealthResponse> => {
  return apiCall<HealthResponse>('/api/v1/health', 'get');
};

/* AUTHENTICATION ENDPOINTS */

export const googleLogin = async (idToken: string): Promise<AuthResponseDTO> => {
  console.log('🔐 Making real Google login request to server...');
  const request: OAuthLoginRequestDTO = { token: idToken };
  const response = await apiCall<AuthResponseDTO>('/api/v1/auth/google', 'post', request);
  console.log('✅ Google login successful, updating auth token...');
  await updateAuthToken(response.token);
  return response;
};

export const facebookLogin = async (accessToken: string): Promise<AuthResponseDTO> => {
  const request: OAuthLoginRequestDTO = { token: accessToken };
  const response = await apiCall<AuthResponseDTO>('/api/v1/auth/facebook', 'post', request);
  await updateAuthToken(response.token);
  return response;
};

export const appleLogin = async (idToken: string): Promise<AuthResponseDTO> => {
  const request: OAuthLoginRequestDTO = { token: idToken };
  const response = await apiCall<AuthResponseDTO>('/api/v1/auth/apple', 'post', request);
  await updateAuthToken(response.token);
  return response;
};

export const refreshToken = async (): Promise<AuthResponseDTO> => {
  const response = await apiCall<AuthResponseDTO>('/api/v1/auth/refresh', 'post');
  await updateAuthToken(response.token);
  return response;
};

export const logout = async (): Promise<void> => {
  await apiCall('/api/v1/auth/logout', 'post');
  await clearAuthToken();
};

/* USER ENDPOINTS */

export const createUser = async (userData: UserCreationDTO): Promise<UserDTO> => {
  return apiCall<UserDTO>('/api/v1/user', 'post', userData);
};

export const getUserById = async (id: number): Promise<UserDTO> => {
  return apiCall<UserDTO>(`/api/v1/user?id=${id}`, 'get');
};

export const getUserByEmail = async (email: string): Promise<UserDTO> => {
  return apiCall<UserDTO>(`/api/v1/user/by-email?email=${encodeURIComponent(email)}`, 'get');
};

export const updateUser = async (userData: UserDTO): Promise<UserDTO> => {
  return apiCall<UserDTO>('/api/v1/user', 'put', userData);
};

export const deactivateUser = async (userId: number): Promise<void> => {
  return apiCall(`/api/v1/user/deactivate/${userId}`, 'put');
};

export const activateUser = async (userId: number): Promise<void> => {
  return apiCall(`/api/v1/user/activate/${userId}`, 'put');
};

/* CAR ENDPOINTS */

export const findOrCreateCar = async (plateNumber: string, country: Countries, userId?: number): Promise<CarDTO> => {
  const request: FindCarRequestDTO = { plateNumber, country, userId };
  return apiCall<CarDTO>('/api/v1/car', 'post', request);
};

/* USER-CAR ENDPOINTS */

export const assignCarToUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  const request: UserCarRequestDTO = { userId, carId };
  return apiCall<UserCarsDTO>('/api/v1/user-car', 'post', request);
};

export const getUserCars = async (userId: number): Promise<UserCarsDTO> => {
  console.log(`🚗 Fetching user cars for user ID: ${userId}`);
  const response = await apiCall<UserCarsDTO>(`/api/v1/user-car/by-user-id?userId=${userId}`, 'get');
  console.log(`✅ Found ${response.cars?.length || 0} cars for user`);
  return response;
};

export const removeCarFromUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  const request: UserCarRequestDTO = { userId, carId };
  return apiCall<UserCarsDTO>('/api/v1/user-car', 'delete', request);
};

/* CAR RELATIONS ENDPOINTS */

export const createCarBlockingRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO> => {
  const request: CarsRelationRequestDTO = {
    blockingCarId,
    blockedCarId,
    userCarSituation: UserCarSituation.IS_BLOCKING
  };
  return apiCall<CarRelationsDTO>('/api/v1/car-relations', 'post', request);
};

export const getCarRelations = async (carId: number): Promise<CarRelationsDTO> => {
  return apiCall<CarRelationsDTO>(`/api/v1/car-relations?carId=${carId}`, 'get');
};

export const removeCarBlockingRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO> => {
  const request: CarsRelationRequestDTO = {
    blockingCarId,
    blockedCarId,
    userCarSituation: UserCarSituation.IS_BLOCKING
  };
  return apiCall<CarRelationsDTO>('/api/v1/car-relations', 'delete', request);
};

export const removeAllCarRelations = async (carId: number): Promise<void> => {
  return apiCall(`/api/v1/car-relations/all-by-car-id?carId=${carId}`, 'delete');
};

/* NOTIFICATION ENDPOINTS */

export const sendNeedToGoNotification = async (blockedCarId: number): Promise<NotificationResponse> => {
  return apiCall<NotificationResponse>(`/api/v1/notification/send-need-to-go?blockedCarId=${blockedCarId}`, 'post');
};

/* LEGACY ENDPOINTS FOR BACKWARD COMPATIBILITY */

// Legacy car endpoints (deprecated - use new endpoints above)
export const findAllCars = async (): Promise<any[]> => {
  console.warn('findAllCars is deprecated. Use the new car endpoints instead.');
  return apiCall('/api/v1/cars', 'get');
};

export const findCarByPlateNumber = async (plateNumber: string, country: Countries): Promise<any> => {
  console.warn('findCarByPlateNumber is deprecated. Use findOrCreateCar instead.');
  return findOrCreateCar(plateNumber, country);
};

export const createOrUpdateCar = async (
  plateNumber: string, 
  country: Countries,
  userId: number | null,
): Promise<any> => {
  console.warn('createOrUpdateCar is deprecated. Use findOrCreateCar instead.');
  return findOrCreateCar(plateNumber, country, userId || undefined);
};

export const saveCar = async (carInfo: any, userId: string, existingCars: any[] = []): Promise<any> => {
  console.warn('saveCar is deprecated. Use findOrCreateCar and assignCarToUser instead.');
  // This would need to be implemented based on the legacy logic
  throw new Error('saveCar is deprecated. Please use the new car endpoints.');
};

export const deleteCar = async (carId: number, userId: string, existingCars: any[] = []): Promise<any> => {
  console.warn('deleteCar is deprecated. Use removeCarFromUser instead.');
  return removeCarFromUser(parseInt(userId), carId);
};

// Legacy user-car endpoints (deprecated - use new endpoints above)
export const getAllUsersCars = async (): Promise<any> => {
  console.warn('getAllUsersCars is deprecated. Use getUserCars with specific userId instead.');
  throw new Error('getAllUsersCars is deprecated. Please use getUserCars with a specific userId.');
};

export const getUsersCarsByPlateNumber = async (plateNumber: string): Promise<any[]> => {
  console.warn('getUsersCarsByPlateNumber is deprecated. Use findOrCreateCar and getCarRelations instead.');
  throw new Error('getUsersCarsByPlateNumber is deprecated. Please use the new car endpoints.');
};

export const getUsersCarsByUserId = async (userId: number): Promise<any[]> => {
  console.warn('getUsersCarsByUserId is deprecated. Use getUserCars instead.');
  const result = await getUserCars(userId);
  return result.cars;
};

export const getUsersCarsByUserAndPlate = async (userId: number, plateNumber: string): Promise<any> => {
  console.warn('getUsersCarsByUserAndPlate is deprecated. Use findOrCreateCar and getUserCars instead.');
  throw new Error('getUsersCarsByUserAndPlate is deprecated. Please use the new car endpoints.');
};

export const getUsersCarsByBlockedPlateNumber = async (blockedPlateNumber: string): Promise<any> => {
  console.warn('getUsersCarsByBlockedPlateNumber is deprecated. Use getCarRelations instead.');
  throw new Error('getUsersCarsByBlockedPlateNumber is deprecated. Please use getCarRelations instead.');
};

export const getUsersCarsByBlockingPlateNumber = async (blockingPlateNumber: string): Promise<any> => {
  console.warn('getUsersCarsByBlockingPlateNumber is deprecated. Use getCarRelations instead.');
  throw new Error('getUsersCarsByBlockingPlateNumber is deprecated. Please use getCarRelations instead.');
};

export const updateBlockedCarByPlateNumber = async (
  blockingCarPlate: string,
  blockedCarPlate: string,
  userId: number,
  userStatus: any
): Promise<any> => {
  console.warn('updateBlockedCarByPlateNumber is deprecated. Use createCarBlockingRelationship instead.');
  throw new Error('updateBlockedCarByPlateNumber is deprecated. Please use createCarBlockingRelationship instead.');
};

export const releaseBlockedCarByPlateNumber = async (
  blockingCarPlate: string,
  blockedCarPlate: string,
  userId: number,
  userStatus: any
): Promise<any> => {
  console.warn('releaseBlockedCarByPlateNumber is deprecated. Use removeCarBlockingRelationship instead.');
  throw new Error('releaseBlockedCarByPlateNumber is deprecated. Please use removeCarBlockingRelationship instead.');
};

// Legacy user endpoints (deprecated - use new endpoints above)
export const findAllUsers = async (): Promise<any> => {
  console.warn('findAllUsers is deprecated. Use getUserById or getUserByEmail instead.');
  throw new Error('findAllUsers is deprecated. Please use getUserById or getUserByEmail instead.');
};

export const findUserById = async (id: number): Promise<any> => {
  console.warn('findUserById is deprecated. Use getUserById instead.');
  return getUserById(id);
};

export const findUserByEmail = async (email: string): Promise<any> => {
  console.warn('findUserByEmail is deprecated. Use getUserByEmail instead.');
  return getUserByEmail(email);
};

export const findUserByExternalId = async (externalId: string): Promise<any> => {
  console.warn('findUserByExternalId is deprecated. This endpoint is not available in the new API.');
  throw new Error('findUserByExternalId is deprecated. This endpoint is not available in the new API.');
};

export const createOrUpdateUser = async (userDTO: any): Promise<any> => {
  console.warn('createOrUpdateUser is deprecated. Use createUser or updateUser instead.');
  if (userDTO.id) {
    return updateUser(userDTO);
  } else {
    return createUser(userDTO);
  }
};