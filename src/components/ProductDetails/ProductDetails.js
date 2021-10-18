/* eslint-disable no-alert */
/* eslint-disable radix */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable dot-notation */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from "react";
import "./productDetails.scss";
import { useParams } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import Modal from "components/Modal/Modal";
import ModalSecond from "components/ModalSecond/ModalSecond";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "../../../node_modules/axios/index";
import { radioValues } from "../misc/radioButtonValues";
import { elementCapitalizer } from "../misc/firstLetterCapitalizer";

function ProductDetails() {
  const userTokenId = useSelector((state) => state.auth.user);
  const modalRef = useRef();
  const modalSecondRef = useRef();
  let { productDetailId } = useParams();
  const [getProduct, setGetProduct] = useState({});
  const [offeredValue, setOfferedValue] = useState(0);
  const [finalOfferedPrice, setFinalOfferedPrice] = useState(
    localStorage.getItem(productDetailId, offeredValue)
  );
  const [offerPriceButtonCheck, setOfferPriceButtonCheck] = useState(
    localStorage.getItem(productDetailId, offeredValue)
  );
  const [soldItemID, setSoldItemID] = useState(false);

  console.log({ productDetailId });
  // MODALS - Opening modal from different component to handle resuable modal
  const openModal = () => {
    modalRef.current.modalOpener();
  };
  const closeModal = () => {
    modalRef.current.modalCloser();
  };
  const openModalSecond = () => {
    modalSecondRef.current.modalSecondOpener();
  };
  const closeModalSecond = () => {
    modalSecondRef.current.modalSecondCloser();
  };

  // TOASTIFY
  const notifySuccess = () => toast.success("Teklif başarıyla verildi.", { autoClose: 3000 });
  const notifyPurchaseSuccess = () =>
    toast.success("Satın alma işlemi başarıyla gerçekleştirildi.", { autoClose: 3000 });
  const notifyRetrieveSuccess = () =>
    toast.success("Teklif başarıyla geri çekildi.", { autoClose: 3000 });
  const notifyError = () => toast.error("Lütfen bir teklif seçiniz.", { autoClose: 2000 });

  // Radio button value handler
  const radioValueHandler = (e) => {
    setOfferedValue(Number(e.target.value));
  };

  // Buraya tekrar bakılacak. Şu an teklifi geri çek çalışmıyor.
  /*   const configForPurchase = {
    headers: { Authorization: `Bearer ${userTokenId}` },
  };
  const purchaseHandlerAxiosPut = async () => {
    await axios
      .put(
        `http://bootcampapi.techcs.io/api/fe/v1/product/purchase/${productDetailId}`,
        configForPurchase
      )
      .then((response) => console.log("Purchase Response: ", response))
      .catch((err) => console.log(err));
  }; */

  // Retreive offer
  const retreiveHandler = () => {
    localStorage.removeItem(productDetailId, offeredValue);
    setOfferPriceButtonCheck(false);
    notifyRetrieveSuccess();
    setFinalOfferedPrice(null);
  };

  // OFFER - POST REQUEST"
  const config = {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userTokenId}` },
  };
  const mainPosOfferedValue = async () => {
    await axios
      .post(
        `http://bootcampapi.techcs.io/api/fe/v1/product/offer/${productDetailId}`,
        {
          offeredPrice: offeredValue,
        },
        config
      )
      .then((response) => console.log("Give Offer Response: ", response))
      .catch((err) => setPostError(err));
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    if (offeredValue > 0) {
      mainPosOfferedValue();
      setFinalOfferedPrice(offeredValue);
      localStorage.setItem(productDetailId, offeredValue);
      notifySuccess();
      setOfferPriceButtonCheck(true);
      setTimeout(() => {
        closeModal();
        setOfferedValue(0);
      }, 200);
    } else {
      notifyError();
    }
  };
  // console.log({ getProduct });
  // console.log({ getOfferedReduxFinalPrice });

  const purchaseHandler = (e) => {
    e.preventDefault();
    setSoldItemID(true);
    notifyPurchaseSuccess();
  };
  // Fetching asyncroniously id entered data in order to show it Product Details Page
  const getProductData = async () => {
    await axios
      .get(`http://bootcampapi.techcs.io/api/fe/v1/product/${productDetailId}`)
      .then((data) => setGetProduct(data.data))
      .catch((error) => console.log(error));
  };

  // Mounting getProductData() function when get data productDetailId drilled from parent component
  useEffect(() => {
    getProductData();
  }, [productDetailId]);

  return (
    <div className="home-wrapper">
      <ToastContainer />
      <div className="home-container">
        <Navbar />
      </div>
      <div className="product-info-wrapper">
        <div className="product-info-container">
          {/* Cover Picture */}
          <div className="left-product-cover">
            <img src={getProduct.imageUrl} alt={getProduct.title} />
          </div>

          {/* Right Product Info */}
          <div className="right-product-info">
            <h2>{elementCapitalizer(getProduct?.title)}</h2>
            <div className="brand-color-status">
              <label>
                <b>Marka:</b>
              </label>
              <span>{elementCapitalizer(getProduct?.brand?.title)}</span>
            </div>
            <div className="brand-color-status">
              <label>
                <b>Renk:</b>
              </label>
              <span>{elementCapitalizer(getProduct?.color?.title)}</span>
            </div>
            <div className="brand-color-status">
              <label>
                <b>Kullanım Durumu:</b>
              </label>
              <span>{elementCapitalizer(getProduct?.status?.title)}</span>
            </div>
            <h2>{getProduct.price} TL</h2>
            {finalOfferedPrice && (
              <div className="final-offered-price">
                <span>
                  <span className="final-offered-price-subtitle"> Verilen Teklif: </span>
                  <b>{finalOfferedPrice} TL</b>
                </span>
              </div>
            )}
            <div>
              {!getProduct.isSold && !soldItemID ? (
                <>
                  <button
                    type="submit"
                    className="buy-button"
                    onClick={() => {
                      openModalSecond();
                    }}
                  >
                    Satın Al
                  </button>

                  {/* Purchase Modal */}
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
                </>
              ) : (
                <button type="submit" className="item-not-sold">
                  Bu Ürün Satışta Değil
                </button>
              )}
              {!getProduct?.isSold && getProduct?.isOfferable && !soldItemID && (
                <>
                  {!offerPriceButtonCheck && (
                    <button
                      type="submit"
                      className="offer-button"
                      onClick={() => {
                        openModal();
                      }}
                    >
                      Teklif Ver
                    </button>
                  )}
                  {offerPriceButtonCheck && (
                    <button type="submit" className="offer-button" onClick={retreiveHandler}>
                      Teklifi Geri Çek
                    </button>
                  )}
                  {/* Offer Modal */}
                  <Modal ref={modalRef}>
                    <form>
                      {/* Product Pop-Up Information Area */}
                      <div className="offer-wrapper">
                        <div className="offer-info-container">
                          <div>
                            <img
                              src={getProduct?.imageUrl}
                              alt={getProduct.title}
                              className="offer-info-image"
                            />
                          </div>
                          <div className="offer-info-detail">
                            <small>{elementCapitalizer(getProduct?.title)}</small>
                            <small>{elementCapitalizer(getProduct?.color?.title)}</small>
                          </div>
                          <div className="offer-info-price">
                            <span>{getProduct?.price} TL</span>
                          </div>
                        </div>
                      </div>

                      {/* Offer Area */}
                      <div>
                        {radioValues.map((radioValue) => (
                          <div className="offer-radio" key={radioValue.id}>
                            <input
                              className="offer-radioButton"
                              type="radio"
                              name="offer"
                              id={radioValue.id}
                              value={radioValue.value * getProduct?.price.toFixed(2)}
                              onClick={radioValueHandler}
                            />
                            <label htmlFor={radioValue.id}>{radioValue.title}</label>
                          </div>
                        ))}
                        {/* <div className="offer-input">
                          <input
                            type="number"
                            name="offer"
                            id="offeredValue"
                            placeholder="Teklif Belirle"
                            onChange={openOfferHandler}
                          />
                        </div> */}
                      </div>

                      {/* TEST DIV */}

                      {/* Offer Verifying Area */}
                      <div className="verify-button-container">
                        <button type="submit" onClick={handleOfferSubmit}>
                          Onayla
                        </button>
                      </div>
                    </form>
                  </Modal>
                </>
              )}
            </div>
            <h3>Açıklama</h3>
            <p>{getProduct?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
