/* eslint-disable import/named */
import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const giveOfferPending = () => ({
  type: types.GIVE_PRODUCT_OFFER_PENDING,
});
const giveOfferSuccess = (productId, givenOfferPrice) => ({
  type: types.GIVE_PRODUCT_OFFER_SUCCESS,
  productId,
  givenOfferPrice,
});

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authReducer.initialstate.user}`,
//   },
// };

// POST REQUEST
export const offerInitiate = (id, price) => {
  return function (dispatch) {
    dispatch(giveOfferPending());
    axios
      .post(`https://bootcampapi.techcs.io/api/fe/v1/product/offer/${id}`, { offeredPrice: price })
      .then((response) => {
        console.log("offered Price Response:", response);
        dispatch(giveOfferSuccess(id, price));
      })
      .catch((err) => console.log("offered price error:", err));
  };
};
