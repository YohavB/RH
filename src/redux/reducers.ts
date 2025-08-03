import { UserActionTypes, SET_USER_INFO, SET_USER_ID, SET_EXPO_TOKEN, SET_USER_CARS, SET_CAR_PLATE, SET_AUTH_TOKEN, SET_USER_DETAILS, LOGOUT } from "./actions";
import { UserDTO } from "../classes/RHClasses";

// Define the initial state interface
interface UserState {
  userInfo: any | null;
  userIdFromDB: number | null;
  expoToken: string | null;
  userCars: any[];
  carPlate: string | null;
  authToken: string | null;
  userDetails: UserDTO | null;
}

const initialState: UserState = {
  userInfo: null,
  userIdFromDB: null,
  expoToken: null,
  userCars: [],
  carPlate: null,
  authToken: null,
  userDetails: null,
};

function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case SET_USER_ID:
      return { ...state, userIdFromDB: action.payload };
    case SET_EXPO_TOKEN:
      return { ...state, expoToken: action.payload };
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
    case SET_CAR_PLATE:
      return { ...state, carPlate: action.payload };
    case SET_AUTH_TOKEN:
      return { ...state, authToken: action.payload };
    case SET_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    case LOGOUT:
      console.log('🚗 CAR STORE CLEARED: User logged out');
      return initialState;
    default:
      return state;
  }
}

export default userReducer;