import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReceivedOffers } from "redux/actions/receivedOffers";
import "../GivenOffers/givenoffers.scss";

function ReceivedOffers() {
  const receivedOfferItems = useSelector((state) => state.receivedOffers.receivedOffers.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReceivedOffers());
  }, []);

  return (
    <div>
      {receivedOfferItems?.length === 0 && <h1> Henüz bir teklif almadınız.</h1>}
      {receivedOfferItems?.length > 0 && <h1> TEKLİFİN VAR. ARRAYİ MAPLE</h1>}
    </div>
  );
}

export default ReceivedOffers;
