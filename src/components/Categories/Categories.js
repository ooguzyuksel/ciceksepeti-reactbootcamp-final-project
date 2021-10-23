import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./categories.scss";
import Products from "components/Products/Products";
import { getCategories } from "../../redux/actions/getCategoryAction";

function Categories() {
  // Handling categories State into Redux
  const categories = useSelector((state) => state.category.categories.data);
  const dispatch = useDispatch();
  const [categoryID, setCategoryID] = useState(null);
  const [allProducts, setAllProducts] = useState(true);
  const storedCategoryID = localStorage.getItem("categoryID");

  // Catching Category ID in order to Filter Product by prop drilling
  const categoryIdHandler = (id) => {
    setCategoryID(id);
    setAllProducts(false);
    localStorage.setItem("categoryID", id);
  };

  const allProductsHandler = () => {
    setCategoryID(null);
    setAllProducts(true);
  };

  // Calling all categories once Categories Component Called
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  // Calling queried categories with componentDidUpdate via useEffect
  useEffect(() => {
    dispatch(getCategories(setCategoryID(storedCategoryID)));
  }, [storedCategoryID]);

  return (
    <div>
      <div className="category-container">
        {/* Listing All Categories */}
        <div className="category-wrapper">
          <button className="category-link" type="submit" onClick={allProductsHandler}>
            Hepsi
          </button>
          {categories &&
            categories.map((categoryItem) => (
              <div key={categoryItem.id} className="category-item">
                <button
                  className="category-link"
                  type="submit"
                  onClick={() => categoryIdHandler(categoryItem.id)}
                >
                  {`${categoryItem.title.charAt(0).toUpperCase()}${categoryItem.title.slice(1)}`}
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Products Section with Cards -> prop drilling CategoryID in order to sort selected products that are related with category */}
      <Products categoryID={categoryID} allProducts={allProducts} />
    </div>
  );
}

export default Categories;
