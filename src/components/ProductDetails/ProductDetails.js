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
import axios from "../../../node_modules/axios/index";

function ProductDetails() {
  const modalRef = useRef();
  const modalSecondRef = useRef();
  let { productDetailId } = useParams();
  const [getProduct, setGetProduct] = useState({});

  // Opening modal from different component to handle resuable modal
  const openModal = () => {
    modalRef.current.modalOpener();
    // console.log(modalRef);
  };
  const closeModal = () => {
    modalRef.current.modalCloser();
    // console.log(modalRef);
  };

  const openModalSecond = () => {
    modalSecondRef.current.modalSecondOpener();
  };

  const elementCapitalizer = (el1) => {
    let capital = el1?.toString().charAt(0).toUpperCase();
    let rest = el1?.toString().slice(1);
    let compose = capital?.concat(rest);
    return compose;
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

  console.log(getProduct);
  return (
    <div className="home-wrapper">
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
            <div>
              {getProduct.isSold && (
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
                    <div className="purchase-container">
                      <h3 className="purchase-title">SATIN AL</h3>
                      <p>Satın almak istiyor musunuz ?</p>
                      <div>
                        <button className="reject">Vazgeç</button>
                        <button className="accept">Satın Al</button>
                      </div>
                    </div>
                  </ModalSecond>
                </>
              )}
              {getProduct.isOfferable && (
                <>
                  <button
                    type="submit"
                    className="offer-button"
                    onClick={() => {
                      openModal();
                    }}
                  >
                    Teklif Ver
                  </button>
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
                        <div className="offer-radio">
                          <input
                            className="offer-radioButton"
                            type="radio"
                            name="offer"
                            id="twentypercent"
                            value={0.2}
                          />
                          <label htmlFor="twentypercent">%20'si Kadar Teklif Ver</label>
                        </div>
                        <div className="offer-radio">
                          <input type="radio" name="offer" id="thirtypercent" value={0.3} />
                          <label htmlFor="thirtypercent">%30'u Kadar Teklif Ver</label>
                        </div>
                        <div className="offer-radio">
                          <input type="radio" name="offer" id="fortypercent" value={0.4} />
                          <label htmlFor="fortypercent">%40'ı Kadar Teklif Ver</label>
                        </div>
                        <div className="offer-input">
                          <input type="number" name="" id="" placeholder="Teklif Belirle" />
                        </div>
                      </div>

                      {/* Offer Verifying Area */}
                      <div className="verify-button-container">
                        <button type="submit">Onayla</button>
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
