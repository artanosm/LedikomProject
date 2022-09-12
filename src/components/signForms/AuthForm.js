import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import AuthFormInput from "./AuthFormInput";
import classes from "./AuthForm.module.scss";

const AuthForm =()  => {
  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const enteredEmailRef = useRef("");
  const enteredPasswordRef = useRef("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;

    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzk-iiZ_Pp7Ic95GXULqdmdnGcKuRJiW8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzk-iiZ_Pp7Ic95GXULqdmdnGcKuRJiW8";
    }
    fetch(
      url,

      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          // console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());

        navigate("/profile", { replace: true });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h1 className={classes.h1}>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler} className={classes.formContainer}>
        <AuthFormInput ref={enteredEmailRef} placeholder='Your Email' type='email' id='email' />
        <AuthFormInput ref={enteredPasswordRef} placeholder='Your Password' type='password' id='password' />
          {/* <div className={classes.formControl}>
            <input
              ref={enteredEmailRef}
              placeholder="Your Email"
              type="email"
              id="email"
              required
            />
          </div> */}
          {/* <div className={classes.formControl}>
            <input
              ref={enteredPasswordRef}
              placeholder="Your Password"
              type="password"
              id="password"
              required
            />
          </div> */}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Loading...</p>}
            <button
              className={classes.toggle}
              type="button"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
