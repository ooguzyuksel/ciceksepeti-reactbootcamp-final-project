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
  return (
    <div className="fluid-container">
      <div className="navbar-container">
        <div>
          <Link to="/">
            <img src={ikincielLogo} alt="İkinciEllogo" />
          </Link>
        </div>
        <div>
          <button type="submit">Ürün Ekle</button>
          {!user && (
            <button type="submit" onClick={loginHandler}>
              Giriş Yap
            </button>
          )}
          {user && (
            <>
              {" "}
              <button type="submit">Hesabım</button>
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
