/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalSecond from "components/ModalSecond/ModalSecond";
import { ToastContainer, toast } from "react-toastify";
import { getGivenOffers } from "../../redux/actions/givenOffers";
import { getPurchasedItem } from "../../redux/actions/purchaseActions";

import "./givenoffers.scss";

function GivenOffers() {
  const givenOfferItems = useSelector((state) => state.givenOffers.givenOffers.data);
  const dispatch = useDispatch();
  const modalSecondRef = useRef();
  const [itemData, setItemData] = useState("");
  const openModalSecond = () => {
    modalSecondRef.current.modalSecondOpener();
  };
  const closeModalSecond = () => {
    modalSecondRef.current.modalSecondCloser();
  };
  const notifyPurchaseSuccess = (text) => toast.success(text, { autoClose: 3000 });

  useEffect(() => {
    dispatch(getGivenOffers());
    dispatch(getPurchasedItem());
  }, []);

  const purchaseHandler = (e) => {
    e.preventDefault();
    dispatch(getPurchasedItem(itemData));
    closeModalSecond();
    notifyPurchaseSuccess("Satın Alındı");
  };

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
              {offeredItem?.isSold === "sold" && offeredItem?.status === "accepted" && (
                <span className="offer-bought-span">Satın Alındı</span>
              )}

              {offeredItem?.isSold === "sold" && offeredItem?.status === "offered" && (
                <span className="offer-sold-someone-else-span">Farklı Müşteri Satın Aldı</span>
              )}

              {offeredItem?.isSold === "sold" && offeredItem?.status === "rejected" && (
                <span className="offer-rejected-span">Reddedildi</span>
              )}

              {!offeredItem?.isSold && (
                <div>
                  {offeredItem?.status !== "accepted" && offeredItem?.status !== "rejected" && (
                    <span className="offer-waiting-span">Satıcının cevabı bekleniyor</span>
                  )}

                  {offeredItem?.status === "accepted" && (
                    <>
                      <button
                        onClick={() => {
                          openModalSecond();
                          setItemData(offeredItem?.product?.id);
                        }}
                      >
                        Satın Al
                      </button>
                      <span className="offer-accepted-span">Onaylandı</span>
                    </>
                  )}
                  {offeredItem?.status === "rejected" && (
                    <span className="offer-rejected-span">Reddedildi</span>
                  )}
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
      {givenOfferItems?.length === 0 && <h3> Henüz bir teklif vermediniz.</h3>}
      <ToastContainer />
    </div>
  );
}

export default GivenOffers;
