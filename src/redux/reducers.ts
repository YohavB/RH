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
      return { ...state, userCars: action.payload };
    case SET_CAR_PLATE:
      return { ...state, carPlate: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;