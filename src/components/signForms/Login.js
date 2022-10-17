import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import AuthFormInput from "./AuthFormInput";
import classes from "./Login.module.scss";
import GoogleLogo from "../../assets/brandsLogo/google.svg";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx.user) {
      navigate("/profile", { replace: true });
    }
  }, []);

  const enteredEmailRef = useRef("");
  const enteredPasswordRef = useRef("");

  const onSignUpHandler = () => {
    navigate("/signup", { replace: true });
  };

  const onResetPasswordHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    const enteredEmail = enteredEmailRef.current.value;
    if (!enteredEmail) {
      setError("Please enter an email");
      setIsLoading(false);
      return;
    }
    try {
      await authCtx.resetPassword(enteredEmail);
      setSuccess("A link was sent to your email");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    enteredEmailRef.current.value = "";
  };

  const googleSignInHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authCtx.googleSignIn();
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;
    try {
      await authCtx.signIn(enteredEmail, enteredPassword);
      navigate("/profile", { replace: true });
    } catch (err) {
      setError("Your email or password was incorrect");
    }
    setIsLoading(false);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h1 className={classes.h1}>Login</h1>
        <AnimatePresence>
          {error && (
            <motion.div
              variants={variants}
              animate="visible"
              initial="hidden"
              className={`${classes.alert} ${classes.redAlert}`}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              variants={variants}
              animate="visible"
              initial="hidden"
              className={`${classes.alert} ${classes.greenAlert}`}
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={submitHandler} className={classes.formContainer}>
          <AuthFormInput
            ref={enteredEmailRef}
            placeholder="Email"
            type="email"
            id="email"
          />
          <AuthFormInput
            ref={enteredPasswordRef}
            placeholder="Password"
            type="password"
            id="password"
          />
          <div className={classes.inlineContainer}>
            <button
              className={classes.resetButton}
              type="button"
              onClick={onResetPasswordHandler}
            >
              Reset Password
            </button>
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>Login</button>}
            {isLoading && (
              <button
                disabled
                style={{ backgroundColor: "lightgray", border: "none" }}
              >
                Loading...
              </button>
            )}
            <button onClick={googleSignInHandler} className={classes.google}>
              <img width={20} alt="Google" src={GoogleLogo} />
              <span>Sign In with Google</span>
            </button>
            <button
              className={classes.toggle}
              type="button"
              onClick={onSignUpHandler}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
