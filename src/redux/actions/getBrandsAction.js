import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const getBrandsPending = () => ({
  type: types.GET_BRANDS_PENDING,
});
const getBrandSuccess = (data) => ({
  type: types.GET_BRANDS_SUCCESS,
  payload: data,
});

export const getBrands = () => async (dispatch) => {
  dispatch(getBrandsPending());
  return axios
    .get("https://bootcampapi.techcs.io/api/fe/v1/detail/brand/all")
    .then((data) => dispatch(getBrandSuccess(data)))
    .catch((error) => console.log("Category Error:", error));
};
