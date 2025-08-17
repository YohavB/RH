import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";
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
  OAuthLoginRequestDTO,
  HealthResponse,
  NotificationResponse,
  ErrorResponse,
  UserCarSituation
} from "./ServerDTOs";
import { getApiUrl, isDevelopmentMode } from "../config/env";

// Use environment configuration to manage the base URL for different environments
let BASE_URL = getApiUrl();

// Create axios instance without auth header first
let axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  timeoutErrorMessage: 'Request timeout - server not responding',
});

// Log the API configuration
console.log(`🚀 API Configuration:`);
console.log(`   Base URL: ${BASE_URL}`);
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`   Development Mode: ${isDevelopmentMode()}`);
console.log(`   Connecting to local server on port 8008`);
console.log('');

// Function to get auth token from Redux store
const getAuthTokenFromStore = (): string | null => {
  const state = store.getState();
  return state.user.userToken;
};

// Add auth token to requests if available
const setupAuthHeader = () => {
  const token = getAuthTokenFromStore();
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Common error handler function
const handleError = (error: any): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      // Network error or timeout
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        console.log("❌ Request timeout - server not responding");
        return { cause: "Request timeout - server not responding. Please check if your server is running on port 8008.", errorCode: 0 };
      } else {
        console.log("❌ Network error. Please check your connection.");
        return { cause: "Network error. Please check your connection and ensure the server is running.", errorCode: 0 };
      }
    } else {
      const errorData = error.response.data as ErrorResponse;
      console.log(`❌ Error: ${error.response.status} - ${errorData?.cause || 'Unknown error'}`);
      return errorData || { cause: 'Unknown error', errorCode: error.response.status };
    }
  } else {
    console.log("❌ An unexpected error occurred.");
    return { cause: "An unexpected error occurred.", errorCode: 500 };
  }
};

// Helper function to make API calls
const apiCall = async <T>(url: string, method: 'get' | 'post' | 'put' | 'delete', data?: any): Promise<T> => {
  try {
    // Setup auth header before each request
    setupAuthHeader();
    
    console.log(`🌐 Making ${method.toUpperCase()} request to: ${BASE_URL}${url}`);
    if (data) {
      console.log(`📤 Request data:`, JSON.stringify(data, null, 2));
    }
    
    const response = await axiosInstance[method](url, data);
    
    console.log(`✅ Response received:`, response.status);
    return response.data;
  } catch (error) {
    const errorResponse = handleError(error);
    throw errorResponse;
  }
};

// Helper function to update auth token in Redux store
export const updateAuthToken = async (token: string) => {
  const { setAuthToken } = await import("../redux/actions");
  setAuthToken(token)(store.dispatch);
  setupAuthHeader();
};

// Helper function to clear auth token from Redux store
export const clearAuthToken = async () => {
  const { setAuthToken } = await import("../redux/actions");
  setAuthToken("")(store.dispatch);
  setupAuthHeader();
};

/* HEALTH ENDPOINTS */

export const healthCheck = async (): Promise<HealthResponse> => {
  return apiCall<HealthResponse>('/api/v1/health', 'get');
};

// Test server connectivity
export const testServerConnectivity = async (): Promise<boolean> => {
  try {
    console.log('🔍 Testing server connectivity...');
    const response = await healthCheck();
    console.log('✅ Server is reachable:', response);
    return true;
  } catch (error) {
    console.log('❌ Server connectivity test failed:', error);
    return false;
  }
};

/* AUTHENTICATION ENDPOINTS */

export const googleLogin = async (idToken: string, agreedConsent?: boolean): Promise<AuthResponseDTO> => {
  console.log('🔐 Making real Google login request to server...');
  console.log(`🔑 ID Token length: ${idToken?.length || 0} characters`);
  
  if (!idToken) {
    throw { cause: "No ID token provided", errorCode: 400 };
  }
  
  const request: OAuthLoginRequestDTO = { token: idToken };
  let url = '/api/v1/auth/google';
  
  if (agreedConsent !== undefined) {
    url += `?agreedConsent=${agreedConsent}`;
  }
  
  try {
    const response = await apiCall<AuthResponseDTO>(url, 'post', request);
    console.log('✅ Google login successful, updating auth token...');
    await updateAuthToken(response.token);
    return response;
  } catch (error) {
    console.log('❌ Google login failed:', error);
    throw error;
  }
};

export const facebookLogin = async (accessToken: string, agreedConsent?: boolean): Promise<AuthResponseDTO> => {
  const request: OAuthLoginRequestDTO = { token: accessToken };
  let url = '/api/v1/auth/facebook';
  
  if (agreedConsent !== undefined) {
    url += `?agreedConsent=${agreedConsent}`;
  }
  
  const response = await apiCall<AuthResponseDTO>(url, 'post', request);
  await updateAuthToken(response.token);
  return response;
};

export const appleLogin = async (idToken: string, agreedConsent?: boolean): Promise<AuthResponseDTO> => {
  const request: OAuthLoginRequestDTO = { token: idToken };
  let url = '/api/v1/auth/apple';
  
  if (agreedConsent !== undefined) {
    url += `?agreedConsent=${agreedConsent}`;
  }
  
  const response = await apiCall<AuthResponseDTO>(url, 'post', request);
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

export const getCurrentUser = async (): Promise<UserDTO> => {
  return apiCall<UserDTO>('/api/v1/user', 'get');
};

export const deactivateCurrentUser = async (): Promise<void> => {
  return apiCall('/api/v1/user/deactivate', 'put');
};

export const updatePushNotificationToken = async (pushNotificationToken: string): Promise<UserDTO> => {
  return apiCall<UserDTO>('/api/v1/user/push-notification-token', 'put', pushNotificationToken);
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

export const getCurrentUserCars = async (): Promise<UserCarsDTO> => {
  console.log(`🚗 Fetching current user's cars`);
  const response = await apiCall<UserCarsDTO>('/api/v1/user-car', 'get');
  console.log(`✅ Found ${response.cars?.length || 0} cars for current user`);
  return response;
};

export const removeCarFromUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  const request: UserCarRequestDTO = { userId, carId };
  return apiCall<UserCarsDTO>('/api/v1/user-car', 'delete', request);
};

/* CAR RELATIONS ENDPOINTS */

export const createCarRelationship = async (
  blockingCarId: number, 
  blockedCarId: number,
  userCarSituation: UserCarSituation
): Promise<CarRelationsDTO[]> => {
  const request: CarsRelationRequestDTO = {
    blockingCarId,
    blockedCarId,
    userCarSituation
  };
  return apiCall<CarRelationsDTO[]>('/api/v1/car-relations', 'post', request);
};

export const getCarRelationsByCarId = async (carId: number): Promise<CarRelationsDTO> => {
  return apiCall<CarRelationsDTO>(`/api/v1/car-relations/by-car-id?carId=${carId}`, 'get');
};

export const getCurrentUserCarRelations = async (): Promise<CarRelationsDTO[]> => {
  return apiCall<CarRelationsDTO[]>('/api/v1/car-relations/by-user', 'get');
};

export const removeCarRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO[]> => {
  const request: CarsRelationRequestDTO = {
    blockingCarId,
    blockedCarId,
    userCarSituation: UserCarSituation.IS_BLOCKING
  };
  return apiCall<CarRelationsDTO[]>('/api/v1/car-relations', 'delete', request);
};

export const removeAllCarRelations = async (carId: number): Promise<void> => {
  return apiCall(`/api/v1/car-relations/all-by-car-id?carId=${carId}`, 'delete');
};

/* NOTIFICATION ENDPOINTS */

export const sendNeedToGoNotification = async (blockedCarId: number): Promise<NotificationResponse> => {
  return apiCall<NotificationResponse>(`/api/v1/notification/send-need-to-go?blockedCarId=${blockedCarId}`, 'post');
};

