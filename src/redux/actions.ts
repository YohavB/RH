import { Dispatch } from "redux";
import { CarDTO, UserDTO } from "../classes/RHClasses";

// Action Types
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_ID = "SET_USER_ID";
export const SET_EXPO_TOKEN = "SET_EXPO_TOKEN";
export const SET_USER_CARS = "SET_USER_CARS";
export const SET_CAR_PLATE = "SET_CAR_PLATE";
export const SET_CAR_COUNTRY = "SET_CAR_COUNTRY";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
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
  payload: CarDTO[];
}

export interface SetCarPlateAction {
  type: typeof SET_CAR_PLATE;
  payload: string;
}

export interface SetCarCountryAction {
  type: typeof SET_CAR_COUNTRY;
  payload: string;
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: string;
}

export interface SetUserDetailsAction {
  type: typeof SET_USER_DETAILS;
  payload: UserDTO;
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
    | SetCarCountryAction
    | SetAuthTokenAction
    | SetUserDetailsAction
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

export const setUserCars = (cars: CarDTO[]) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_USER_CARS,
    payload: cars,
  });
};

export const setCarPlate = (plateNumber: string, country: string) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_CAR_PLATE,
    payload: plateNumber,
  });
  dispatch({
    type: SET_CAR_COUNTRY,
    payload: country,
  });
};

export const setAuthToken = (token: string) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_AUTH_TOKEN,
    payload: token,
  });
};

export const setUserDetails = (userDetails: UserDTO) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: userDetails,
  });
};

export const logout = () => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: LOGOUT,
  });
};