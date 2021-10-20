/* eslint-disable object-shorthand */
import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const addNewProductPending = () => ({
  type: types.ADD_NEW_PRODUCT_PENDING,
});
const addNewProductSuccess = (
  price,
  imageUrl,
  title,
  statustitle,
  statusid,
  colortitle,
  colorid,
  brandtitle,
  brandid,
  categorytitle,
  categoryid,
  description,
  isOfferable
) => ({
  type: types.ADD_NEW_PRODUCT_SUCCESS,
});

const addNewProductFail = (err) => ({
  type: types.ADD_NEW_PRODUCT_FAIL,
  payload: err,
});

export const addNewProductInitiate = (
  price,
  imageUrl,
  title,
  statustitle,
  statusid,
  colortitle,
  colorid,
  brandtitle,
  brandid,
  categorytitle,
  categoryid,
  description,
  isOfferable
) => {
  return function (dispatch) {
    dispatch(addNewProductPending());
    axios
      .post("https://bootcampapi.techcs.io/api/fe/v1/product/create", {
        price: price,
        imageUrl: imageUrl,
        title: title,
        status: {
          title: statustitle,
          id: statusid,
        },
        color: {
          title: colortitle,
          id: colorid,
        },
        brand: {
          title: brandtitle,
          id: brandid,
        },
        category: {
          title: categorytitle,
          id: categoryid,
        },
        description: description,
        isOfferable: isOfferable,
      })
      .then((response) => {
        console.log("offered Price Response:", response);
        dispatch(
          addNewProductSuccess(
            price,
            imageUrl,
            title,
            statustitle,
            statusid,
            colortitle,
            colorid,
            brandtitle,
            brandid,
            categorytitle,
            categoryid,
            description,
            isOfferable
          )
        );
      })
      .catch((err) => addNewProductFail(err));
  };
};
