/* eslint-disable prettier/prettier */
import "./signup.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "redux/actions";
import { useHistory } from "react-router-dom";

function Signup() {
  const [newMail, setMail] = useState("");
  const [newPassword, setPassword] = useState("");
  // const [token, setToken] = useState({});
  // const [error, setError] = useState("");

  const history = useHistory();
  let dispatch = useDispatch();

  let { user, error } = useSelector((state) => state.auth);
  useEffect(() => {
    {
      user && history.push("/");
    }
    console.log({ user });
    console.log({ error });
  }, [user]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerInitiate(newMail, newPassword));
    // const article = { email: newMail, password: newPassword };
    // axios
    //   .post("/authorization/signup", article)
    //   .then((response) => setToken(response))
    //   .catch((err) => setError(err));
  };

  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  const onChangeHandler = (event) => {
    let input = event.target.value;
    {
      event.target.type === "email" ? setMail(input) : setPassword(input);
    }
  };

  return (
    <>
      <h1>KAYIT OL SAYFASI</h1>
      <div className="signup-container">
        {/* Left Side Image */}
        <div>
          <img
            src="https://i.picsum.photos/id/871/200/300.jpg?hmac=wXN1u0NeBnK8vCkjkJXzoTfZn6F0JBzgOpCdmRGXsw0"
            alt="dummy"
          />
        </div>
        {/* Right Side - Input Form */}
        <form>
          <div>
            <div>
              <label htmlFor="email">EMail</label>
            </div>
            <input type="email" name="email" id="email" onChange={onChangeHandler} />
          </div>
          <div>
            <div>
              <label htmlFor="password">Şifre</label>
            </div>
            <input type="text" name="password" id="password" onChange={onChangeHandler} />
          </div>
          <button type="submit" onClick={onSubmitHandler}>
            Üye Ol
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
