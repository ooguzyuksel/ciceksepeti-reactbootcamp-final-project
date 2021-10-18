import * as types from "../actionTypes/actionTypes";

const initialState = {
  givenOffers: {},
  loading: false,
  error: null,
};

const getGivenOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GIVEN_OFFER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.GIVEN_OFFER_SUCCESS:
      return {
        ...state,
        givenOffers: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default getGivenOffersReducer;
