import * as types from "redux/actionTypes/actionTypes";

const initialState = {
  brands: {},
  loading: false,
};

const getBrandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BRANDS_PENDING:
      return { ...state, loading: true };
    case types.GET_BRANDS_SUCCESS:
      return { ...state, brands: action.payload, loading: false };
    default:
      return state;
  }
};

export default getBrandsReducer;
