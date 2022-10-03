import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import AuthFormInput from "./AuthFormInput";
import classes from "./SignUp.module.scss";


const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const enteredEmailRef = useRef("");
  const enteredPasswordRef = useRef("");
  const enteredPasswordConfirmationRef = useRef("");

  const onSignInHandler = () => {
    navigate('/login',{replace:true})
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('')
    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;
    const enteredPasswordConfirmation =enteredPasswordConfirmationRef.current.value;

    if (enteredPassword !== enteredPasswordConfirmation) {
        console.log('Password dont match');
        setError(`Password don't match`)
        return
    }
    setIsLoading(true);
      try {
        await authCtx.signUp(enteredEmail, enteredPassword);
        navigate("/profile", { replace: true });
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h1 className={classes.h1}>Sign Up</h1>
        {error &&<div className={classes.alert}>{error}</div>}

        <form onSubmit={submitHandler} className={classes.formContainer}>
          <AuthFormInput
            ref={enteredEmailRef}
            placeholder="Your Email"
            type="email"
            id="email"
          />
          <AuthFormInput
            ref={enteredPasswordRef}
            placeholder="Your Password"
            type="password"
            id="password"
          />
            <AuthFormInput
            ref={enteredPasswordConfirmationRef}
            placeholder="Confirm your Password"
            type="password"
            id="confirmPassword"
          />

          <div className={classes.actions}>
            {!isLoading && (
              <button>Sign Up</button>
            )}
            {isLoading && <p>Loading...</p>}
    
            <button
              className={classes.toggle}
              type="button"
              onClick={onSignInHandler}
            >
            <span className={classes.span}>Have an account? </span>Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;