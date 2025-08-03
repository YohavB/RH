import { store } from "../redux/store";
import { logout as logoutAction } from "../redux/actions";
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

/* AUTHENTICATION ENDPOINTS */

export const googleLogin = async (idToken: string): Promise<AuthResponseDTO> => {
  const api = getApiImplementation();
  return api.googleLogin(idToken);
};

export const facebookLogin = async (accessToken: string): Promise<AuthResponseDTO> => {
  const api = getApiImplementation();
  return api.facebookLogin(accessToken);
};

export const appleLogin = async (idToken: string): Promise<AuthResponseDTO> => {
  const api = getApiImplementation();
  return api.appleLogin(idToken);
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

export const createUser = async (userData: UserCreationDTO): Promise<UserDTO> => {
  const api = getApiImplementation();
  return api.createUser(userData);
};

export const getUserById = async (id: number): Promise<UserDTO> => {
  const api = getApiImplementation();
  return api.getUserById(id);
};

export const getUserByEmail = async (email: string): Promise<UserDTO> => {
  const api = getApiImplementation();
  return api.getUserByEmail(email);
};

export const updateUser = async (userData: UserDTO): Promise<UserDTO> => {
  const api = getApiImplementation();
  return api.updateUser(userData);
};

export const deactivateUser = async (userId: number): Promise<void> => {
  const api = getApiImplementation();
  return api.deactivateUser(userId);
};

export const activateUser = async (userId: number): Promise<void> => {
  const api = getApiImplementation();
  return api.activateUser(userId);
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

export const getUserCars = async (userId: number): Promise<UserCarsDTO> => {
  const api = getApiImplementation();
  return api.getUserCars(userId);
};

export const removeCarFromUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  const api = getApiImplementation();
  return api.removeCarFromUser(userId, carId);
};

/* CAR RELATIONS ENDPOINTS */

export const createCarBlockingRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO> => {
  const api = getApiImplementation();
  return api.createCarBlockingRelationship(blockingCarId, blockedCarId);
};

export const getCarRelations = async (carId: number): Promise<CarRelationsDTO> => {
  const api = getApiImplementation();
  return api.getCarRelations(carId);
};

export const removeCarBlockingRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO> => {
  const api = getApiImplementation();
  return api.removeCarBlockingRelationship(blockingCarId, blockedCarId);
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

/* LEGACY ENDPOINTS FOR BACKWARD COMPATIBILITY */

/* CARS API MANAGER */

export const findAllCars = async (): Promise<any[]> => {
  const api = getApiImplementation();
  return api.findAllCars();
};

export const findCarByPlateNumber = async (plateNumber: string, country: Countries): Promise<any> => {
  const api = getApiImplementation();
  return api.findCarByPlateNumber(plateNumber, country);
};

export const createOrUpdateCar = async (
  plateNumber: string, 
  country: Countries,
  userId: number | null,
): Promise<any> => {
  const api = getApiImplementation();
  return api.createOrUpdateCar(plateNumber, country, userId);
};

export const saveCar = async (carInfo: any, userId: string, existingCars: any[] = []): Promise<any> => {
  const api = getApiImplementation();
  return api.saveCar(carInfo, userId, existingCars);
};

export const deleteCar = async (carId: number, userId: string, existingCars: any[] = []): Promise<any> => {
  const api = getApiImplementation();
  return api.deleteCar(carId, userId, existingCars);
};

/* USERS CARS API MANAGER */

export const getAllUsersCars = async (): Promise<any> => {
  const api = getApiImplementation();
  return api.getAllUsersCars();
};

export const getUsersCarsByPlateNumber = async (plateNumber: string): Promise<any[]> => {
  const api = getApiImplementation();
  return api.getUsersCarsByPlateNumber(plateNumber);
};

export const getUsersCarsByUserId = async (userId: number): Promise<any[]> => {
  const api = getApiImplementation();
  return api.getUsersCarsByUserId(userId);
};

export const getUsersCarsByUserAndPlate = async (userId: number, plateNumber: string): Promise<any> => {
  const api = getApiImplementation();
  return api.getUsersCarsByUserAndPlate(userId, plateNumber);
};

export const getUsersCarsByBlockedPlateNumber = async (blockedPlateNumber: string): Promise<any> => {
  const api = getApiImplementation();
  return api.getUsersCarsByBlockedPlateNumber(blockedPlateNumber);
};

export const getUsersCarsByBlockingPlateNumber = async (blockingPlateNumber: string): Promise<any> => {
  const api = getApiImplementation();
  return api.getUsersCarsByBlockingPlateNumber(blockingPlateNumber);
};

export const updateBlockedCarByPlateNumber = async (
  blockingCarPlate: string,
  blockedCarPlate: string,
  userId: number,
  userStatus: any
): Promise<any> => {
  const api = getApiImplementation();
  return api.updateBlockedCarByPlateNumber(blockingCarPlate, blockedCarPlate, userId, userStatus);
};

export const releaseBlockedCarByPlateNumber = async (
  blockingCarPlate: string,
  blockedCarPlate: string,
  userId: number,
  userStatus: any
): Promise<any> => {
  const api = getApiImplementation();
  return api.releaseBlockedCarByPlateNumber(blockingCarPlate, blockedCarPlate, userId, userStatus);
};

/* USERS API MANAGER */

export const findAllUsers = async (): Promise<any> => {
  const api = getApiImplementation();
  return api.findAllUsers();
};

export const findUserById = async (id: number): Promise<any> => {
  const api = getApiImplementation();
  return api.findUserById(id);
};

export const findUserByEmail = async (email: string): Promise<any> => {
  const api = getApiImplementation();
  return api.findUserByEmail(email);
};

export const findUserByExternalId = async (externalId: string): Promise<any> => {
  const api = getApiImplementation();
  return api.findUserByExternalId(externalId);
};

export const createOrUpdateUser = async (userDTO: any): Promise<any> => {
  const api = getApiImplementation();
  return api.createOrUpdateUser(userDTO);
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