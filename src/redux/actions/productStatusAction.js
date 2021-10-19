import axios from "axios";
import * as types from "../actionTypes/actionTypes";

const getItemStatusPending = () => ({
  type: types.ITEM_STATUS_PENDING,
});
const getItemStatusSuccess = (data) => ({
  type: types.ITEM_STATUS_SUCCESS,
  payload: data,
});

export const getItemStatusses = () => async (dispatch) => {
  dispatch(getItemStatusPending());
  return axios
    .get("https://bootcampapi.techcs.io/api/fe/v1/detail/status/all")
    .then((data) => dispatch(getItemStatusSuccess(data)))
    .catch((error) => console.log("Category Error:", error));
};
