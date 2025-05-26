// DTO for the user
class UserDTO {
  email: string;
  userId: number | null;
  firstName: string;
  lastName: string;
  urlPhoto: string;
  pushNotificationToken: string;
  userCars: CarDTO[] | null;

  constructor(
      email: string,
      givenName: string,
      familyName: string,
      photo: string,
      pushNotificationToken: string,
      userCars: CarDTO[] | null = null
  ) {
    this.email = email;
    this.firstName = givenName;
    this.lastName = familyName;
    this.urlPhoto = photo;
    this.pushNotificationToken = pushNotificationToken;
    this.userCars = userCars;
  }
}

// DTO for a car
class CarDTO {
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

// DTO for user cars relationships
class UsersCarsDTO {
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

// Enum for user statuses
enum UserStatus {
  BLOCKED = "BLOCKED",
  BLOCKING = "BLOCKING",
}

// Enum for car statuses
enum CarStatus {
  BLOCKED = "BLOCKED",
  BLOCKING = "BLOCKING",
}

// Enum for countries
enum Countries {
  IL = "IL",  // Israel
}

// Enum for screen names
enum ScreenNames {
  ADD_CAR = "AddCar",
  MAIN = "Main",
  CAR_CONFIRMATION = "CarConfirmation",
  PLATE_RECOGNITION = "PlateRecognition",
  SETTINGS = "Settings"
}

// Export all enums for use throughout the app
export { UserDTO, CarDTO, UsersCarsDTO, CarStatus, UserStatus, Countries, ScreenNames };