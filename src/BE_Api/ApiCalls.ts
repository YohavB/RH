import axios from "axios";

// Use environment variables to manage the base URL for different environments
const BASE_URL = process.env.API_BASE_URL || "http://localhost:8008";

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, // Optional: Authorization token if needed
  },
});

// Common error handler function
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      alert("Network error. Please check your connection.");
    } else {
      alert(`Error: ${error.response.status} - ${error.response.data.message}`);
    }
  } else {
    alert("An unexpected error occurred.");
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

export const findAllCars = async (): Promise<CarDTO[]> => {
  return apiCall(`${CARS_URL}/`, 'get');
};

export const findCarByPlateNumber = async (plateNumber: string): Promise<CarDTO> => {
  return apiCall(`${CARS_URL}/by-plate?plateNumber=${plateNumber}`, 'get');
};

export const createOrUpdateCar = async (plateNumber: string, userId: number | null): Promise<CarDTO> => {
  return apiCall(`${CARS_URL}/car`, 'post', { plateNumber, userId });
};

/* USERS CARS API */
const USERS_CARS_URL = `${BASE_URL}/api/users-cars`;

export const getAllUsersCars = async (): Promise<UsersCarsDTO> => {
  return apiCall(`${USERS_CARS_URL}/car`, 'post');
};

export const getUsersCarsByPlateNumber = async (plateNumber: string): Promise<UsersCarsDTO[]> => {
  return apiCall(`${USERS_CARS_URL}/car`, 'post', { params: { plateNumber } });
};

export const getUsersCarsByUserId = async (userId: number): Promise<UsersCarsDTO[]> => {
  return apiCall(`${USERS_CARS_URL}/by-user`, 'post', { params: { userId } });
};

export const getUsersCarsByUserAndPlate = async (userId: number, plateNumber: string): Promise<UsersCarsDTO> => {
  return apiCall(`${USERS_CARS_URL}/by-user-and-plate`, 'post', { params: { userId, plateNumber } });
};

export const getUsersCarsByBlockedPlateNumber = async (blockedPlateNumber: string): Promise<UsersCarsDTO> => {
  return apiCall(`${USERS_CARS_URL}/blocked`, 'post', { params: { blockedPlateNumber } });
};

export const getUsersCarsByBlockingPlateNumber = async (blockingPlateNumber: string): Promise<UsersCarsDTO> => {
  return apiCall(`${USERS_CARS_URL}/blocking`, 'post', { params: { blockingPlateNumber } });
};

export const updateBlockedCarByPlateNumber = async (
    blockingCarPlate: string,
    blockedCarPlate: string,
    userId: number,
    userStatus: UserStatus
): Promise<UsersCarsDTO> => {
  return apiCall(`${USERS_CARS_URL}/update-blocked`, 'post', {
    params: { blockingCarPlate, blockedCarPlate, userId, userStatus },
  });
};

export const releaseBlockedCarByPlateNumber = async (
    blockingCarPlate: string,
    blockedCarPlate: string,
    userId: number,
    userStatus: UserStatus
): Promise<UsersCarsDTO> => {
  return apiCall(`${USERS_CARS_URL}/release-blocked`, 'post', {
    params: { blockingCarPlate, blockedCarPlate, userId, userStatus },
  });
};

/* USERS API */
const USERS_URL = `${BASE_URL}/api/users`;

export const findAllUsers = async (): Promise<UserDTO> => {
  return apiCall(`${USERS_URL}/`, 'get');
};

export const findUserById = async (id: number): Promise<UserDTO> => {
  return apiCall(`${USERS_URL}/by-id`, 'get', { params: { id } });
};

export const findUserByEmail = async (email: string): Promise<UserDTO> => {
  return apiCall(`${USERS_URL}/by-email`, 'get', { params: { email } });
};

export const findUserByExternalId = async (externalId: string): Promise<UserDTO> => {
  return apiCall(`${USERS_URL}/by-external-id`, 'get', { params: { externalId } });
};

export const createOrUpdateUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  return apiCall(`${USERS_URL}/`, 'post', userDTO);
};