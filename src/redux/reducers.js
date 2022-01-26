import { SET_USER_NAME, SET_CAR_NUMBER, LOGOUT } from "./action";

const initititalState = {
  userName: "",
  carNumber: "",
};

function userReducer(state = initititalState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.payload };
    case SET_CAR_NUMBER:
      return { ...state, carNumber: action.payload };
    case LOGOUT:
      return initititalState;
    default:
      return state;
  }
}

export default userReducer;
