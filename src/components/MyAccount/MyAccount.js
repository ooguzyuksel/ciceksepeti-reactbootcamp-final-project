import React, { useState } from "react";
import "./myaccount.scss";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "components/Navbar/Navbar";
import { useRouteMatch, Link, Redirect, useHistory } from "react-router-dom";
import ReceivedOffers from "components/ReceivedOffers/ReceivedOffers";
import GivenOffers from "components/GivenOffers/GivenOffers";
import { logoutInitiate } from "../../redux/actions/actions";

function MyAccount() {
  const user = useSelector((state) => state.auth.user);
  const userAccount = useSelector((state) => state.auth.userMail);
  const [offerComponentController, setOfferComponentController] = useState(false);
  let { url } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const offerHandlerGotten = () => {
    setOfferComponentController(false);
  };
  const offerHandlerGiven = () => {
    setOfferComponentController(true);
  };

  // Logout handler
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logoutInitiate());
    history.push("/");
    localStorage.removeItem("loggedUserKey");
  };
  return (
    <>
      {user && (
        <div className="myaccount-wrapper">
          <Navbar />
          <div className="mail-adress-container">
            <div className="mail-adress-area">
              <h3>
                <i className="far fa-user" /> {(" ", userAccount)}
              </h3>
              <button type="submit" className="logout-button" onClick={logoutUser}>
                <i className="fas fa-sign-out-alt" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>

          <div className="order-menu-wrapper">
            <div className="order-menu-container">
              <div className="order-menu-links">
                <Link
                  className="order-menu-link"
                  to={`${url}/gottenoffers`}
                  onClick={offerHandlerGotten}
                >
                  Teklif Aldıklarım
                </Link>
                <Link
                  className="order-menu-link"
                  to={`${url}/givenoffers`}
                  onClick={offerHandlerGiven}
                >
                  Teklif Verdiklerim
                </Link>
              </div>

              <div className="offer-component-container">
                {!offerComponentController && <ReceivedOffers />}
                {offerComponentController && <GivenOffers />}
              </div>
            </div>
          </div>
          {/* <OrderedItems /> */}
        </div>
      )}
      {!user && <Redirect to="/login" />}
    </>
  );
}

export default MyAccount;
