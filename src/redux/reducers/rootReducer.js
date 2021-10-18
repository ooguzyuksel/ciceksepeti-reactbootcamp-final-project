import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./reducer";
import getCategoryReducer from "./getCategoryReducer";
import getProductsReducer from "./productsReducers";
import giveProductOfferReducer from "./giveProductOfferReducer";
import getGivenOffersReducer from "./givenOfferReducer";
import getReceivedOffersReducer from "./receivedOfferReducer";
import getPurchasedItemsReducer from "./purchaseReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  category: getCategoryReducer,
  products: getProductsReducer,
  offers: giveProductOfferReducer,
  givenOffers: getGivenOffersReducer,
  receivedOffers: getReceivedOffersReducer,
  purchaseItem: getPurchasedItemsReducer,
});

export default persistReducer(persistConfig, rootReducer);
