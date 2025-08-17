import { 
  Countries, 
  UserDTO, 
  CarDTO, 
  AuthResponseDTO, 
  UserCarsDTO, 
  CarRelationsDTO,
  UserCreationDTO,
  HealthResponse,
  NotificationResponse,
  UserCarSituation
} from "./ServerDTOs";

// Mock data types based on backend entities
interface MockCar {
  id: number;
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
    id: 1,
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
    id: 2,
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

// Mock JWT token
let mockJwtToken = "mock_jwt_token_12345";

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

/* HEALTH ENDPOINTS */

export const healthCheck = async (): Promise<HealthResponse> => {
  logApiCall('GET', '/api/v1/health');
  await simulateDelay();
  
  const response: HealthResponse = {
    status: "UP",
    timestamp: new Date().toISOString(),
    service: "RushHour Backend",
    version: "1.0.0"
  };
  
  logApiResponse(response);
  return response;
};

/* AUTHENTICATION ENDPOINTS */

export const googleLogin = async (idToken: string): Promise<AuthResponseDTO> => {
  logApiCall('POST', '/api/v1/auth/google', { token: idToken });
  await simulateDelay();
  
  // Simulate decoding the ID token to get user info
  // In a real implementation, you would verify the token with Google
  const mockUserInfo = {
    id: Math.floor(Math.random() * 1000) + 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    urlPhoto: "https://lh3.googleusercontent.com/a/default-user"
  };
  
  // Check if user already exists
  let existingUser = mockUsers.find(user => user.email === mockUserInfo.email);
  
  if (!existingUser) {
    // Create new user
    existingUser = {
      id: mockUserInfo.id,
      firstName: mockUserInfo.firstName,
      lastName: mockUserInfo.lastName,
      email: mockUserInfo.email,
      pushNotificationToken: "mock_push_token",
      urlPhoto: mockUserInfo.urlPhoto
    };
    mockUsers.push(existingUser);
    console.log('👤 Created new user from Google Sign-In:', existingUser.email);
  } else {
    console.log('👤 Existing user signed in:', existingUser.email);
  }
  
  const response: AuthResponseDTO = {
    token: `mock_jwt_token_${existingUser.id}_${Date.now()}`,
    user: {
      id: existingUser.id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      urlPhoto: existingUser.urlPhoto
    }
  };
  
  logApiResponse(response);
  return response;
};

export const facebookLogin = async (accessToken: string): Promise<AuthResponseDTO> => {
  logApiCall('POST', '/api/v1/auth/facebook', { token: accessToken });
  await simulateDelay();
  
  const response: AuthResponseDTO = {
    token: mockJwtToken,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      urlPhoto: "https://example.com/photo1.jpg"
    }
  };
  
  logApiResponse(response);
  return response;
};

export const appleLogin = async (idToken: string): Promise<AuthResponseDTO> => {
  logApiCall('POST', '/api/v1/auth/apple', { token: idToken });
  await simulateDelay();
  
  const response: AuthResponseDTO = {
    token: mockJwtToken,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      urlPhoto: "https://example.com/photo1.jpg"
    }
  };
  
  logApiResponse(response);
  return response;
};

export const refreshToken = async (): Promise<AuthResponseDTO> => {
  logApiCall('POST', '/api/v1/auth/refresh');
  await simulateDelay();
  
  const response: AuthResponseDTO = {
    token: "new_mock_jwt_token_67890",
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      urlPhoto: "https://example.com/photo1.jpg"
    }
  };
  
  logApiResponse(response);
  return response;
};

export const logout = async (): Promise<void> => {
  logApiCall('POST', '/api/v1/auth/logout');
  await simulateDelay();
  
  logApiResponse({ message: "Logged out successfully" });
};

/* USER ENDPOINTS */

export const createUser = async (userData: UserCreationDTO): Promise<UserDTO> => {
  logApiCall('POST', '/api/v1/user', userData);
  await simulateDelay();
  
  const newUser: UserDTO = {
    id: Math.floor(Math.random() * 1000),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    urlPhoto: userData.urlPhoto
  };
  
  mockUsers.push({
    ...newUser,
    pushNotificationToken: userData.pushNotificationToken
  });
  
  logApiResponse(newUser);
  return newUser;
};

export const getUserById = async (id: number): Promise<UserDTO> => {
  logApiCall('GET', `/api/v1/user?id=${id}`);
  await simulateDelay();
  
  const user = mockUsers.find(u => u.id === id);
  
  if (!user) {
    throw new Error(`User not found with id: ${id}`);
  }
  
  const response: UserDTO = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    urlPhoto: user.urlPhoto
  };
  
  logApiResponse(response);
  return response;
};

export const getUserByEmail = async (email: string): Promise<UserDTO> => {
  logApiCall('GET', `/api/v1/user/by-email?email=${encodeURIComponent(email)}`);
  await simulateDelay();
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error(`User not found with email: ${email}`);
  }
  
  const response: UserDTO = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    urlPhoto: user.urlPhoto
  };
  
  logApiResponse(response);
  return response;
};

export const updateUser = async (userData: UserDTO): Promise<UserDTO> => {
  logApiCall('PUT', '/api/v1/user', userData);
  await simulateDelay();
  
  const userIndex = mockUsers.findIndex(u => u.id === userData.id);
  
  if (userIndex === -1) {
    throw new Error(`User not found with id: ${userData.id}`);
  }
  
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
  
  logApiResponse(userData);
  return userData;
};

export const deactivateUser = async (userId: number): Promise<void> => {
  logApiCall('PUT', `/api/v1/user/deactivate/${userId}`);
  await simulateDelay();
  
  logApiResponse({ message: `User ${userId} deactivated successfully` });
};

export const activateUser = async (userId: number): Promise<void> => {
  logApiCall('PUT', `/api/v1/user/activate/${userId}`);
  await simulateDelay();
  
  logApiResponse({ message: `User ${userId} activated successfully` });
};

/* CAR ENDPOINTS */

export const findOrCreateCar = async (plateNumber: string, country: Countries, userId?: number): Promise<CarDTO> => {
  logApiCall('POST', '/api/v1/car', { plateNumber, country, userId });
  await simulateDelay();
  
  let car = mockCars.find(c => c.plateNumber === plateNumber && c.country === country);
  
  if (!car) {
    car = {
      id: Math.floor(Math.random() * 1000),
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
    mockCars.push(car);
  }
  
  const response: CarDTO = {
    id: car.id,
    plateNumber: car.plateNumber,
    country: car.country,
    brand: car.brand,
    model: car.model,
    color: car.color,
    carLicenseExpireDate: car.carLicenseExpireDate
  };
  
  logApiResponse(response);
  return response;
};

/* USER-CAR ENDPOINTS */

export const assignCarToUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  logApiCall('POST', '/api/v1/user-car', { userId, carId });
  await simulateDelay();
  
  const user = mockUsers.find(u => u.id === userId);
  const car = mockCars.find(c => c.id === carId);
  
  if (!user) {
    throw new Error(`User not found with id: ${userId}`);
  }
  
  if (!car) {
    throw new Error(`Car not found with id: ${carId}`);
  }
  
  const response: UserCarsDTO = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      urlPhoto: user.urlPhoto
    },
    cars: [{
      id: car.id,
      plateNumber: car.plateNumber,
      country: car.country,
      brand: car.brand,
      model: car.model,
      color: car.color,
      carLicenseExpireDate: car.carLicenseExpireDate
    }]
  };
  
  logApiResponse(response);
  return response;
};

export const getUserCars = async (userId: number): Promise<UserCarsDTO> => {
  logApiCall('GET', `/api/v1/user-car/by-user-id?userId=${userId}`);
  await simulateDelay();
  
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error(`User not found with id: ${userId}`);
  }
  
  // Mock: return cars associated with this user
  const userCars = mockCars.filter(car => 
    mockUsersCars.some(uc => uc.userId === userId && uc.userCar === car.plateNumber)
  );
  
  const response: UserCarsDTO = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      urlPhoto: user.urlPhoto
    },
    cars: userCars.map(car => ({
      id: car.id,
      plateNumber: car.plateNumber,
      country: car.country,
      brand: car.brand,
      model: car.model,
      color: car.color,
      carLicenseExpireDate: car.carLicenseExpireDate
    }))
  };
  
  logApiResponse(response);
  return response;
};

export const removeCarFromUser = async (userId: number, carId: number): Promise<UserCarsDTO> => {
  logApiCall('DELETE', '/api/v1/user-car', { userId, carId });
  await simulateDelay();
  
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error(`User not found with id: ${userId}`);
  }
  
  // Mock: remove car association and return remaining cars
  const remainingCars = mockCars.filter(car => 
    car.id !== carId && mockUsersCars.some(uc => uc.userId === userId && uc.userCar === car.plateNumber)
  );
  
  const response: UserCarsDTO = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      urlPhoto: user.urlPhoto
    },
    cars: remainingCars.map(car => ({
      id: car.id,
      plateNumber: car.plateNumber,
      country: car.country,
      brand: car.brand,
      model: car.model,
      color: car.color,
      carLicenseExpireDate: car.carLicenseExpireDate
    }))
  };
  
  logApiResponse(response);
  return response;
};

/* CAR RELATIONS ENDPOINTS */

export const createCarBlockingRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO> => {
  logApiCall('POST', '/api/v1/car-relations', { 
    blockingCarId, 
    blockedCarId, 
    userCarSituation: UserCarSituation.IS_BLOCKING 
  });
  await simulateDelay();
  
  const blockingCar = mockCars.find(c => c.id === blockingCarId);
  const blockedCar = mockCars.find(c => c.id === blockedCarId);
  
  if (!blockingCar) {
    throw new Error(`Car not found with id: ${blockingCarId}`);
  }
  
  if (!blockedCar) {
    throw new Error(`Car not found with id: ${blockedCarId}`);
  }
  
  // Mock: create blocking relationship
  blockingCar.isBlocking = true;
  blockedCar.isBlocked = true;
  
  const response: CarRelationsDTO = {
    car: {
      id: blockingCar.id,
      plateNumber: blockingCar.plateNumber,
      country: blockingCar.country,
      brand: blockingCar.brand,
      model: blockingCar.model,
      color: blockingCar.color,
      carLicenseExpireDate: blockingCar.carLicenseExpireDate
    },
    isBlocking: [{
      id: blockedCar.id,
      plateNumber: blockedCar.plateNumber,
      country: blockedCar.country,
      brand: blockedCar.brand,
      model: blockedCar.model,
      color: blockedCar.color,
      carLicenseExpireDate: blockedCar.carLicenseExpireDate
    }],
    isBlockedBy: [],
    message: "Blocking relationship created. Notifications sent to owners."
  };
  
  logApiResponse(response);
  return response;
};

export const getCarRelations = async (carId: number): Promise<CarRelationsDTO> => {
  logApiCall('GET', `/api/v1/car-relations?carId=${carId}`);
  await simulateDelay();
  
  const car = mockCars.find(c => c.id === carId);
  
  if (!car) {
    throw new Error(`Car not found with id: ${carId}`);
  }
  
  // Mock: get blocking relationships
  const blockingCars = mockCars.filter(c => c.isBlocked && c.id !== carId);
  const blockedByCars = mockCars.filter(c => c.isBlocking && c.id !== carId);
  
  const response: CarRelationsDTO = {
    car: {
      id: car.id,
      plateNumber: car.plateNumber,
      country: car.country,
      brand: car.brand,
      model: car.model,
      color: car.color,
      carLicenseExpireDate: car.carLicenseExpireDate
    },
    isBlocking: blockingCars.map(c => ({
      id: c.id,
      plateNumber: c.plateNumber,
      country: c.country,
      brand: c.brand,
      model: c.model,
      color: c.color,
      carLicenseExpireDate: c.carLicenseExpireDate
    })),
    isBlockedBy: blockedByCars.map(c => ({
      id: c.id,
      plateNumber: c.plateNumber,
      country: c.country,
      brand: c.brand,
      model: c.model,
      color: c.color,
      carLicenseExpireDate: c.carLicenseExpireDate
    })),
    message: null
  };
  
  logApiResponse(response);
  return response;
};

export const removeCarBlockingRelationship = async (
  blockingCarId: number, 
  blockedCarId: number
): Promise<CarRelationsDTO> => {
  logApiCall('DELETE', '/api/v1/car-relations', { 
    blockingCarId, 
    blockedCarId, 
    userCarSituation: UserCarSituation.IS_BLOCKING 
  });
  await simulateDelay();
  
  const blockingCar = mockCars.find(c => c.id === blockingCarId);
  const blockedCar = mockCars.find(c => c.id === blockedCarId);
  
  if (!blockingCar) {
    throw new Error(`Car not found with id: ${blockingCarId}`);
  }
  
  if (!blockedCar) {
    throw new Error(`Car not found with id: ${blockedCarId}`);
  }
  
  // Mock: remove blocking relationship
  blockingCar.isBlocking = false;
  blockedCar.isBlocked = false;
  
  const response: CarRelationsDTO = {
    car: {
      id: blockingCar.id,
      plateNumber: blockingCar.plateNumber,
      country: blockingCar.country,
      brand: blockingCar.brand,
      model: blockingCar.model,
      color: blockingCar.color,
      carLicenseExpireDate: blockingCar.carLicenseExpireDate
    },
    isBlocking: [],
    isBlockedBy: [],
    message: "Blocking relationship removed. Notifications sent to owners."
  };
  
  logApiResponse(response);
  return response;
};

export const removeAllCarRelations = async (carId: number): Promise<void> => {
  logApiCall('DELETE', `/api/v1/car-relations/all-by-car-id?carId=${carId}`);
  await simulateDelay();
  
  const car = mockCars.find(c => c.id === carId);
  
  if (!car) {
    throw new Error(`Car not found with id: ${carId}`);
  }
  
  // Mock: remove all relationships for this car
  car.isBlocking = false;
  car.isBlocked = false;
  
  logApiResponse({ message: `All car relations removed for car ${carId}` });
};

/* NOTIFICATION ENDPOINTS */

export const sendNeedToGoNotification = async (blockedCarId: number): Promise<NotificationResponse> => {
  logApiCall('POST', `/api/v1/notification/send-need-to-go?blockedCarId=${blockedCarId}`);
  await simulateDelay();
  
  const car = mockCars.find(c => c.id === blockedCarId);
  
  if (!car) {
    throw new Error(`Car not found with id: ${blockedCarId}`);
  }
  
  if (!car.isBlocked) {
    throw new Error("Car is not blocked by any other car");
  }
  
  const response: NotificationResponse = {
    entity: "Notification sent successfully"
  };
  
  logApiResponse(response);
  return response;
};

/* LEGACY ENDPOINTS FOR BACKWARD COMPATIBILITY */

// Legacy car endpoints (deprecated - use new endpoints above)
export const findAllCars = async (): Promise<any[]> => {
  console.warn('findAllCars is deprecated. Use the new car endpoints instead.');
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
  logApiCall('POST', '/api/cars/save', { carInfo, userId, existingCars });
  await simulateDelay();
  
  const newCar: MockCar = {
    id: Math.floor(Math.random() * 1000),
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
  console.warn('deleteCar is deprecated. Use removeCarFromUser instead.');
  return removeCarFromUser(parseInt(userId), carId);
};

// Legacy user-car endpoints (deprecated - use new endpoints above)
export const getAllUsersCars = async (): Promise<any> => {
  console.warn('getAllUsersCars is deprecated. Use getUserCars with specific userId instead.');
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

export const getUsersCarsByPlateNumber = async (plateNumber: string): Promise<any[]> => {
  console.warn('getUsersCarsByPlateNumber is deprecated. Use findOrCreateCar and getCarRelations instead.');
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

export const getUsersCarsByUserId = async (userId: number): Promise<any[]> => {
  console.warn('getUsersCarsByUserId is deprecated. Use getUserCars instead.');
  const result = await getUserCars(userId);
  return result.cars;
};

export const getUsersCarsByUserAndPlate = async (userId: number, plateNumber: string): Promise<any> => {
  console.warn('getUsersCarsByUserAndPlate is deprecated. Use findOrCreateCar and getUserCars instead.');
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

export const getUsersCarsByBlockedPlateNumber = async (blockedPlateNumber: string): Promise<any> => {
  console.warn('getUsersCarsByBlockedPlateNumber is deprecated. Use getCarRelations instead.');
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

export const getUsersCarsByBlockingPlateNumber = async (blockingPlateNumber: string): Promise<any> => {
  console.warn('getUsersCarsByBlockingPlateNumber is deprecated. Use getCarRelations instead.');
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
  console.warn('updateBlockedCarByPlateNumber is deprecated. Use createCarBlockingRelationship instead.');
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
    message: `Successfully updated Blocked Car ${blockedCarPlate} blocked by Blocking Car: ${blockingCarPlate}`,
    data: {
      blockingCarPlate,
      blockedCarPlate,
      userId,
      userStatus,
      updated: true
    }
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
  console.warn('releaseBlockedCarByPlateNumber is deprecated. Use removeCarBlockingRelationship instead.');
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
    message: `Successfully released Blocked Car: ${blockedCarPlate} blocking by Car: ${blockingCarPlate}`,
    data: {
      blockingCarPlate,
      blockedCarPlate,
      userId,
      userStatus,
      released: true
    }
  };
  
  logApiResponse(response);
  return response;
};

// Legacy user endpoints (deprecated - use new endpoints above)
export const findAllUsers = async (): Promise<any> => {
  console.warn('findAllUsers is deprecated. Use getUserById or getUserByEmail instead.');
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

export const createOrUpdateUser = async (userDTO: any): Promise<any> => {
  console.warn('createOrUpdateUser is deprecated. Use createUser or updateUser instead.');
  if (userDTO.id) {
    return updateUser(userDTO);
  } else {
    return createUser(userDTO);
  }
}; 