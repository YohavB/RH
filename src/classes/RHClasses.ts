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
  brand: Brands;
  model: string;
  color: Colors;
  carLicenseExpireDate: string | null;
  isBlocking: boolean = false;
  isBlocked: boolean = false;

  constructor(
      plateNumber: string,
      country: Countries,
      brand: Brands,
      model: string,
      color: Colors,
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
  UNKNOWN = "UNKNOWN"
}

// Enum for brands
enum Brands {
  AIWAYS = "Aiways",
  ALPHA_ROMEO = "Alpha Romeo",
  ASTON_MARTIN = "Aston Martin",
  AUDI = "Audi",
  AVTOVAZ = "AvtoVAZ",
  BENTLEY = "Bentley",
  BMW = "BMW",
  BUICK = "Buick",
  CADILLAC = "Cadillac",
  CENNTRO = "Cenntro",
  CHEVROLET = "Chevrolet",
  CHRYSLER = "Chrysler",
  CITROEN = "Citroen",
  DACIA = "Dacia",
  DAEWOO = "Daewoo",
  DAIHATSU = "Daihatsu",
  DE_TOMASO = "De Tomaso",
  DFSK = "DFSK",
  DODGE = "Dodge",
  DONGFENG = "Dongfeng",
  DS = "DS",
  FERRARI = "Ferrari",
  FIAT = "Fiat",
  FORD = "Ford",
  GAC = "GAC",
  GEELY = "Geely",
  GMC = "GMC",
  GOUPIL = "Goupil",
  GREAT_WALL = "Great Wall",
  HONDA = "Honda",
  HONGQI = "Hongqi",
  HUMMER = "Hummer",
  HYUNDAI = "Hyundai",
  ISUZU = "Isuzu",
  IVECO = "Iveco",
  JAGUAR = "Jaguar",
  JEEP = "Jeep",
  KARMA = "Karma",
  KIA = "Kia",
  LAMBORGHINI = "Lamborghini",
  LANCIA = "Lancia",
  LAND_ROVER = "Land Rover",
  LEVC = "LEVC",
  LEXUS = "Lexus",
  LINCOLN = "Lincoln",
  LTI = "LTI",
  LYNK_AND_CO = "Lynk & Co",
  MAN = "Man",
  MASERATI = "Maserati",
  MAXUS = "Maxus",
  MAZDA = "Mazda",
  MCC = "MCC",
  MERCEDES = "Mercedes",
  MG = "MG",
  MITSUBISHI = "Mitsubishi",
  NISSAN = "Nissan",
  OPEL = "Opel",
  PEUGEOT = "Peugeot",
  PIAGGIO = "Piaggio",
  POLESTAR = "Polestar",
  PONTIAC = "Pontiac",
  PORSCHE = "Porsche",
  RENAULT = "Renault",
  ROVER = "Rover",
  SAAB = "Saab",
  SEAT = "Seat",
  SERES = "Seres",
  SKODA = "Skoda",
  SKYWELL = "Skywell",
  SMART = "Smart",
  SSANGYONG = "Ssangyong",
  SUBARU = "Subaru",
  SUZUKI = "Suzuki",
  TELCO = "TELCO",
  TESLA = "Tesla",
  TOYOTA = "Toyota",
  VOLKSWAGEN = "Volkswagen",
  UNKNOWN = "Unknown"
}

// Enum for colors
enum Colors {
  BLACK = "Black",
  WHITE = "White",
  SILVER = "Silver",
  GRAY = "Gray",
  RED = "Red",
  BLUE = "Blue",
  GREEN = "Green",
  YELLOW = "Yellow",
  ORANGE = "Orange",
  BROWN = "Brown",
  PURPLE = "Purple",
  GOLD = "Gold",
  BEIGE = "Beige",
  BRONZE = "Bronze",
  BURGUNDY = "Burgundy",
  COPPER = "Copper",
  CREAM = "Cream",
  INDIGO = "Indigo",
  MAGENTA = "Magenta",
  MAROON = "Maroon",
  NAVY = "Navy",
  OLIVE = "Olive",
  PINK = "Pink",
  PLUM = "Plum",
  TAN = "Tan",
  TEAL = "Teal",
  TURQUOISE = "Turquoise",
  VIOLET = "Violet",
  WINE = "Wine",
  UNKNOWN = "Unknown"
}

// Enum for screen names
enum ScreenNames {
  ADD_CAR = "AddCar",
  MAIN = "Main",
  USER_CARS = "UserCars",
  PLATE_RECOGNITION = "PlateRecognition",
  SETUP = "Setup"
}

// Export all enums for use throughout the app
export { UserDTO, CarDTO, UsersCarsDTO, CarStatus, UserStatus, Brands, Colors, Countries, ScreenNames };