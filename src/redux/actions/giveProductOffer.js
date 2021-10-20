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

// POST REQUEST
export const offerInitiate = (productDetailId, price) => {
  return function (dispatch) {
    dispatch(giveOfferPending());
    axios
      .post(`https://bootcampapi.techcs.io/api/fe/v1/product/offer/${productDetailId}`, {
        offeredPrice: price,
      })
      .then((response) => {
        console.log("offered Price Response:", response);
        dispatch(giveOfferSuccess(productDetailId, price));
      })
      .catch((err) => console.log("offered price error:", err));
  };
};
