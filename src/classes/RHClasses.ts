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
  brand: string;
  model: string;
  color: string;
  carLicenseExpireDate: Date | null;
  isBlocking: boolean = false;
  isBlocked: boolean = false;

  constructor(
      plateNumber: string,
      brand: string,
      model: string,
      color: string,
      carLicenseExpireDate: Date | null = null,
      isBlocking: boolean = false,
      isBlocked: boolean = false
  ) {
    this.plateNumber = plateNumber;
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

enum Brands {
  AIWAYS = "Aiways",

  // FREE	(	1	,	"Free"	)	,
  ALPHA_ROMEO = "Alpha Romeo",
  ASTON_MARTIN = "Aston Martin",
  AUDI = "Audi",
  AVTOVAZ = "AvtoVAZ",
  BENTLEY = "Bentley",
  BMW = "BMW",

  //FREE= "Free",
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

  // FREE= "FREE",
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

  // FREE	(	51	,	"FREE"	)	,
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

  //  FREE	(	80	,	"FREE"	)	,
  VOLKSWAGEN = "Volkswagen",
  VOLVO = "Volvo",
  UNKNOWN = "Unknown",
}

enum Colors {
  UNKNOWN = "Unknown",
  PEARL_GREEN = "Pearl Green",
  PEARL_BLACK = "Pearl Black",
  PEARL_BLUE = "Pearl Blue",
  METALLIC_YELLOW = "Metallic Yellow",
  FROM_LANG_METALLIC = "From Lang Metallic",
  METALLIC_DARK_GRAY = "Metallic Dark Gray",
  AZURE_SILVER_METALLIC = "Azure Silver Metallic",
  METALLIC_COPPER = "Metallic Copper",
  METALLIC_OLIVE_GREEN = "Metallic Olive Green",
  BLACK = "Black",
  METALLIC_BLACK = "Metallic Black",
  BLACK_EGGPLANT = "Black Eggplant",
  METALLIC_OLIVE = "Metallic Olive",
  METALLIC_REDDISH = "Metallic Reddish",
  METALLIC_LIGHT_GRAY = "Metallic Light Gray",
  STRONG_YELLOW = "Strong Yellow",
  GLOWING_RED = "Glowing Red",
  GRAY_MELANGE = "Gray Melange",
  MATTE_MANDARIN = "Matte Mandarin",
  GRAY = "Gray",
  STEEL_GRAY = "Steel Gray",
  DARK_GRAY = "Dark Gray",
  LIGHT_GRAY = "Light Gray",
  BRONZE_GRAY = "Bronze Gray",
  SILVER = "Silver",
  PLATINUM = "Platinum",
  METALLIC_GRAY = "Metallic Gray",
  METALLIC_GREENISH = "Metallic Greenish",
  METALLIC_SILVER = "Metallic Silver",
  BLUE = "Blue",
  DARK_BLUE = "Dark Blue",
  LIGHT_BLUE = "Light Blue",
  AZURE = "Azure",
  TURQUOISE = "Turquoise",
  DARK_TURQUOISE = "Dark Turquoise",
  METALLIC_BLUE = "Metallic Blue",
  METALLIC_BLUE_GRAY = "Metallic Blue Gray",
  METALLIC_CHARCOAL_BLUE = "Metallic Charcoal Blue",
  METALLIC_LIGHT_BLUE = "Metallic Light Blue",
  GREEN = "Green",
  BRIGHT_GREEN = "Bright Green",
  DARK_GREEN = "Dark Green",
  GREENISH = "Greenish",
  LIGHT_GREEN = "Light Green",
  OLIVE_GREEN = "Olive Green",
  METALLIC_GREEN = "Metallic Green",
  METALLIC_BORDEAUX = "Metallic Bordeaux",
  SILVER_GREEN = "Silver Green",
  METALLIC_GOLD_GREEN = "Metallic Gold Green",
  RED = "Red",
  DARK_RED = "Dark Red",
  WINE = "Wine",
  PURPLE = "Purple",
  BORDEAUX = "Bordeaux",
  PINK = "Pink",
  METALLIC_RED = "Metallic Red",
  EGGPLANT = "Eggplant",
  COPPER = "Copper",
  ROSE_METALLIC = "Rose Metallic",
  YELLOW = "Yellow",
  LEMON_YELLOW = "Lemon Yellow",
  SAHARA = "Sahara",
  MUSTARD = "Mustard",
  ORANGE = "Orange",
  GOLD = "Gold",
  BEIGE = "Beige",
  DARK_BEIGE = "Dark Beige",
  CREAM = "Cream",
  METALLIC_GOLD = "Metallic Gold",
  BROWN = "Brown",
  LIGHT_BROWN = "Light Brown",
  DARK_BROWN = "Dark Brown",
  GOLDEN = "Golden",
  AQUA_GREEN = "Aqua Green",
  DARK_PURPLE = "Dark Purple",
  GREENISH_SILVER = "Greenish Silver",
  CLASSIC_RED = "Classic Red",
  METALLIC_TURQUOISE = "Metallic Turquoise",
  SEA_MONEY = "Sea Money",
  WHITE_IVORY = "White Ivory",
  IVORY = "Ivory",
  OTHER = "Other",
  MULTI_COLORED = "Multi-colored",
  METALLIC_LIGHT_TURQUOISE = "Metallic Light Turquoise",
  LIGHT_PURPLE = "Light Purple",
  MILLENNIUM_SILVER = "Millennium Silver",
  BEIGE_METALLIC = "Beige Metallic",
  METALLIC_COFFEE = "Metallic Coffee",
  INDIGO_MATTE = "Indigo Matte",
  TONIC = "Tonic",
  BLUE_CRYSTAL = "Blue Crystal",
  BRONZE = "Bronze",
  DARK_SILVER = "Dark Silver",
  LIGHT_SILVER = "Light Silver",
  TURQUOISE_GREEN = "Turquoise Green",
  SEA_GREEN = "Sea Green",
  METALLIC_BLUISH_SILVER = "Metallic Bluish Silver",
  RED_BLACK = "Red Black",
  DARK_SILVER_METALLIC = "Dark Silver Metallic",
  WHITE = "White",
}
