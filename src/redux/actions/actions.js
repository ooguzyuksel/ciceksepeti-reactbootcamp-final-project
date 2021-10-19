import axios from "axios";
import * as types from "../actionTypes/actionTypes";

// LOGIN ACTIONS
const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (token, userMailAdress) => ({
  type: types.LOGIN_SUCCESS,
  payload: token,
  userMailAdress,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

// REGISTER ACTIONS
const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (token, userMailAdress) => ({
  type: types.REGISTER_SUCCESS,
  payload: token,
  userMailAdress,
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
      .post("https://bootcampapi.techcs.io/api/fe/v1/authorization/signin", { email, password })
      .then((response) => {
        console.log("response", response);
        dispatch(loginSuccess(response.data.access_token, email));
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
      .post("https://bootcampapi.techcs.io/api/fe/v1/authorization/signup", { email, password })
      .then((response) => {
        console.log("response", response);
        dispatch(registerSuccess(response.data.access_token, email));
      })
      .catch((err) => {
        console.log("error: ", err);
        dispatch(registerFail(err));
      });
  };
};
