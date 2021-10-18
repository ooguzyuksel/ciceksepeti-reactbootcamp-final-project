/* eslint-disable react/button-has-type */
import Navbar from "components/Navbar/Navbar";
import React from "react";
import "./addproduct.scss";
import uploadicon from "../../images/uploadicon.svg";

function AddProduct() {
  return (
    <div className="addproduct-wrapper">
      <Navbar />

      <div className="addproduct-container">
        <div className="addproduct-area">
          <div className="left-area">
            <h3>Ürün Detayları</h3>
            <div className="sub-container">
              {/* Product Title */}
              <label className="addproduct-labels">Ürün Adı</label>
              <input
                type="text"
                placeholder="Örnek: Iphone 12 Pro Max"
                className="addproduct-inputs"
              />
            </div>
            {/* Explanation */}
            <div className="sub-container ">
              <label className="addproduct-labels">Açıklama</label>
              <textarea
                type="text"
                placeholder="Ürün açıklaması girin"
                className="addproduct-inputs textarea-input"
                rows="5"
              />
            </div>
            {/* Category & Brand - Dropdown */}
            <div className="sub-container-multiple">
              {/* Category */}
              <div className="sub-container-secondary">
                <label className="addproduct-labels">Kategori</label>
                <select name="" id="" className="addproduct-selects">
                  <option value="">Kategori Seç</option>
                </select>
              </div>
              {/* Brand */}
              <div className="sub-container-secondary">
                <label className="addproduct-labels">Marka</label>
                <select name="" id="" className="addproduct-selects">
                  <option value="">Marka Seç</option>
                </select>
              </div>
            </div>

            {/* Color & Usage - Dropdown */}
            <div className="sub-container-multiple">
              {/* Color */}
              <div className="sub-container-secondary">
                <label className="addproduct-labels">Renk</label>
                <select name="" id="" className="addproduct-selects">
                  <option value="">Renk Seç</option>
                </select>
              </div>
              {/* Usage */}
              <div className="sub-container-secondary">
                <label className="addproduct-labels">Kullanım Durumu</label>
                <select name="" id="" className="addproduct-selects">
                  <option value="">Kullanım Durumu Seç</option>
                </select>
              </div>
            </div>
            {/* Price */}
            <div className="sub-container">
              <label className="addproduct-labels">Fiyat</label>
              <input
                type="text"
                placeholder="Bir fiyat girin"
                className="addproduct-inputs price-input"
              />
            </div>
            <div className="sub-container">
              <span>TOGGLE - muhtemelen checkboxdır</span>
            </div>
          </div>

          <div className="right-area">
            <h3>Ürün Görseli</h3>
            <div className="right-area-container">
              <img src={uploadicon} alt="uploadicon" />
              <p>Sürükleyip bırakarak yükle veya</p>
              <div>
                <button className="upload-button">Görsel Seçin</button>
              </div>
              <small>PNG ve JPEG Dosya boyutu: max. 100kb</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
