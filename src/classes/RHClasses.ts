// Enums from API documentation
export enum Countries {
  UNKNOWN = 0,
  IL = 1  // Israel
}

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

// Core DTOs
export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  urlPhoto?: string;
}

export interface CarDTO {
  id: number;
  plateNumber: string;
  country: Countries;
  brand: string;
  model: string;
  color: string;
  carLicenseExpireDate?: string;
}

// Legacy classes for backward compatibility
export class UserDTOClass {
  email: string;
  userId: number | null;
  firstName: string;
  lastName: string;
  urlPhoto: string;
  pushNotificationToken: string;
  userCars: CarDTOClass[] | null;

  constructor(
    email: string,
    givenName: string,
    familyName: string,
    photo: string,
    pushNotificationToken: string,
    userCars: CarDTOClass[] | null = null
  ) {
    this.email = email;
    this.firstName = givenName;
    this.lastName = familyName;
    this.urlPhoto = photo;
    this.pushNotificationToken = pushNotificationToken;
    this.userCars = userCars;
  }
}

export class CarDTOClass {
  plateNumber: string;
  country: Countries;
  brand: string;
  model: string;
  color: string;
  carLicenseExpireDate: string | null;
  isBlocking: boolean = false;
  isBlocked: boolean = false;

  constructor(
    plateNumber: string,
    country: Countries,
    brand: string,
    model: string,
    color: string,
    carLicenseExpireDate: string | null = null,
    isBlocking: boolean = false,
    isBlocked: boolean = false
  ) {
    this.plateNumber = plateNumber;
    this.country = country;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.carLicenseExpireDate = carLicenseExpireDate;
    this.isBlocking = isBlocking;
    this.isBlocked = isBlocked;
  }
}

export class UsersCarsDTOClass {
  userId: number;
  userCar: string;
  blockingCar: string | null;
  blockedCar: string | null;

  constructor(
    userId: number,
    userCar: string,
    blockingCar: string | null = null,
    blockedCar: string | null = null
  ) {
    this.userId = userId;
    this.userCar = userCar;
    this.blockingCar = blockingCar;
    this.blockedCar = blockedCar;
  }
}

// Legacy enums for backward compatibility
export enum UserStatus {
  BLOCKED = "BLOCKED",
  BLOCKING = "BLOCKING",
}

export enum CarStatus {
  BLOCKED = "BLOCKED",
  BLOCKING = "BLOCKING",
}

export enum ScreenNames {
  SPLASH = "SplashScreen",
  LOGIN = "LoginScreen",
  ADD_CAR = "AddCarScreen",
  MAIN = "MainScreen",
  CAR_CONFIRMATION = "CarConfirmationScreen",
  PLATE_RECOGNITION = "PlateRecognitionScreen",
  SETTINGS = "SettingsScreen",
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
