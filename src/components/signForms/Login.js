import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.scss";
import GoogleLogo from "../../assets/brandsLogo/google.svg";
import { motion, AnimatePresence } from "framer-motion";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Box from "@mui/material/Box";
import InputMui from "./InputMui";
import { Formik, Form } from "formik";
import { object, string } from "yup";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const style = {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    marginBottom: "18px",
  };
  const initialFormState = {
    email: "",
    password: "",
  };

  const validationSchema = object({
    email: string().email("Invalid email").required("Email required"),
    password: string()
      .min(6, "Must be at least 6 characters")
      .max(16, "Password too long maximum 16 characters")
      .required("Required"),
  });

  const onResetPasswordHandler = async (formik) => {
    setError("");
    setSuccess("");
    formik.setSubmitting(true);
    console.log(formik);
    const enteredEmail = formik.values.email;
    if (!enteredEmail) {
      setError("Please enter an email");
      formik.setSubmitting(false);
      return;
    }
    try {
      await authCtx.resetPassword(enteredEmail);
      setSuccess("A link was sent to your email");
    } catch (err) {
      setError(err.message);
    }
    formik.setSubmitting(false);
    formik.resetForm(initialFormState);
  };

  const submitHandler = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      await authCtx.signIn(values.email, values.password);
      navigate("/profile", { replace: true });
    } catch (err) {
      setError("Your email or password was incorrect");
    }
  };

  const googleSignInHandler = async (e) => {
    e.preventDefault();
    try {
      await authCtx.googleSignIn();
      navigate("/profile", { replace: true });
    } catch (err) {
      setError("Popup window closed");
    }
  };

  useEffect(() => {
    if (authCtx.user?.email) {
      navigate("/profile");
    }
  }, [authCtx.user?.email, navigate]);

  const onSignUpHandler = () => {
    navigate("/signup", { replace: true });
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
        <Formik
          initialValues={initialFormState}
          validationSchema={validationSchema}
          onSubmit={submitHandler} 
        >
          {(formik) => (
            <Form>
              <Box sx={style}>
                <InputMui
                  icon={<AccountCircle />}
                  name={"email"}
                  label={"Email"}
                  type={"email"}
                  id={"email"}
                />
              </Box>
              <Box sx={style}>
                <InputMui
                  icon={<KeyOutlinedIcon />}
                  name={"password"}
                  label={"Password"}
                  type={"password"}
                  id={"password"}
                />
              </Box>

              <div className={classes.inlineContainer}>
                <button
                  className={classes.resetButton}
                  type="button"
                  onClick={() => {
                    onResetPasswordHandler(formik);
                  }}
                >
                  Reset Password
                </button>
              </div>
              <div className={classes.actions}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: formik.isSubmitting && "lightgrey",
                    borderColor: formik.isSubmitting && 'lightgrey'
                  }}
                  className={classes.loginButton}
                >
                  {!formik.isSubmitting ? "Login" : "Loading.."}
                </button>
                <button
                  onClick={googleSignInHandler}
                  className={classes.google}
                >
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import AuthContext from "../../store/auth-context";
// import { useNavigate } from "react-router-dom";
// // import AuthFormInput from "./AuthFormInput";
// import classes from "./Login.module.scss";
// import GoogleLogo from "../../assets/brandsLogo/google.svg";
// import { motion, AnimatePresence } from "framer-motion";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
// import Box from "@mui/material/Box";
// import InputMui from "./InputMui";

// const Login = () => {
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const authCtx = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (authCtx.user?.email) {
//       navigate("/profile");
//     }
//   }, [authCtx.user?.email, navigate]);

//   const enteredEmailRef = useRef("");
//   const enteredPasswordRef = useRef("");

//   const onSignUpHandler = () => {
//     navigate("/signup", { replace: true });
//   };

//   const onResetPasswordHandler = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setIsLoading(true);
//     const enteredEmail = enteredEmailRef.current.value;
//     if (!enteredEmail) {
//       setError("Please enter an email");
//       setIsLoading(false);
//       return;
//     }
//     try {
//       await authCtx.resetPassword(enteredEmail);
//       setSuccess("A link was sent to your email");
//     } catch (err) {
//       setError(err.message);
//     }
//     setIsLoading(false);
//     enteredEmailRef.current.value = "";
//   };

//   const googleSignInHandler = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await authCtx.googleSignIn();
//       navigate("/profile", { replace: true });
//     } catch (err) {
//       setError(err.message);
//     }
//     setIsLoading(false);
//   };
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     const enteredEmail = enteredEmailRef.current.value;
//     const enteredPassword = enteredPasswordRef.current.value;
//     console.log(enteredEmail, enteredPassword);
//     if (!enteredEmail) {
//       setError("Please enter your email!");
//       setIsLoading(false);
//       return;
//     }
//     if (!enteredPassword) {
//       setError("Please enter your password!");
//       setIsLoading(false);
//       return;
//     }
//     try {
//       await authCtx.signIn(enteredEmail, enteredPassword);
//       navigate("/profile", { replace: true });
//     } catch (err) {
//       console.log(err);
//       setError("Your email or password was incorrect");
//     }
//     setIsLoading(false);
//   };

//   const variants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//   };

//   return (
//     <div className={classes.mainContainer}>
//       <div className={classes.container}>
//         <h1 className={classes.h1}>Login</h1>
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               variants={variants}
//               animate="visible"
//               initial="hidden"
//               className={`${classes.alert} ${classes.redAlert}`}
//             >
//               {error}
//             </motion.div>
//           )}
//           {success && (
//             <motion.div
//               variants={variants}
//               animate="visible"
//               initial="hidden"
//               className={`${classes.alert} ${classes.greenAlert}`}
//             >
//               {success}
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <form onSubmit={submitHandler} className={classes.formContainer}>
//           <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
//             <InputMui
//               icon={<AccountCircle />}
//               ref={enteredEmailRef}
//               label={"Email"}
//               type={"email"}
//               id={"email"}
//             />
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
//             <InputMui
//               icon={<KeyOutlinedIcon />}
//               ref={enteredPasswordRef}
//               label={"Password"}
//               type={"password"}
//               id={"password"}
//             />
//           </Box>

//           <div className={classes.inlineContainer}>
//             <button
//               className={classes.resetButton}
//               type="button"
//               onClick={onResetPasswordHandler}
//             >
//               Reset Password
//             </button>
//           </div>
//           <div className={classes.actions}>
//             {!isLoading && (
//               <button className={classes.loginButton}>Login</button>
//             )}
//             {isLoading && (
//               <button
//                 disabled
//                 style={{ backgroundColor: "lightgray", border: "none" }}
//               >
//                 Loading...
//               </button>
//             )}
//             <button onClick={googleSignInHandler} className={classes.google}>
//               <img width={20} alt="Google" src={GoogleLogo} />
//               <span>Sign In with Google</span>
//             </button>
//             <button
//               className={classes.toggle}
//               type="button"
//               onClick={onSignUpHandler}
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
