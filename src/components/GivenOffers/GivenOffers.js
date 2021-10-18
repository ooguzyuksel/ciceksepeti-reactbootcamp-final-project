/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGivenOffers } from "../../redux/actions/givenOffers";
import "./givenoffers.scss";

function GivenOffers() {
  const givenOfferItems = useSelector((state) => state.givenOffers.givenOffers.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGivenOffers());
  }, []);

  console.log(givenOfferItems);
  return (
    <div className="given-offers-wrapper">
      {givenOfferItems?.map((offeredItem) => (
        <div className="given-offer-card" key={offeredItem.id}>
          <div className="left-side">
            <div className="given-offer-img">
              <img className="given-offer-full-image" src={offeredItem?.product?.imageUrl} alt="" />
            </div>
            <div className="given-offer-info">
              <span className="given-offer-title">{offeredItem?.product?.title}</span>
              <span className="offered-info-gray">
                <b>{offeredItem?.offeredPrice} TL</b>
              </span>
            </div>
          </div>
          <div className="right-side">
            <div className="given-offer-result">
              <button>Satın Al</button>
              <span>Onaylandı</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GivenOffers;
