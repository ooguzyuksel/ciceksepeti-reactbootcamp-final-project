import axios from "axios";
import * as types from "./actionTypes";

// LOGIN ACTIONS
const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (token) => ({
  type: types.LOGIN_SUCCESS,
  payload: token,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

// REGISTER ACTIONS
const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (token) => ({
  type: types.REGISTER_SUCCESS,
  payload: token,
});

const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

// LOGOUT ACTION
export const logoutInitiate = () => ({
  type: types.LOGOUT_USER,
});

// LOGIN INITIATOR ACTION
export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    axios
      .post("/authorization/signin", { email, password })
      .then((response) => {
        console.log("response", response);
        dispatch(loginSuccess(response.data.access_token));
      })
      .catch((err) => {
        console.log("error: ", err);
        dispatch(loginFail(err));
      });
  };
};

// REGISTER INITIATOR ACTION
export const registerInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(registerStart());
    axios
      .post("/authorization/signup", { email, password })
      .then((response) => {
        console.log("response", response);
        dispatch(registerSuccess(response.data.access_token));
      })
      .catch((err) => {
        console.log("error: ", err);
        dispatch(registerFail(err));
      });
  };
};
