import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  return (
    <div>
      <h1>This is INDEX PAGE</h1>
      {user && <h1>Ürünlerin geleceği ana sayfa burası olacaktır</h1>}
      <form>
        <button type="submit" onClick={logoutUser}>
          Çıkış Yap
        </button>
      </form>
    </div>
  );
}

export default Home;
