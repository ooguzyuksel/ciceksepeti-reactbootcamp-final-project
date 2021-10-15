/* eslint-disable prettier/prettier */
import "./signup.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "redux/actions/actions";
import { useHistory, Link } from "react-router-dom";
import registerGirl from "../../images/registerGirl.png";
import ikincielLogo from "../../images/ikincielLogo.svg";

function Signup() {
  const [newMail, setMail] = useState("");
  const [newPassword, setPassword] = useState("");

  const history = useHistory();
  let dispatch = useDispatch();

  let { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    {
      user && history.push("/");
    }
  }, [user]);

  // dispatch mail and password to register
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerInitiate(newMail, newPassword));
  };

  const onChangeHandler = (event) => {
    let input = event.target.value;
    {
      event.target.type === "email" ? setMail(input) : setPassword(input);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup">
        {/* Left Side Image */}
        <img src={registerGirl} alt="signup-girl" className="signup__image" />
        {/* Right Side - Input Form */}
        <div className="signup-form-wrapper">
          <img src={ikincielLogo} alt="ikincielLogo" />

          <form className="signup__form">
            <div className="signup__form__topDiv">
              <h3>ÜYE OL</h3>
              <small>Fırsatlardan yararlanmak için üye ol!</small>
            </div>
            <div>
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                onChange={onChangeHandler}
                placeholder="email@example.com"
              />
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
            <div className="signup__form__login">
              <small>
                Hesabın var mı ?{" "}
                <Link className="link" to="/login">
                  Giriş yap
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
