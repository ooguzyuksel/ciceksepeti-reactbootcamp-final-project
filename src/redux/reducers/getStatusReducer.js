import * as types from "redux/actionTypes/actionTypes";

const initialState = {
  statusses: {},
  loading: false,
};

const getStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ITEM_STATUS_PENDING:
      return { ...state, loading: true };
    case types.ITEM_STATUS_SUCCESS:
      return { ...state, statusses: action.payload, loading: false };
    default:
      return state;
  }
};

export default getStatusReducer;
