import React, { useState } from "react";
import "./myaccount.scss";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar/Navbar";
import { useRouteMatch, Link, Redirect } from "react-router-dom";
import ReceivedOffers from "components/ReceivedOffers/ReceivedOffers";
import GivenOffers from "components/GivenOffers/GivenOffers";
import Login from "components/Login/Login";

function MyAccount() {
  const user = useSelector((state) => state.auth.user);
  const userAccount = useSelector((state) => state.auth.userMail);
  const [offerComponentController, setOfferComponentController] = useState(false);
  let { url } = useRouteMatch();
  const offerHandlerGotten = () => {
    setOfferComponentController(false);
  };
  const offerHandlerGiven = () => {
    setOfferComponentController(true);
  };
  return (
    <>
      {user && (
        <div className="myaccount-wrapper">
          <Navbar />
          <div className="mail-adress-container">
            <div className="mail-adress-area">
              <i className="far fa-user" />
              <h3>{userAccount}</h3>
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
