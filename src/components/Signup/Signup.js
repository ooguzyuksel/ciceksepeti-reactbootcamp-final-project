/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import "./signup.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "redux/actions/actions";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import registerGirl from "../../images/registerGirl.png";
import ikincielLogo from "../../images/ikincielLogo.svg";

function Signup() {
  const [newMail, setMail] = useState("");
  const [newPassword, setPassword] = useState("");
  const notifyError = (text) => toast.error(text, { autoClose: 2000 });

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
  }, [user]);

  // User tried to sign up with already taken mail Validation Feedback
  useEffect(() => {
    if (error?.response?.status == 409) {
      notifyError("Bu kullanıcı adı daha önceden alınmış.");
    }
  }, [error]);

  // dispatch mail and password to register
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // if (newMail.length === 0 || newPassword.length === 0) {
    //   notifyError("Mail veya Parola Boş Olamaz.");
    // } else if (newPassword.length >= 8 && newPassword.length <= 20) {
    //   dispatch(registerInitiate(newMail, newPassword));
    // } else {
    //   notifyError("Parola 8 Karakterden uzun , 20 Karakterden kısa olmalıdır.");
    // }

    if (newMail.length === 0 || newPassword.length === 0) {
      notifyError("Mail veya Parola Boş Olamaz.");
    } else if (!newMail.includes("@") || !newMail.includes(".")) {
      notifyError("Geçerli bir mail adresi giriniz.");
    } else if (newPassword.length < 8 || newPassword.length > 20) {
      notifyError("Parola 8 Karakterden uzun , 20 Karakterden kısa olmalıdır.");
    } else if (
      newPassword.length >= 8 &&
      newPassword.length <= 20 &&
      newMail.includes("@") &&
      newMail.includes(".")
    ) {
      dispatch(registerInitiate(newMail, newPassword));
    }

    // If response returns an user not found error below part will be triggered
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
                required
                id="email"
                onChange={onChangeHandler}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <div>
                <label htmlFor="password">Şifre</label>
              </div>
              <input
                type="text"
                required
                name="password"
                id="password"
                onChange={onChangeHandler}
              />
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
      <ToastContainer />
    </div>
  );
}

export default Signup;
