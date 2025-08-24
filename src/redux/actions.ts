import { Dispatch } from "redux";
import { CarDTO, UserDTO, CarRelationsDTO } from "../BE_Api/ServerDTOs";

// Action Types
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_CARS = "SET_USER_CARS";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_GOOGLE_ID_TOKEN = "SET_GOOGLE_ID_TOKEN";
export const SET_CAR_RELATIONS = "SET_CAR_RELATIONS";
export const ADD_CAR_RELATION = "ADD_CAR_RELATION";
export const CLEAR_CAR_RELATIONS = "CLEAR_CAR_RELATIONS";
export const SET_FCM_TOKEN = "SET_FCM_TOKEN";
export const LOGOUT = "LOGOUT";

// Action Creators with proper typing
export interface SetUserInfoAction {
  type: typeof SET_USER_INFO;
  payload: UserDTO;
}

export interface SetUserCarsAction {
  type: typeof SET_USER_CARS;
  payload: CarDTO[];
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: string;
}

export interface SetGoogleIdTokenAction {
  type: typeof SET_GOOGLE_ID_TOKEN;
  payload: string | null;
}

export interface SetCarRelationsAction {
  type: typeof SET_CAR_RELATIONS;
  payload: CarRelationsDTO[];
}

export interface AddCarRelationAction {
  type: typeof ADD_CAR_RELATION;
  payload: CarRelationsDTO;
}

export interface ClearCarRelationsAction {
  type: typeof CLEAR_CAR_RELATIONS;
}

export interface SetFcmTokenAction {
  type: typeof SET_FCM_TOKEN;
  payload: string | null;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes =
    | SetUserInfoAction
    | SetUserCarsAction
    | SetAuthTokenAction
    | SetGoogleIdTokenAction
    | SetCarRelationsAction
    | AddCarRelationAction
    | ClearCarRelationsAction
    | SetFcmTokenAction
    | LogoutAction;

export const setUserInfo = (userInfo: UserDTO) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_USER_INFO,
    payload: userInfo,
  });
};

export const setUserCars = (cars: CarDTO[]) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_USER_CARS,
    payload: cars,
  });
};

export const setAuthToken = (token: string) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_AUTH_TOKEN,
    payload: token,
  });
};

export const setGoogleIdToken = (token: string | null) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_GOOGLE_ID_TOKEN,
    payload: token,
  });
};

export const setCarRelations = (carRelations: CarRelationsDTO[]) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_CAR_RELATIONS,
    payload: carRelations,
  });
};

export const addCarRelation = (carRelation: CarRelationsDTO) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: ADD_CAR_RELATION,
    payload: carRelation,
  });
};

export const clearCarRelations = () => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: CLEAR_CAR_RELATIONS,
  });
};

export const setFcmToken = (token: string | null) => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: SET_FCM_TOKEN,
    payload: token,
  });
};

export const logout = () => (dispatch: Dispatch<UserActionTypes>) => {
  dispatch({
    type: LOGOUT,
  });
};