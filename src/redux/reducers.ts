import { UserActionTypes, SET_USER_INFO, SET_USER_ID, SET_EXPO_TOKEN, SET_USER_CARS, SET_CAR_PLATE, LOGOUT } from "./actions";

// Define the initial state interface
interface UserState {
  userInfo: any | null;
  userIdFromDB: number | null;
  expoToken: string | null;
  userCars: any[];
  carPlate: string | null;
}

const initialState: UserState = {
  userInfo: null,
  userIdFromDB: null,
  expoToken: null,
  userCars: [],
  carPlate: null,
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
      console.log(`  Previous cars: ${previousCarCount}`);
      console.log(`  New cars: ${newCarCount}`);
      console.log(`  Change: ${carChange > 0 ? '+' : ''}${carChange}`);
      
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
    case LOGOUT:
      console.log('🚗 CAR STORE CLEARED: User logged out');
      return initialState;
    default:
      return state;
  }
}

export default userReducer;