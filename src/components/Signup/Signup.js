/* eslint-disable prettier/prettier */
import "./signup.scss";

import axios from "axios";

import React, { useEffect, useState } from "react";

function Signup() {
  const [newMail, setMail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [token, setToken] = useState({});
  const [error, setError] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const article = { email: newMail, password: newPassword };
    axios
      .post("/authorization/signup", article)
      .then((response) => setToken(response.data.access_token))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

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
