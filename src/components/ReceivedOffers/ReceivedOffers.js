/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReceivedOffers } from "redux/actions/receivedOffers";
import { acceptOfferHandler } from "components/misc/acceptOfferHandlerAxiosPut";
import { rejectOfferHandler } from "components/misc/rejectOfferHandlerAxios";
import "../GivenOffers/givenoffers.scss";
import "./receivedoffers.scss";

function ReceivedOffers() {
  const receivedOfferItems = useSelector((state) => state.receivedOffers.receivedOffers.data);
  const [acceptOfferResult, setAcceptOfferResult] = useState({});
  const [rejectOfferResult, setRejectOfferResult] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReceivedOffers());
  }, []);

  useEffect(() => {
    dispatch(getReceivedOffers());
  }, [acceptOfferResult]);

  useEffect(() => {
    dispatch(getReceivedOffers());
  }, [setRejectOfferResult]);

  // Accept & Reject Handlers
  const acceptOfferButtonHandler = (receivedOfferId) => {
    // console.log(receivedOfferId);
    acceptOfferHandler(receivedOfferId, setAcceptOfferResult);
    // acceptOfferHandler();
  };

  const rejectOfferButtonHandler = (receivedOfferId) => {
    // console.log(receivedOfferId);
    rejectOfferHandler(receivedOfferId, setRejectOfferResult);
    // acceptOfferHandler();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  console.log("receivedOfferItems", receivedOfferItems);
  console.log("Accept Offer State", acceptOfferResult);
  console.log("Reject Offer State", rejectOfferResult);
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
                {receivedOffer?.status === "offered" && receivedOffer?.isSold !== "sold" && (
                  <>
                    <div>
                      <button
                        type="submit"
                        onClick={() => acceptOfferButtonHandler(receivedOffer.id)}
                        onSubmit={onSubmitHandler}
                      >
                        Onayla
                      </button>
                      <button
                        type="submit"
                        onClick={() => rejectOfferButtonHandler(receivedOffer.id)}
                        className="reject-button"
                      >
                        Reddet
                      </button>
                    </div>
                  </>
                )}

                {receivedOffer?.status === "offered" && receivedOffer?.isSold === "sold" && (
                  <div className="offer-bought-span">Farklı Müşteri Satın Aldı</div>
                )}

                {receivedOffer?.status === "rejected" && (
                  <span className="offer-rejected-span">Reddedildi</span>
                )}

                {receivedOffer?.status === "accepted" && (
                  <span className="offer-accepted-span">Onaylandı</span>
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
