import { UserActionTypes, SET_USER_INFO, SET_USER_ID, SET_EXPO_TOKEN, LOGOUT } from "./actions";

// Define the initial state interface
interface UserState {
  userInfo: UserDTO | null;
  userIdFromDB: number | null;
  expoToken: string | null;
}

const initialState: UserState = {
  userInfo: null,
  userIdFromDB: null,
  expoToken: null,
};

function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case SET_USER_ID:
      return { ...state, userIdFromDB: action.payload };
    case SET_EXPO_TOKEN:
      return { ...state, expoToken: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;