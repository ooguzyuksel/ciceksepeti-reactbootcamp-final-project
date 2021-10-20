/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
import Navbar from "components/Navbar/Navbar";
import React, { useEffect, useState, useRef } from "react";
import "./addproduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import uploadicon from "../../images/uploadicon.svg";
import { getCategories } from "../../redux/actions/getCategoryAction";
import { getItemStatusses } from "../../redux/actions/productStatusAction";
import { getBrands } from "../../redux/actions/getBrandsAction";
import { getColors } from "../../redux/actions/getColorsAction";
import axios from "../../../node_modules/axios/index";

function AddProduct() {
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.category.categories.data);
  const statusses = useSelector((state) => state.itemStatusses.statusses.data);
  const brands = useSelector((state) => state.brands.brands.data);
  const colors = useSelector((state) => state.colors.colors.data);
  const dispatch = useDispatch();

  // Notification Pop-up Library
  const errorNotification = (text) => toast.error(text, { autoClose: 3000 });

  // User Token from Localstorage
  const token = localStorage.getItem("loggedUserKey");

  // Image uploading state
  const [image, setImage] = useState("");

  // Spagetti code but the best way i know for now :(
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [statusTitle, setstatusTitle] = useState("");
  const [statusId, setStatusId] = useState("");
  const [colorTitle, setColorTitle] = useState("");
  const [colorId, setColorId] = useState("");
  const [brandTitle, setBrandTitle] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [isOfferable, setIsOfferable] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getItemStatusses());
    dispatch(getBrands());
    dispatch(getColors());
  }, []);

  // Uploading img process
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    await axios
      .post("https://bootcampapi.techcs.io/api/fe/v1/file/upload/image", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setImage(res.data.url));
  };

  // Handlers
  // Category Handler
  const categoryInfoHandler = (e) => {
    let categoryValue = e.target.value;
    setCategoryTitle(categoryValue);
    {
      categories
        .filter((ctgid) => ctgid.title.includes(categoryValue))
        .map((id) => setCategoryId(id.id));
    }
  };
  // Brand Handler
  const brandInfoHandler = (e) => {
    let brandValue = e.target.value;
    setBrandTitle(brandValue);
    {
      brands.filter((brandid) => brandid.title.includes(brandValue)).map((id) => setBrandId(id.id));
    }
  };
  // Color Handler
  const colorInfoHandler = (e) => {
    let colorValue = e.target.value;
    setColorTitle(colorValue);
    {
      colors.filter((colorid) => colorid.title.includes(colorValue)).map((id) => setColorId(id.id));
    }
  };

  // Status Info Handler

  const statusInfoHandler = (e) => {
    let statusValue = e.target.value;
    setstatusTitle(statusValue);
    {
      statusses
        .filter((statusid) => statusid.title.includes(statusValue))
        .map((id) => setStatusId(id.id));
    }
  };
  // Save data to Database
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(price);
    console.log(title);
    console.log(statusTitle);
    console.log(colorTitle);
    console.log(brandTitle);
    console.log(categoryTitle);
    console.log(description);
    console.log(isOfferable);
    console.log("Category ID: ", categoryId);
    console.log("Brand ID:", brandId);
    console.log("Color ID:", colorId);
    console.log("Status ID:", statusId);
    console.log("Image URL", image);
    {
      !price &&
        !title &&
        !statusTitle &&
        !colorTitle &&
        !brandTitle &&
        !categoryTitle &&
        !description &&
        errorNotification("Hiçbir alan boş bırakılamaz.");
    }
  };

  return (
    <>
      {user && (
        <div className="addproduct-wrapper">
          <Navbar />

          <form className="addproduct-container">
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                {/* Category & Brand - Dropdown */}
                <div className="sub-container-multiple">
                  {/* Category */}
                  <div className="sub-container-secondary">
                    <label className="addproduct-labels">Kategori</label>
                    <select
                      className="addproduct-selects"
                      // value={categoryTitle}
                      onChange={categoryInfoHandler}
                      required
                    >
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
                    <select
                      name=""
                      id=""
                      className="addproduct-selects"
                      // value={brandTitle}
                      onChange={brandInfoHandler}
                      required
                    >
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
                    <select
                      name=""
                      id=""
                      className="addproduct-selects"
                      // value={colorTitle}
                      onChange={colorInfoHandler}
                      required
                    >
                      <option disabled selected>
                        Renk Seç
                      </option>
                      {colors?.map((color) => (
                        <option value={color.title} key={color.id}>
                          {color.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Usage */}
                  <div className="sub-container-secondary">
                    <label className="addproduct-labels">Kullanım Durumu</label>
                    <select
                      name=""
                      id=""
                      className="addproduct-selects"
                      // value={statusTitle}
                      onChange={statusInfoHandler}
                      required
                    >
                      <option disabled selected>
                        Kullanım durumu seç
                      </option>
                      {statusses?.map((itemStatus) => (
                        <option value={itemStatus.title} key={itemStatus.id}>
                          {itemStatus.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Price & Offerable */}
                <div className="price-offer-container">
                  {/* Price */}
                  <div className="sub-container">
                    <label className="addproduct-labels">Fiyat</label>
                    <input
                      type="number"
                      placeholder="Bir fiyat girin"
                      className="addproduct-inputs price-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  {/* Offerable Toggle */}
                  <div className="sub-container toggle-option">
                    <label>Teklif opsiyonu</label>
                    <label className="inputWrapper">
                      <input
                        type="checkbox"
                        className="addproduct-checkbox"
                        value={isOfferable}
                        onChange={(e) => setIsOfferable(e.target.checked)}
                      />
                      <span className="checkbox-span" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="right-area">
                <div className="right-area-wrapper">
                  <div>
                    <h3>Ürün Görseli</h3>
                    <div className="right-area-container">
                      <img src={uploadicon} alt="uploadicon" />
                      <p>Sürükleyip bırakarak yükle veya</p>
                      {/* Image Uploading Section */}
                      <div>
                        <button className="upload-button">
                          <input
                            type="file"
                            name="file"
                            placeholder="Bir resim seçiniz"
                            onChange={uploadImage}
                          />
                        </button>
                        <button type="button">Resmi Yükle</button>
                      </div>
                      <small>PNG ve JPEG Dosya boyutu: max. 100kb</small>
                    </div>
                  </div>
                  <div className="save-button-container">
                    <button className="save-button" type="submit" onClick={onSubmitHandler}>
                      Kaydet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
      {!user && <Redirect to="/login" />}
    </>
  );
}

export default AddProduct;
