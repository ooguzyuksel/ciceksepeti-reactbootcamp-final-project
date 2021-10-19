/* eslint-disable react/button-has-type */
import Navbar from "components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import "./addproduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import uploadicon from "../../images/uploadicon.svg";
import { getCategories } from "../../redux/actions/getCategoryAction";
import { getItemStatusses } from "../../redux/actions/productStatusAction";
import { getBrands } from "../../redux/actions/getBrandsAction";
import { getColors } from "../../redux/actions/getColorsAction";

function AddProduct() {
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.category.categories.data);
  const statusses = useSelector((state) => state.itemStatusses.statusses.data);
  const brands = useSelector((state) => state.brands.brands.data);
  const colors = useSelector((state) => state.colors.colors.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getItemStatusses());
    dispatch(getBrands());
    dispatch(getColors());
  }, []);

  console.log(user);
  return (
    <>
      {user && (
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
                      <option disabled selected>
                        Kategori Seç
                      </option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Brand */}
                  <div className="sub-container-secondary">
                    <label className="addproduct-labels">Marka</label>
                    <select name="" id="" className="addproduct-selects">
                      <option disabled selected>
                        Marka Seç
                      </option>
                      {brands?.map((brand) => (
                        <option value={brand.title} key={brand.id}>
                          {brand.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Color & Usage - Dropdown */}
                <div className="sub-container-multiple">
                  {/* Color */}
                  <div className="sub-container-secondary">
                    <label className="addproduct-labels">Renk</label>
                    <select name="" id="" className="addproduct-selects">
                      <option disabled selected>
                        Renk Seç
                      </option>
                      {colors?.map((color) => (
                        <option value={color.id} key={color.id}>
                          {color.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Usage */}
                  <div className="sub-container-secondary">
                    <label className="addproduct-labels">Kullanım Durumu</label>
                    <select name="" id="" className="addproduct-selects">
                      <option disabled selected>
                        Kullanım durumu seç
                      </option>
                      {statusses?.map((itemStatus) => (
                        <option value={itemStatus.id} key={itemStatus.id}>
                          {itemStatus.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Price */}
                <div className="sub-container">
                  <label className="addproduct-labels">Fiyat</label>
                  <input
                    type="number"
                    placeholder="Bir fiyat girin"
                    className="addproduct-inputs price-input"
                    required
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
      )}
      {!user && <Redirect to="/login" />}
    </>
  );
}

export default AddProduct;
