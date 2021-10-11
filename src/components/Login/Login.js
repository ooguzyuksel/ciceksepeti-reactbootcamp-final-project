/* eslint-disable prefer-const */
import "./login.scss";

import React, { useState } from "react";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ mail });
    console.log({ password });
  };

  const onChangeHandler = (e) => {
    let input = e.target.value;
    {
      e.target.type === "email" ? setMail(input) : setPassword(input);
    }
  };

  return (
    <>
      <h1>GİRİŞ YAP SAYFASI</h1>
      <div className="login-container">
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

export default Login;
