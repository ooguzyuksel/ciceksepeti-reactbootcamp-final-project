import "./index.scss";
import axios from "axios";
import ReactDOM from "react-dom";
import React from "react";

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

axios.interceptors.request.use((request) => {
  let token = localStorage.getItem("loggedUserKey");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

axios.interceptors.response.use((response) => {
  return response;
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
