// Enums from API documentation
export enum Countries {
  UNKNOWN = 0,
  IL = 1
}

// Country information for UI components
export const CountryInfo = {
  [Countries.UNKNOWN]: {
    code: 'UNKNOWN',
    name: 'Unknown',
    flag: '🏳️'
  },
  [Countries.IL]: {
    code: 'IL',
    name: 'Israel',
    flag: '🇮🇱'
  }
} as const;

// Helper functions for country information
export const getCountryInfo = (country: Countries) => {
  return CountryInfo[country] || CountryInfo[Countries.UNKNOWN];
};

export const getCountryName = (country: Countries) => {
  return getCountryInfo(country).name;
};

export const getCountryFlag = (country: Countries) => {
  return getCountryInfo(country).flag;
};

export const getCountryCode = (country: Countries) => {
  return getCountryInfo(country).code;
};

// Get all available countries as array for pickers
export const getAllCountries = () => {
  return Object.values(Countries)
    .filter((value): value is Countries => typeof value === 'number' && value !== Countries.UNKNOWN)
    .map(country => ({
      value: country,
      ...getCountryInfo(country)
    }));
};

export enum Brands {
  UNKNOWN = 999
  // Full list available in API responses
}

export enum Colors {
  UNKNOWN = 0,
  WHITE = 100
  // Full list available in API responses
}

export enum UserCarSituation {
  IS_BLOCKING = "IS_BLOCKING",
  IS_BLOCKED = "IS_BLOCKED"
}

// Request DTOs from API documentation
export interface OAuthLoginRequestDTO {
  token: string; // OAuth provider token (Google ID token, Facebook access token, Apple ID token)
}

export interface UserCreationDTO {
  firstName: string;
  lastName: string;
  email: string;
  pushNotificationToken: string;
  urlPhoto?: string;
}

export interface FindCarRequestDTO {
  plateNumber: string;
  country: Countries;
  userId?: number; // Optional user ID for car association
}

export interface UserCarRequestDTO {
  userId: number;
  carId: number;
}

export interface CarsRelationRequestDTO {
  blockingCarId: number;
  blockedCarId: number;
  userCarSituation: UserCarSituation;
}

// Response DTOs from API documentation
export interface AuthResponseDTO {
  token: string; // JWT token for API access
  user: UserDTO;
}

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  urlPhoto?: string;
  pushNotificationToken?: string;
}

export interface CarDTO {
  id: number;
  plateNumber: string;
  country: Countries;
  brand: Brands;
  model: string;
  color: Colors;
  year: number;
  carLicenseExpireDate?: string;
  hasOwner: boolean;
}

export interface UserCarsDTO {
  user: UserDTO;
  cars: CarDTO[];
}

export interface CarUsersDTO {
  car: CarDTO;
  users: UserDTO[];
}

export interface CarRelationsDTO {
  car: CarDTO;
  isBlocking: CarDTO[];
  isBlockedBy: CarDTO[];
  message?: string; // Optional message about notification status
}







// Error response interface
export interface ErrorResponse {
  cause: string;
  errorCode: number;
}

// Health check response interface
export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  version: string;
}

// Notification response interface
export interface NotificationResponse {
  entity: string;
}
