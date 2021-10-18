/* eslint-disable no-alert */
/* eslint-disable prefer-const */
import "../Signup/signup.scss";
import "./login.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginInitiate } from "redux/actions/actions";
import { useHistory, Link } from "react-router-dom";
import registerGirl from "../../images/registerGirl.png";
import ikincielLogo from "../../images/ikincielLogo.svg";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  let dispatch = useDispatch();

  let { user, error } = useSelector((state) => state.auth);
  useEffect(() => {
    {
      user && history.push("/");
    }
    {
      user && localStorage.setItem("loggedUserKey", user);
    }
    console.log({ user });
    console.log({ error });
  }, [user]);

  // onSubmitHandler will submit taken data from input and Redirect to HOME Page
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (mail.length === 0 || password.length === 0) {
      alert("Mail veya Parola Boş Olamaz.");
    } else if (password.length >= 8 && password.length <= 20) {
      dispatch(loginInitiate(mail, password));
    } else {
      alert("Parola 8 Karakterden uzun , 20 Karakterden kısa olmalıdır.");
    }
  };

  // this is going to return entered value into input
  const onChangeHandler = (e) => {
    let input = e.target.value;
    {
      e.target.type === "email" ? setMail(input) : setPassword(input);
    }
  };

  return (
    <>
      {/* NEW VERSION -- Design of Login Page Inherited from Signup Page / That's why classnames include names as 'signup' */}
      <div className="signup-wrapper">
        <div className="signup">
          {/* Left Side Image */}
          <img src={registerGirl} alt="signup-girl" className="signup__image" />
          {/* Right Side - Input Form */}
          <div className="signup-form-wrapper">
            <Link to="/">
              <img src={ikincielLogo} alt="ikincielLogo" />{" "}
            </Link>

            <form className="signup__form">
              <div className="signup__form__topDiv">
                <h3>GİRİŞ YAP</h3>
                <small>Fırsatlardan yararlanmak için giriş yap!</small>
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
                Giriş
              </button>
              <div className="signup__form__login">
                <small>
                  Hesabın yok mu ?{" "}
                  <Link className="link" to="/signup">
                    Üye Ol
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
