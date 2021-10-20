import axios from "axios";

export const acceptOfferHandler = async (offeredProductId, itemSetter) => {
  await axios
    .put(`https://bootcampapi.techcs.io/api/fe/v1/account/accept-offer/${offeredProductId}`)
    .then((response) => itemSetter(response))
    .catch((err) => console.log(err));
};
