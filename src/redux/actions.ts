import { Dispatch } from "redux";

// Define UserDTO interface
interface UserDTO {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    photo?: string;
  };
  carNumber?: string;
  // Add other properties as needed
}

// Action Types
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_ID = "SET_USER_ID";
export const SET_EXPO_TOKEN = "SET_EXPO_TOKEN";
export const SET_USER_CARS = "SET_USER_CARS";
export const SET_CAR_PLATE = "SET_CAR_PLATE";
export const LOGOUT = "LOGOUT";

// Action Creators with proper typing
export interface SetUserInfoAction {
  type: typeof SET_USER_INFO;
  payload: UserDTO;
}

export interface SetUserIdAction {
  type: typeof SET_USER_ID;
  payload: number;
}

export interface SetExpoTokenAction {
  type: typeof SET_EXPO_TOKEN;
  payload: string;
}

export interface SetUserCarsAction {
  type: typeof SET_USER_CARS;
  payload: any[];
}

export interface SetCarPlateAction {
  type: typeof SET_CAR_PLATE;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes =
    | SetUserInfoAction
    | SetUserIdAction
    | SetExpoTokenAction
    | SetUserCarsAction
    | SetCarPlateAction
    | LogoutAction;

export const setUserInfo = (userInfo: UserDTO) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_USER_INFO,
    payload: userInfo,
  });
};

export const setUserIdFromDB = (userIdFromDB: number) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_USER_ID,
    payload: userIdFromDB,
  });
};

export const setExpoToken = (expoToken: string) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_EXPO_TOKEN,
    payload: expoToken,
  });
};

export const setUserCars = (cars: any[]) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_USER_CARS,
    payload: cars,
  });
};

export const setCarPlate = (plateNumber: string) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_CAR_PLATE,
    payload: plateNumber,
  });
};

export const logout = () => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: LOGOUT,
  });
};