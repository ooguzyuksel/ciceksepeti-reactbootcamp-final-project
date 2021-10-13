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

  // Catching Category ID in order to Filter Product by prop drilling
  const categoryIdHandler = (id) => {
    setCategoryID(id);
  };

  // Calling all categories once Categories Component Called
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <div className="category-container">
        {/* Listing All Categories */}
        <div className="category-wrapper">
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

      {/* Products Section with Cards */}
      <Products categoryID={categoryID} />
    </div>
  );
}

export default Categories;
