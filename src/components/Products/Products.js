import React, { useEffect } from "react";
import "./products.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/actions/productsActions";

function Products({ categoryID }) {
  const products = useSelector((state) => state.products.products.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    console.log("products", { products });
  }, []);

  return (
    <div className="card-top-container">
      <div className="card-wrapper">
        {products &&
          products.map((productItem) => (
            <Link to={`/${productItem.id}`} key={productItem.id} className="card-container">
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
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Products;
