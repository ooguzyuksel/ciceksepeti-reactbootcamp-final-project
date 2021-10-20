/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReceivedOffers } from "redux/actions/receivedOffers";
import { acceptOfferHandler } from "components/misc/acceptOfferHandlerAxiosPut";
import "../GivenOffers/givenoffers.scss";
import "./receivedoffers.scss";

function ReceivedOffers() {
  const receivedOfferItems = useSelector((state) => state.receivedOffers.receivedOffers.data);
  const [pageRenderer, setPageRenderer] = useState(false);
  const [acceptOfferResult, setAcceptOfferResult] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReceivedOffers());
  }, []);

  useEffect(() => {
    receivedOfferItems;
  }, [pageRenderer]);
  // Accept & Reject Handlers
  const acceptOfferButtonHandler = (receivedOfferId) => {
    // console.log(receivedOfferId);
    acceptOfferHandler(receivedOfferId, setAcceptOfferResult);
    setPageRenderer(!setPageRenderer);
    // acceptOfferHandler();
  };

  const rejectOfferButtonHandler = (receivedOfferId) => {
    console.log(receivedOfferId);
    // acceptOfferHandler();
  };

  console.log("receivedOfferItems", receivedOfferItems);
  console.log("Accept Offer State", acceptOfferResult);
  return (
    <div>
      {receivedOfferItems?.length === 0 && (
        <div className="given-offers-wrapper">
          <h3> Henüz bir teklif almadınız.</h3>
        </div>
      )}

      <div className="given-offers-wrapper">
        {receivedOfferItems?.map((receivedOffer) => (
          <div className="given-offer-card" key={receivedOffer.id}>
            <div className="left-side">
              <div className="given-offer-img">
                <img
                  className="given-offer-full-image"
                  src={receivedOffer?.product?.imageUrl}
                  alt=""
                />
              </div>
              <div className="given-offer-info">
                <span className="given-offer-title">{receivedOffer?.product?.title}</span>
                <span className="received-info-gray">
                  <b>{receivedOffer?.offeredPrice} TL</b>
                </span>
              </div>
            </div>
            <div className="right-side">
              <div className="given-offer-result">
                {receivedOffer?.status === "offered" && (
                  <div>
                    <button onClick={() => acceptOfferButtonHandler(receivedOffer.id)}>
                      Onayla
                    </button>
                    <button onClick={() => rejectOfferButtonHandler(receivedOffer.id)}>
                      Reddet
                    </button>
                  </div>
                )}
                {receivedOffer?.status === "rejected" && (
                  <span className="offer-rejected-span">Reddedildi</span>
                )}
                {receivedOffer?.isSold === "sold" ? (
                  <span className="offer-bought-span">Müşteri Ürünü Satın Aldı</span>
                ) : (
                  receivedOffer?.status === "accepted" && (
                    <span className="offer-accepted-span">Onaylandı</span>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReceivedOffers;
