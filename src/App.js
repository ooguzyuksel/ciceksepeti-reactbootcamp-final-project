import GivenOffers from "components/GivenOffers/GivenOffers";
import GottenOffers from "components/ReceivedOffers/ReceivedOffers";
import Home from "components/Home/Home";
import Login from "components/Login/Login";
import MyAccount from "components/MyAccount/MyAccount";
import ProductDetails from "components/ProductDetails/ProductDetails";
import Signup from "components/Signup/Signup";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AddProduct from "components/AddProduct/AddProduct";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/product/:productDetailId" component={ProductDetails} />
        <Route path="/myaccount" component={MyAccount} />
        <Route exact path="/myaccount/gottenoffers" component={GottenOffers} />
        <Route exact path="/myaccount/givenoffers" component={GivenOffers} />
        <Route path="/addproduct" component={AddProduct} />
      </Switch>
    </Router>
  );
}

export default App;
