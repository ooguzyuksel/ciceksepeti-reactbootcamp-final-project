import * as types from "../actionTypes/actionTypes";

const initialState = {
  price: 0,
  imageUrl: "",
  title: "",
  status: {
    title: "",
    id: "",
  },
  color: {
    title: "",
    id: "",
  },
  brand: {
    title: "",
    id: "",
  },
  category: {
    title: "",
    id: "",
  },
  description: "",
  isOfferable: false,
};

const addNewProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NEW_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        price: action.price,
        imageUrl: action.imageUrl,
        title: action.title,
        status: {
          title: action.statustitle,
          id: action.statusid,
        },
        color: {
          title: action.colortitle,
          id: action.colorid,
        },
        brand: {
          title: action.brandtitle,
          id: action.brandid,
        },
        category: {
          title: action.categorytitle,
          id: action.categoryid,
        },
        description: action.description,
        isOfferable: action.isOfferable,

        loading: false,
        error: null,
      };
    case types.ADD_NEW_PRODUCT_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default addNewProductReducer;
