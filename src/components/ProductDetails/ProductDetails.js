/* eslint-disable dot-notation */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import "./productDetails.scss";
import { useParams } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import axios from "../../../node_modules/axios/index";

function ProductDetails() {
  let { productDetailId } = useParams();
  const [getProduct, setGetProduct] = useState({});

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
              <button type="submit" className="buy-button">
                Satın Al
              </button>
              <button type="submit" className="offer-button">
                Teklif Ver
              </button>
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
