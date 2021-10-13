import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./reducer";
import getCategoryReducer from "./getCategoryReducer";
import getProductsReducer from "./productsReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  category: getCategoryReducer,
  products: getProductsReducer,
});

export default persistReducer(persistConfig, rootReducer);
