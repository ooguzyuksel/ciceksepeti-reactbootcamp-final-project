import * as types from "../actionTypes/actionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  userMail: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
    case types.REGISTER_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        userMail: action.userMailAdress,
      };
    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;
