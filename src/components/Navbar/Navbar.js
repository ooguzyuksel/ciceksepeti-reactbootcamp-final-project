/* eslint-disable react/prop-types */
import React from "react";
import "./navbar.scss";
import ikincielLogo from "../../images/ikincielLogo.svg";

function Navbar({ logoutUser }) {
  return (
    <div className="fluid-container">
      <div className="navbar-container">
        <div>
          <img src={ikincielLogo} alt="İkinciEllogo" />
        </div>
        <div>
          <button type="submit">Ürün Ekle</button>
          <button type="submit">Giriş Yap</button>
          <button type="submit" onClick={logoutUser}>
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
