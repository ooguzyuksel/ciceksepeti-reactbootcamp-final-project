import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const getColorsPending = () => ({
  type: types.GET_COLORS_PENDING,
});
const getColorSuccess = (data) => ({
  type: types.GET_COLORS_SUCCESS,
  payload: data,
});

export const getColors = () => async (dispatch) => {
  dispatch(getColorsPending());
  return axios
    .get("https://bootcampapi.techcs.io/api/fe/v1/detail/color/all")
    .then((data) => dispatch(getColorSuccess(data)))
    .catch((error) => console.log("Category Error:", error));
};
