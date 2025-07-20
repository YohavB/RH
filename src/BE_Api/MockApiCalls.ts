import { Countries } from "../classes/RHClasses";

// Mock data types based on backend entities
interface MockCar {
  plateNumber: string;
  country: Countries;
  brand: string;
  model: string;
  color: string;
  carLicenseExpireDate?: string;
  isBlocking: boolean;
  isBlocked: boolean;
  creationTime?: string;
  updateTime?: string;
}

interface MockUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  pushNotificationToken: string;
  urlPhoto?: string;
  userCars?: MockCar[];
}

interface MockUsersCars {
  userId: number;
  userCar: string;
  blockingCar?: string;
  blockedCar?: string;
}

// Mock data storage
let mockCars: MockCar[] = [
  {
    plateNumber: "1234567",
    country: Countries.IL,
    brand: "Toyota",
    model: "Corolla",
    color: "White",
    isBlocking: false,
    isBlocked: false,
    creationTime: new Date().toISOString(),
    updateTime: new Date().toISOString()
  },
  {
    plateNumber: "7654321",
    country: Countries.IL,
    brand: "Honda",
    model: "Civic",
    color: "Black",
    isBlocking: true,
    isBlocked: false,
    creationTime: new Date().toISOString(),
    updateTime: new Date().toISOString()
  }
];

let mockUsers: MockUser[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    pushNotificationToken: "mock_token_1",
    urlPhoto: "https://example.com/photo1.jpg"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    pushNotificationToken: "mock_token_2"
  }
];

let mockUsersCars: MockUsersCars[] = [
  {
    userId: 1,
    userCar: "1234567",
    blockingCar: undefined,
    blockedCar: undefined
  },
  {
    userId: 2,
    userCar: "7654321",
    blockingCar: "1234567",
    blockedCar: undefined
  }
];

// Helper function to simulate API delay
const simulateDelay = async (ms: number = 500) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to log API calls
const logApiCall = (method: string, endpoint: string, data?: any) => {
  console.log(`🔧 MOCK API CALL - ${method} ${endpoint}`);
  if (data) {
    console.log(`  Data:`, data);
  }
};

const logApiResponse = (response: any) => {
  console.log(`🔧 MOCK API RESPONSE:`, response);
  console.log('');
};

/* CARS API MOCK IMPLEMENTATIONS */

export const findAllCars = async (): Promise<MockCar[]> => {
  logApiCall('GET', '/api/cars/');
  await simulateDelay();
  
  const response = {
    success: true,
    message: 'Successfully retrieved all cars',
    data: mockCars
  };
  
  logApiResponse(response);
  return response.data;
};

export const findCarByPlateNumber = async (plateNumber: string, country: Countries): Promise<MockCar> => {
  logApiCall('GET', `/api/cars/by-plate?plateNumber=${plateNumber}&country=${country}`);
  await simulateDelay();
  
  const car = mockCars.find(c => c.plateNumber === plateNumber && c.country === country);
  
  if (!car) {
    throw new Error(`Car not found with plate number: ${plateNumber}`);
  }
  
  const response = {
    success: true,
    message: 'Successfully found car by plate',
    data: car
  };
  
  logApiResponse(response);
  return response.data;
};

export const createOrUpdateCar = async (
  plateNumber: string, 
  country: Countries,
  userId: number | null,
): Promise<MockCar> => {
  logApiCall('POST', '/api/cars/car', { plateNumber, country, userId });
  await simulateDelay();
  
  const existingCarIndex = mockCars.findIndex(c => c.plateNumber === plateNumber && c.country === country);
  
  const carData: MockCar = {
    plateNumber,
    country,
    brand: "Unknown",
    model: "Unknown",
    color: "Unknown",
    isBlocking: false,
    isBlocked: false,
    creationTime: new Date().toISOString(),
    updateTime: new Date().toISOString()
  };
  
  if (existingCarIndex >= 0) {
    mockCars[existingCarIndex] = { ...mockCars[existingCarIndex], ...carData };
  } else {
    mockCars.push(carData);
  }
  
  const response = {
    success: true,
    message: 'Successfully created or updated car',
    data: carData
  };
  
  logApiResponse(response);
  return response.data;
};

export const saveCar = async (carInfo: any, userId: string, existingCars: any[] = []): Promise<any> => {
  logApiCall('POST', '/api/cars/save', { carInfo, userId, existingCars });
  await simulateDelay();
  
  const newCar: MockCar = {
    plateNumber: carInfo.plateNumber,
    country: carInfo.country,
    brand: carInfo.brand,
    model: carInfo.model,
    color: carInfo.color,
    carLicenseExpireDate: carInfo.expiryDate,
    isBlocking: false,
    isBlocked: false,
    creationTime: new Date().toISOString(),
    updateTime: new Date().toISOString()
  };
  
  // Add to mock cars if not exists
  const existingCarIndex = mockCars.findIndex(c => c.plateNumber === carInfo.plateNumber);
  if (existingCarIndex >= 0) {
    mockCars[existingCarIndex] = newCar;
  } else {
    mockCars.push(newCar);
  }
  
  const response = {
    success: true,
    message: 'Car saved successfully',
    userCars: [...existingCars, newCar]
  };
  
  logApiResponse(response);
  return response;
};

export const deleteCar = async (carId: number, userId: string, existingCars: any[] = []): Promise<any> => {
  logApiCall('POST', '/api/cars/delete', { carId, userId });
  await simulateDelay();
  
  const remainingCars = existingCars.filter(car => car.id !== carId);
  
  const response = {
    success: true,
    message: 'Car deleted successfully',
    userCars: remainingCars
  };
  
  logApiResponse(response);
  return response;
};

/* USERS CARS API MOCK IMPLEMENTATIONS */

export const getAllUsersCars = async (): Promise<MockUsersCars[]> => {
  logApiCall('POST', '/api/users-cars/car');
  await simulateDelay();
  
  const response = {
    success: true,
    message: 'Successfully retrieved all users cars',
    data: mockUsersCars
  };
  
  logApiResponse(response);
  return response.data;
};

export const getUsersCarsByPlateNumber = async (plateNumber: string): Promise<MockUsersCars[]> => {
  logApiCall('POST', '/api/users-cars/car', { params: { plateNumber } });
  await simulateDelay();
  
  const filteredUsersCars = mockUsersCars.filter(uc => uc.userCar === plateNumber);
  
  const response = {
    success: true,
    message: `Successfully found UsersCars By Plate: ${plateNumber}`,
    data: filteredUsersCars
  };
  
  logApiResponse(response);
  return response.data;
};

export const getUsersCarsByUserId = async (userId: number): Promise<MockUsersCars[]> => {
  logApiCall('POST', '/api/users-cars/by-user', { params: { userId } });
  await simulateDelay();
  
  const filteredUsersCars = mockUsersCars.filter(uc => uc.userId === userId);
  
  const response = {
    success: true,
    message: `Successfully found UsersCars By UserId: ${userId}`,
    data: filteredUsersCars
  };
  
  logApiResponse(response);
  return response.data;
};

export const getUsersCarsByUserAndPlate = async (userId: number, plateNumber: string): Promise<MockUsersCars> => {
  logApiCall('POST', '/api/users-cars/by-user-and-plate', { params: { userId, plateNumber } });
  await simulateDelay();
  
  const userCar = mockUsersCars.find(uc => uc.userId === userId && uc.userCar === plateNumber);
  
  if (!userCar) {
    throw new Error(`User car not found for user ${userId} and plate ${plateNumber}`);
  }
  
  const response = {
    success: true,
    message: `Successfully found UsersCars By User: ${userId} And Plate: ${plateNumber}`,
    data: userCar
  };
  
  logApiResponse(response);
  return response.data;
};

export const getUsersCarsByBlockedPlateNumber = async (blockedPlateNumber: string): Promise<MockUsersCars[]> => {
  logApiCall('POST', '/api/users-cars/blocked', { params: { blockedPlateNumber } });
  await simulateDelay();
  
  const filteredUsersCars = mockUsersCars.filter(uc => uc.blockedCar === blockedPlateNumber);
  
  const response = {
    success: true,
    message: `Successfully found UsersCars By Blocked Plate: ${blockedPlateNumber}`,
    data: filteredUsersCars
  };
  
  logApiResponse(response);
  return response.data;
};

export const getUsersCarsByBlockingPlateNumber = async (blockingPlateNumber: string): Promise<MockUsersCars[]> => {
  logApiCall('POST', '/api/users-cars/blocking', { params: { blockingPlateNumber } });
  await simulateDelay();
  
  const filteredUsersCars = mockUsersCars.filter(uc => uc.blockingCar === blockingPlateNumber);
  
  const response = {
    success: true,
    message: `Successfully found UsersCars By Blocking Plate: ${blockingPlateNumber}`,
    data: filteredUsersCars
  };
  
  logApiResponse(response);
  return response.data;
};

export const updateBlockedCarByPlateNumber = async (
  blockingCarPlate: string,
  blockedCarPlate: string,
  userId: number,
  userStatus: any
): Promise<any> => {
  logApiCall('POST', '/api/users-cars/update-blocked', {
    params: { blockingCarPlate, blockedCarPlate, userId, userStatus }
  });
  await simulateDelay();
  
  // Update the blocking relationship
  const userCarIndex = mockUsersCars.findIndex(uc => uc.userId === userId && uc.userCar === blockingCarPlate);
  if (userCarIndex >= 0) {
    mockUsersCars[userCarIndex].blockedCar = blockedCarPlate;
  }
  
  const response = {
    success: true,
    message: `Successfully updated Blocked Car ${blockedCarPlate} blocked by Blocking Car: ${blockingCarPlate}`
  };
  
  logApiResponse(response);
  return response;
};

export const releaseBlockedCarByPlateNumber = async (
  blockingCarPlate: string,
  blockedCarPlate: string,
  userId: number,
  userStatus: any
): Promise<any> => {
  logApiCall('POST', '/api/users-cars/release-blocked', {
    params: { blockingCarPlate, blockedCarPlate, userId, userStatus }
  });
  await simulateDelay();
  
  // Remove the blocking relationship
  const userCarIndex = mockUsersCars.findIndex(uc => uc.userId === userId && uc.userCar === blockingCarPlate);
  if (userCarIndex >= 0) {
    mockUsersCars[userCarIndex].blockedCar = undefined;
  }
  
  const response = {
    success: true,
    message: `Successfully released Blocked Car: ${blockedCarPlate} blocking by Car: ${blockingCarPlate}`
  };
  
  logApiResponse(response);
  return response;
};

export const sendNeedToGoNotification = async (blockedCarPlate: string): Promise<any> => {
  logApiCall('POST', '/api/users-cars/send-need-to-go-notification', { params: { blockedCar: blockedCarPlate } });
  await simulateDelay();
  
  const response = {
    success: true,
    message: `Successfully sent NeedToGo notif for Blocked Car: ${blockedCarPlate}`
  };
  
  logApiResponse(response);
  return response;
};

/* USERS API MOCK IMPLEMENTATIONS */

export const findAllUsers = async (): Promise<MockUser[]> => {
  logApiCall('GET', '/api/users/');
  await simulateDelay();
  
  const response = {
    success: true,
    message: 'Successfully retrieved all users',
    data: mockUsers
  };
  
  logApiResponse(response);
  return response.data;
};

export const findUserById = async (id: number): Promise<MockUser> => {
  logApiCall('GET', `/api/users/by-id?id=${id}`);
  await simulateDelay();
  
  const user = mockUsers.find(u => u.id === id);
  
  if (!user) {
    throw new Error(`User not found with ID: ${id}`);
  }
  
  const response = {
    success: true,
    message: `Successfully found user by ID: ${id}`,
    data: user
  };
  
  logApiResponse(response);
  return response.data;
};

export const findUserByEmail = async (email: string): Promise<MockUser> => {
  logApiCall('GET', `/api/users/by-email?mail=${email}`);
  await simulateDelay();
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error(`User not found with email: ${email}`);
  }
  
  const response = {
    success: true,
    message: `Successfully found user by email: ${email}`,
    data: user
  };
  
  logApiResponse(response);
  return response.data;
};

export const findUserByExternalId = async (externalId: string): Promise<MockUser> => {
  logApiCall('GET', `/api/users/by-external-id?externalId=${externalId}`);
  await simulateDelay();
  
  // Mock implementation - return first user for demo
  const user = mockUsers[0];
  
  const response = {
    success: true,
    message: `Successfully found user by external ID: ${externalId}`,
    data: user
  };
  
  logApiResponse(response);
  return response.data;
};

export const createOrUpdateUser = async (userDTO: any): Promise<MockUser> => {
  logApiCall('POST', '/api/users/', userDTO);
  await simulateDelay();
  
  const existingUserIndex = mockUsers.findIndex(u => u.email === userDTO.email);
  
  const userData: MockUser = {
    id: userDTO.id || Math.floor(Math.random() * 1000),
    firstName: userDTO.firstName,
    lastName: userDTO.lastName,
    email: userDTO.email,
    pushNotificationToken: userDTO.pushNotificationToken,
    urlPhoto: userDTO.urlPhoto
  };
  
  if (existingUserIndex >= 0) {
    mockUsers[existingUserIndex] = { ...mockUsers[existingUserIndex], ...userData };
  } else {
    mockUsers.push(userData);
  }
  
  const response = {
    success: true,
    message: `Successfully created/updated user: ${userDTO.email}`,
    data: userData
  };
  
  logApiResponse(response);
  return response.data;
}; 