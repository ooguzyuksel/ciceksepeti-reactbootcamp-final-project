import * as types from "../actionTypes/actionTypes";

const initialState = {
  productId: null,
  givenOfferPrice: null,
  loading: false,
};

const giveProductOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GIVE_PRODUCT_OFFER_SUCCESS:
      return {
        ...state,
        productId: action.productId,
        givenOfferPrice: action.givenOfferPrice,
        loading: false,
      };
    case types.GIVE_PRODUCT_OFFER_PENDING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default giveProductOfferReducer;
