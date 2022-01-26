export const SET_USER_NAME = "SET_USER_NAME";
export const SET_CAR_NUMBER = "SET_CAR_NUMBER";
export const LOGOUT = "LOGOUT";

export const setUserName = (userName) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: userName,
  });
};

export const setCarNumber = (carNumber) => (dispatch) => {
  dispatch({
    type: SET_CAR_NUMBER,
    payload: carNumber,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
