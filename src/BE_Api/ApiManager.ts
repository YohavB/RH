import { store } from "../redux/store";
import { logout as logoutAction } from "../redux/actions";
import { 
  Countries, 
  UserDTO, 
  CarDTO, 
  AuthResponseDTO, 
  UserCarsDTO, 
  CarRelationsDTO,
  HealthResponse,
  NotificationResponse,
  ErrorResponse,
  UserCarSituation
} from "./ServerDTOs";

// Import both real and mock API implementations
import * as RealApiCalls from "./ApiCalls";
import * as MockApiCalls from "./MockApiCalls";

// Determine which API implementation to use based on environment
// Force using REAL API calls for now
const nodeEnv = process.env.NODE_ENV || 'development';
const isDevelopment = nodeEnv === 'development';
const isProduction = nodeEnv === 'production';

// Log the API mode being used
console.log(`🚀 API Manager initialized in ${nodeEnv} mode`);
console.log(`   Using REAL API calls to server on port 8008`);
console.log('');

// Helper function to get the appropriate API implementation
const getApiImplementation = () => {
  return RealApiCalls; // Always use real API calls
};

/* HEALTH ENDPOINTS */

export const healthCheck = async (): Promise<HealthResponse> => {
  const api = getApiImplementation();
  return api.healthCheck();
};

export const testServerConnectivity = async (): Promise<boolean> => {
  const api = getApiImplementation();
  return api.testServerConnectivity();
};

/* AUTHENTICATION ENDPOINTS */

export const googleLogin = async (idToken: string, agreedConsent?: boolean): Promise<AuthResponseDTO> => {
  const api = getApiImplementation();
  return api.googleLogin(idToken, agreedConsent);
};

export const facebookLogin = async (accessToken: string, agreedConsent?: boolean): Promise<AuthResponseDTO> => {
  const api = getApiImplementation();
  return api.facebookLogin(accessToken, agreedConsent);
};

export const appleLogin = async (idToken: string, agreedConsent?: boolean): Promise<AuthResponseDTO> => {
  const api = getApiImplementation();
  return api.appleLogin(idToken, agreedConsent);
};

export const refreshToken = async (): Promise<AuthResponseDTO> => {
  const api = getApiImplementation();
  return api.refreshToken();
};

export const logout = async (): Promise<void> => {
  const api = getApiImplementation();
  await api.logout();
  // Clear Redux state by calling the thunk action
  logoutAction()(store.dispatch);
};

/* USER ENDPOINTS */

export const getCurrentUser = async (): Promise<UserDTO> => {
  const api = getApiImplementation();
  return api.getCurrentUser();
};

export const deactivateCurrentUser = async (): Promise<void> => {
  const api = getApiImplementation();
  return api.deactivateCurrentUser();
};

export const updatePushNotificationToken = async (pushNotificationToken: string): Promise<UserDTO> => {
  const api = getApiImplementation();
  return api.updatePushNotificationToken(pushNotificationToken);
};



/* CAR ENDPOINTS */

export const findOrCreateCar = async (plateNumber: string, country: Countries, userId?: number): Promise<CarDTO> => {
  const api = getApiImplementation();
  return api.findOrCreateCar(plateNumber, country, userId);
};

/* USER-CAR ENDPOINTS */

export const assignCarToUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  const api = getApiImplementation();
  return api.assignCarToUser(userId, carId);
};

export const getCurrentUserCars = async (): Promise<UserCarsDTO> => {
  const api = getApiImplementation();
  return api.getCurrentUserCars();
};



export const removeCarFromUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  const api = getApiImplementation();
  return api.removeCarFromUser(userId, carId);
};

/* CAR RELATIONS ENDPOINTS */

export const createCarRelationship = async (
  blockingCarId: number, 
  blockedCarId: number,
  userCarSituation: UserCarSituation
): Promise<CarRelationsDTO> => {
  const api = getApiImplementation();
  return api.createCarRelationship(blockingCarId, blockedCarId, userCarSituation);
};

export const getCarRelations = async (carId: number): Promise<CarRelationsDTO> => {
  const api = getApiImplementation();
  return api.getCarRelationsByCarId(carId);
};

export const getCurrentUserCarRelations = async (): Promise<CarRelationsDTO[]> => {
  const api = getApiImplementation();
  return api.getCurrentUserCarRelations();
};

export const removeCarRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO> => {
  const api = getApiImplementation();
  return api.removeCarRelationship(blockingCarId, blockedCarId);
};

export const removeAllCarRelations = async (carId: number): Promise<void> => {
  const api = getApiImplementation();
  return api.removeAllCarRelations(carId);
};

/* NOTIFICATION ENDPOINTS */

export const sendNeedToGoNotification = async (blockedCarId: number): Promise<NotificationResponse> => {
  const api = getApiImplementation();
  return api.sendNeedToGoNotification(blockedCarId);
};



// Utility function to check current API mode
export const getApiMode = () => {
  return {
    isDevelopment,
    isProduction,
    mode: 'REAL',
    nodeEnv: process.env.NODE_ENV || 'development'
  };
};

// Utility function to force switch to mock API (useful for testing)
export const forceMockMode = () => {
  console.log('🔧 Forcing MOCK API mode for testing');
  return MockApiCalls;
};

// Utility function to force switch to real API
export const forceRealMode = () => {
  console.log('🔧 Forcing REAL API mode');
  return RealApiCalls;
}; 