import Login from "components/Login/Login";
import Signup from "components/Signup/Signup";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/signup">Kayıt Ol</Link>
      <br />
      <Link to="/login">Giriş Yap</Link>

      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
