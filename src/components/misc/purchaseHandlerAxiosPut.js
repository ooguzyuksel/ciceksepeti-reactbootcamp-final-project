import axios from "axios";

export const purchaseHandlerAxiosPut = async (productDetailId, config) => {
  await axios
    .put(`https://bootcampapi.techcs.io/api/fe/v1/product/purchase/${productDetailId}`, config)
    .then((response) => console.log("Purchase Response: ", response))
    .catch((err) => console.log(err));
};
