/* eslint-disable react/prop-types */
import React from "react";
import "./navbar.scss";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ikincielLogo from "../../images/ikincielLogo.svg";

function Navbar({ logoutUser }) {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);

  const loginHandler = () => {
    history.push("/login");
  };

  const userToLocalStorage = () => {
    localStorage.setItem("loggedUserKey", user);
  };
  return (
    <div className="fluid-container">
      <div className="navbar-container">
        <div>
          <Link to="/">
            <img src={ikincielLogo} alt="İkinciEllogo" />
          </Link>
        </div>
        <div className="navbar-button-wrapper">
          {user && (
            <Link to="/addproduct" className="login-button plus-icon-button" type="submit">
              <span className="user-icon">
                <i className="far fa-plus" />
              </span>{" "}
              <span className="add-product-span">Ürün Ekle</span>
            </Link>
          )}
          {!user && (
            <button className="login-button" type="submit" onClick={loginHandler}>
              <span className="user-icon">
                <i className="far fa-user" />
              </span>{" "}
              Giriş Yap
            </button>
          )}
          {user && (
            <>
              {" "}
              <Link
                to="/myaccount"
                className="login-button"
                type="submit"
                onClick={userToLocalStorage}
              >
                <span className="user-icon">
                  <i className="far fa-user" />
                </span>{" "}
                Hesabım
              </Link>
              <button type="submit" onClick={logoutUser}>
                Çıkış Yap
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
