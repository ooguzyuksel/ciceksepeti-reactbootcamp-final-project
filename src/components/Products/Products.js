import React, { useEffect, useState } from "react";
import "./products.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProducts } from "../../redux/actions/productsActions";

function Products({ categoryID, allProducts }) {
  let { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.products.data);
  // const [clickedProductID, setClickedProductID] = useState(null);
  const dispatch = useDispatch();

  let history = useHistory();

  // FETCHING ALL PRODUCTS FROM REDUX
  useEffect(() => {
    dispatch(getProducts());
    console.log("products", { products });
  }, []);

  // STORING CLICKED PRODUCT
  const clickedProductHandler = (itemProductId) => {
    // setClickedProductID(itemProductId);
    {
      user && history.push(`/product/${itemProductId}`);
    }
    {
      !user && history.push("/signup");
    }
  };
  return (
    <>
      <div className="card-top-container">
        {/* FILTERED PRODUCTS */}
        <div className="card-wrapper">
          {products &&
            categoryID &&
            products
              .filter((filteredProduct) => filteredProduct.category.id === categoryID)
              .map((filteredItem) => (
                <button
                  type="submit"
                  // to="/product"
                  key={filteredItem.id}
                  className="card-container"
                  onClick={() => clickedProductHandler(filteredItem.id)}
                >
                  <img
                    src={filteredItem.imageUrl}
                    alt={filteredItem.brand.title}
                    className="card-image"
                  />
                  <div className="card-product-informartion">
                    <span>
                      <b>{`${filteredItem.brand.title
                        .charAt(0)
                        .toUpperCase()}${filteredItem.brand.title.slice(1)}`}</b>
                    </span>
                    <span>
                      <b>Renk: </b>
                      {`${filteredItem.color.title
                        .charAt(0)
                        .toUpperCase()}${filteredItem.color.title.slice(1)}`}
                    </span>
                  </div>

                  <div className="card-product-price">{filteredItem.price} TL</div>
                </button>
              ))}
        </div>

        {/* ALL PRODUCTS */}
        <div className="card-wrapper">
          {products &&
            !categoryID &&
            allProducts &&
            products.map((productItem) => (
              <button
                type="submit"
                // to="/product"
                key={productItem.id}
                className="card-container"
                onClick={() => clickedProductHandler(productItem.id)}
              >
                <img
                  src={productItem.imageUrl}
                  alt={productItem.brand.title}
                  className="card-image"
                />
                <div className="card-product-informartion">
                  <span>
                    <b>{`${productItem.brand.title
                      .charAt(0)
                      .toUpperCase()}${productItem.brand.title.slice(1)}`}</b>
                  </span>
                  <span>
                    <b>Renk: </b>
                    {`${productItem.color.title
                      .charAt(0)
                      .toUpperCase()}${productItem.color.title.slice(1)}`}
                  </span>
                </div>

                <div className="card-product-price">{productItem.price} TL</div>
              </button>
            ))}
        </div>
      </div>
    </>
  );
}

export default Products;