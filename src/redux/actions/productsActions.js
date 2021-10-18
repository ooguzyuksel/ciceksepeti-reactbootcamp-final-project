import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const getProductsPending = () => ({
  type: types.GET_PRODUCTS_PENDING,
});

const getProductsSuccess = (data) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload: data,
});

export const getProducts = () => async (dispatch) => {
  dispatch(getProductsPending());
  return axios
    .get("http://bootcampapi.techcs.io/api/fe/v1/product/all")
    .then((data) => dispatch(getProductsSuccess(data)))
    .catch((error) => console.log("Products Error", error));
};
