/* eslint-disable react/button-has-type */
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalSecond from "components/ModalSecond/ModalSecond";
import { ToastContainer, toast } from "react-toastify";
import { getGivenOffers } from "../../redux/actions/givenOffers";
import { getPurchasedItem } from "../../redux/actions/purchaseActions";

import "./givenoffers.scss";

function GivenOffers() {
  const givenOfferItems = useSelector((state) => state.givenOffers.givenOffers.data);
  const givenoffertest = useSelector((state) => state);
  const dispatch = useDispatch();
  const modalSecondRef = useRef();
  const openModalSecond = () => {
    modalSecondRef.current.modalSecondOpener();
  };
  const closeModalSecond = () => {
    modalSecondRef.current.modalSecondCloser();
  };
  const notifyPurchaseSuccess = (text) => toast.success(text, { autoClose: 3000 });
  useEffect(() => {
    dispatch(getGivenOffers());
  }, []);

  const purchaseHandler = (e) => {
    e.preventDefault();
    dispatch(getPurchasedItem());
    closeModalSecond();
    notifyPurchaseSuccess("Satın Alındı");
  };

  console.log("TEKLİF VERDİKLERİM:", givenOfferItems);
  // console.log("Given test item:", givenoffertest);
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
              {offeredItem?.isSold === "sold" && <span className="offer-rejected">Reddedildi</span>}
              {!offeredItem?.isSold && (
                <div>
                  <button
                    onClick={() => {
                      openModalSecond();
                    }}
                  >
                    Satın Al
                  </button>
                  <span className="offer-accepted">Onaylandı</span>
                  <ModalSecond ref={modalSecondRef}>
                    <form className="purchase-container">
                      <h3 className="purchase-title">SATIN AL</h3>
                      <p>Satın almak istiyor musunuz ?</p>
                      <div>
                        <button className="reject" onClick={closeModalSecond}>
                          Vazgeç
                        </button>
                        <button className="accept" type="submit" onClick={purchaseHandler}>
                          Satın Al
                        </button>
                      </div>
                    </form>
                  </ModalSecond>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {givenOfferItems?.length === 0 && <h1> Henüz bir teklif vermediniz.</h1>}
      <ToastContainer />
    </div>
  );
}

export default GivenOffers;
