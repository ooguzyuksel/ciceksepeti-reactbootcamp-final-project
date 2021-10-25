import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "components/Navbar/Navbar";
import Categories from "components/Categories/Categories";
import homepageBanner from "../../images/homepageBanner.png";
import "./home.scss";
import { logoutInitiate } from "../../redux/actions/actions";

function Home() {
  let { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  // Logout handler
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logoutInitiate());
    history.push("/");
    localStorage.removeItem("loggedUserKey");
  };

  // eslint-disable-next-line prettier/prettier
  return (
    <div className="home-wrapper">
      <div className="home-container">{user && <Navbar logoutUser={logoutUser} />}</div>
      <div className="home-container">{!user && <Navbar />}</div>
      <div className="banner-container">
        <img src={homepageBanner} alt="HomepageBanner" className="banner-image" />
      </div>
      {/* Categories */}
      <Categories />
    </div>
  );
}

export default Home;
