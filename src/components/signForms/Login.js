import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import AuthFormInput from "./AuthFormInput";
import classes from "./Login.module.scss";
import GoogleLogo from "../../assets/brandsLogo/google.svg";

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
    setError('')
    setSuccess('')
    setIsLoading(true);
    const enteredEmail = enteredEmailRef.current.value;
    if (!enteredEmail) {
      setError("Please enter an email");
      setIsLoading(false);
      return;
    }
    try {
      await authCtx.resetPassword(enteredEmail);
      setSuccess('A link was sent to your email')
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
      setError('Your email or password was wrong');
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h1 className={classes.h1}>Login</h1>
        {error && <div className={`${classes.alert} ${classes.redAlert}`}>{error}</div>}
        {success && <div className={`${classes.alert} ${classes.greenAlert}`}>{success}</div>}
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
          <div className={classes.inlineContainer}>
            <span className={classes.span}>Forgot Password?</span>
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
            {isLoading && <p>Loading...</p>}
            <button onClick={googleSignInHandler} className={classes.google}>
              <img width={20} alt="Google" src={GoogleLogo} />
              <span>Sign In with Google</span>
            </button>

            <button
              className={classes.toggle}
              type="button"
              onClick={onSignUpHandler}
            >
              <span className={classes.span}>Don't have an account? </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import React, { useContext, useRef, useState } from "react";
// import AuthContext from "../../store/auth-context";
// import { useNavigate } from "react-router-dom";
// import AuthFormInput from "./AuthFormInput";
// import classes from "./AuthForm.module.scss";

// const AuthForm =()  => {
//   const [isLogin, setIsLogin] = useState(true);

//   const [isLoading, setIsLoading] = useState(false);
//   const authCtx = useContext(AuthContext);
//   const navigate = useNavigate();

//   const enteredEmailRef = useRef("");
//   const enteredPasswordRef = useRef("");

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };
//   const submitHandler = (e) => {
//     e.preventDefault();
//     const enteredEmail = enteredEmailRef.current.value;
//     const enteredPassword = enteredPasswordRef.current.value;
//     setIsLoading(true);

//     let url;
//     if (isLogin) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzk-iiZ_Pp7Ic95GXULqdmdnGcKuRJiW8";
//     } else {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzk-iiZ_Pp7Ic95GXULqdmdnGcKuRJiW8";
//     }
//     fetch(
//       url,

//       {
//         method: "POST",
//         body: JSON.stringify({
//           email: enteredEmail,
//           password: enteredPassword,
//           returnSecureToken: true,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((res) => {
//         setIsLoading(false);
//         if (res.ok) {
//           // console.log(res);
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             let errorMessage = "Authentication Failed";
//             if (data && data.error && data.error.message) {
//               errorMessage = data.error.message;
//             }
//             alert(errorMessage);
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then((data) => {
//         const expirationTime = new Date(
//           new Date().getTime() + +data.expiresIn * 1000
//         );
//         authCtx.login(data.idToken, expirationTime.toISOString());

//         navigate("/profile", { replace: true });
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   };

//   return (
//     <div className={classes.mainContainer}>
//       <div className={classes.container}>
//         <h1 className={classes.h1}>{isLogin ? "Login" : "Sign Up"}</h1>
//         <form onSubmit={submitHandler} className={classes.formContainer}>
//         <AuthFormInput ref={enteredEmailRef} placeholder='Your Email' type='email' id='email' />
//         <AuthFormInput ref={enteredPasswordRef} placeholder='Your Password' type='password' id='password' />

//           <div className={classes.actions}>
//             {!isLoading && (
//               <button>{isLogin ? "Login" : "Create Account"}</button>
//             )}
//             {isLoading && <p>Loading...</p>}
//             <button
//               className={classes.toggle}
//               type="button"
//               onClick={switchAuthModeHandler}
//             >
//               {isLogin ? "Create new account" : "Login with existing account"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
