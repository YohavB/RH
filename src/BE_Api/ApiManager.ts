import { Countries } from "../classes/RHClasses";

// Import both real and mock API implementations
import * as RealApiCalls from "./ApiCalls";
import * as MockApiCalls from "./MockApiCalls";

// Determine which API implementation to use based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Log the API mode being used
console.log(`🚀 API Manager initialized in ${process.env.NODE_ENV || 'development'} mode`);
console.log(`   Using ${isDevelopment ? 'MOCK' : 'REAL'} API calls`);
console.log('');

// Helper function to get the appropriate API implementation
const getApiImplementation = () => {
  return isDevelopment ? MockApiCalls : RealApiCalls;
};

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

// Additional method from mock API that might be useful
export const sendNeedToGoNotification = async (blockedCarPlate: string): Promise<any> => {
  const api = getApiImplementation();
  // Check if the method exists in the API implementation
  if ('sendNeedToGoNotification' in api) {
    return (api as any).sendNeedToGoNotification(blockedCarPlate);
  } else {
    // Fallback for real API that doesn't have this method yet
    console.warn('sendNeedToGoNotification not implemented in real API, using mock fallback');
    return MockApiCalls.sendNeedToGoNotification(blockedCarPlate);
  }
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
    mode: isDevelopment ? 'MOCK' : 'REAL',
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