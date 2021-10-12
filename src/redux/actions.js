import axios from "axios";
import * as types from "./actionTypes";

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
