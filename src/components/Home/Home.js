import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "components/Navbar/Navbar";
import "./home.scss";
import { logoutInitiate } from "../../redux/actions";

function Home() {
  let { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  // Logout handler
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logoutInitiate());
    history.push("/login");
  };

  // eslint-disable-next-line prettier/prettier
  return (
    <div className="home-wrapper">
      <div className="home-container">{user && <Navbar logoutUser={logoutUser} />}</div>
    </div>
  );
}

export default Home;
