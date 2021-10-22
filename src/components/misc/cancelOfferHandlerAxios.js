import axios from "axios";

export const cancelOfferHandler = async (offeredProductId) => {
  await axios
    .delete(`https://bootcampapi.techcs.io/api/fe/v1/account/cancel-offer/${offeredProductId}`)
    .then((response) => console.log("Offer Cancel", response))
    .catch((err) => console.log(err));
};
