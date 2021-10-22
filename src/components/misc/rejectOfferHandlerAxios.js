import axios from "axios";

export const rejectOfferHandler = async (offeredProductId, rejectSetter) => {
  await axios
    .post(`https://bootcampapi.techcs.io/api/fe/v1/account/reject-offer/${offeredProductId}`)
    .then((response) => rejectSetter(response))
    .catch((err) => console.log(err));
};
