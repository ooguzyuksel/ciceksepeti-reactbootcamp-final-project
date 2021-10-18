import * as types from "../actionTypes/actionTypes";

const initialState = {
  purchasedItems: {},
  loading: false,
  error: null,
};

const getPurchasedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_ITEM_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.PURCHASE_ITEM_SUCCESS:
      return {
        ...state,
        purchasedItems: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default getPurchasedItemsReducer;
