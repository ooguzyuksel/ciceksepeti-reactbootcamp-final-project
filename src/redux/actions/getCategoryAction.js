import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const getCategoryPending = () => ({
  type: types.GET_CATEGORY_PENDING,
});
const getCategorySuccess = (data) => ({
  type: types.GET_CATEGORY_SUCCESS,
  payload: data,
});

export const getCategories = () => async (dispatch) => {
  dispatch(getCategoryPending());
  return axios
    .get("/detail/category/all")
    .then((data) => dispatch(getCategorySuccess(data)))
    .catch((error) => console.log("Category Error:", error));
};
