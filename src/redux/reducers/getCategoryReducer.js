import * as types from "redux/actionTypes/actionTypes";

const initialState = {
  categories: {},
  loading: false,
};

const getCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY_PENDING:
      return { ...state, loading: true };
    case types.GET_CATEGORY_SUCCESS:
      return { ...state, categories: action.payload, loading: false };
    default:
      return state;
  }
};

export default getCategoryReducer;
