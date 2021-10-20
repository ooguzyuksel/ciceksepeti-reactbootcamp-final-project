// /* eslint-disable prettier/prettier */
// import axios from "axios";
// import * as types from "../actionTypes/actionTypes";

// const userTokenID = localStorage.getItem("loggedUserKey");
// const productID = localStorage.getItem("productId");
// const postPurchaseItemPending = () => ({
//   type: types.PURCHASE_ITEM_PENDING,
// });
// const postPurchaseItemSuccess = (data) => ({
//   type: types.PURCHASE_ITEM_SUCCESS,
//   payload: data,
// });

// export const getPurchasedItem = () => async (dispatch) => {
//   dispatch(postPurchaseItemPending());
//   return axios
//     .put(`https://bootcampapi.techcs.io/api/fe/v1/product/purchase/${productID}`)
//     .then((data) => dispatch(postPurchaseItemSuccess(data)))
//     .catch((error) => console.log("Category Error:", error));
// }
