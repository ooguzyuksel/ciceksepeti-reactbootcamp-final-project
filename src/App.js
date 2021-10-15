import Home from "components/Home/Home";
import Login from "components/Login/Login";
import ProductDetails from "components/ProductDetails/ProductDetails";
import Signup from "components/Signup/Signup";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/product/:productDetailId" component={ProductDetails} />
      </Switch>
    </Router>
  );
}

export default App;
