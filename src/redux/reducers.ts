import { UserActionTypes, SET_USER_INFO, SET_USER_CARS, SET_AUTH_TOKEN, SET_CAR_RELATIONS, ADD_CAR_RELATION, CLEAR_CAR_RELATIONS, LOGOUT, SET_GOOGLE_ID_TOKEN, SET_FCM_TOKEN } from "./actions";
import { UserDTO, CarDTO, CarRelationsDTO } from "../BE_Api/ServerDTOs";

// Define the optimized state interface
interface UserState {
  userToken: string | null;
  userInfo: UserDTO | null;
  userCars: CarDTO[];
  carRelations: CarRelationsDTO[];
  googleIdToken: string | null;
  fcmToken: string | null; // Store FCM token locally
}

const initialState: UserState = {
  userToken: null,
  userInfo: null,
  userCars: [],
  carRelations: [],
  googleIdToken: null,
  fcmToken: null,
};

function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case SET_USER_CARS:
      // Log car store changes
      const previousCarCount = state.userCars?.length || 0;
      const newCarCount = action.payload?.length || 0;
      const carChange = newCarCount - previousCarCount;
      
      console.log('🚗 CAR STORE UPDATE:');
      
      if (action.payload && action.payload.length > 0) {
        console.log('  Car details:');
        action.payload.forEach((car, index) => {
          console.log(`    ${index + 1}. ${car.plateNumber} - ${car.brand} ${car.model} (${car.color})`);
        });
      } else {
        console.log('  No cars in store');
      }
      console.log('');
      
      return { ...state, userCars: action.payload };
    case SET_AUTH_TOKEN:
      return { ...state, userToken: action.payload };
    case SET_GOOGLE_ID_TOKEN:
      return { ...state, googleIdToken: action.payload };
    case SET_CAR_RELATIONS:
      return { ...state, carRelations: action.payload };
    case ADD_CAR_RELATION:
      // Add a new car relation to the existing array
      return { 
        ...state, 
        carRelations: [...state.carRelations, action.payload] 
      };
    case CLEAR_CAR_RELATIONS:
      return { ...state, carRelations: [] };
    case SET_FCM_TOKEN:
      return { ...state, fcmToken: action.payload };
    case LOGOUT:
      console.log('🚗 CAR STORE CLEARED: User logged out');
      return initialState;
    default:
      return state;
  }
}

export default userReducer;