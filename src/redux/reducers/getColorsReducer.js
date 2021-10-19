import * as types from "redux/actionTypes/actionTypes";

const initialState = {
  colors: {},
  loading: false,
};

const getColorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COLORS_PENDING:
      return { ...state, loading: true };
    case types.GET_COLORS_SUCCESS:
      return { ...state, colors: action.payload, loading: false };
    default:
      return state;
  }
};

export default getColorsReducer;
