import * as types from "../actionTypes/actionTypes";

const initialState = {
  products: {},
  loading: false,
  error: null,
};

const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default getProductsReducer;
