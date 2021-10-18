import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const userTokenID = localStorage.getItem("loggedUserKey");
const getReceivedOffersPending = () => ({
  type: types.GIVEN_OFFER_PENDING,
});
const getReceivedOffersSuccess = (data) => ({
  type: types.GIVEN_OFFER_SUCCESS,
  payload: data,
});

export const getGivenOffers = () => async (dispatch) => {
  dispatch(getReceivedOffersPending());
  return axios
    .get("http://bootcampapi.techcs.io/api/fe/v1/account/given-offers", {
      headers: { Authorization: `Bearer ${userTokenID}` },
    })
    .then((data) => dispatch(getReceivedOffersSuccess(data)))
    .catch((error) => console.log("Category Error:", error));
};
