import * as types from "../actionTypes/actionTypes";

const initialState = {
  receivedOffers: {},
  loading: false,
  error: null,
};

const getReceivedOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_OFFER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.RECEIVED_OFFER_SUCCESS:
      return {
        ...state,
        receivedOffers: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default getReceivedOffersReducer;
