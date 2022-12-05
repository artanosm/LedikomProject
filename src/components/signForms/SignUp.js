import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Box from "@mui/system/Box";
import InputMui from "./InputMui";
import { Formik, Form } from "formik";
import { object, string, ref } from "yup";

const SignUp = () => {
  const [error, setError] = useState("");
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
    passwordConfirmation: "",
  };
  const validationSchema = object({
    email: string().email("Invalid email").required("Email required"),
    password: string()
      .min(6, "Must be at least 6 characters")
      .max(16, "Password too long maximum 16 characters")
      .required("Required"),
    passwordConfirmation: string()
      .required("Required")
      .oneOf([ref("password"), null], "Passwords must match"),
  });

  const onSignInHandler = () => {
    navigate("/login", { replace: true });
  };

  const submitHandler = async (values, actions) => {
    setError("");
    actions.setSubmitting(true);
    try {
      await authCtx.signUp(values.email, values.password);
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message);
    }
    actions.setSubmitting(false);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h1 className={classes.h1}>Sign Up</h1>
        <AnimatePresence>
          {error && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className={classes.alert}
            >
              {error}
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
              <Box sx={style}>
                <InputMui
                  icon={<KeyOutlinedIcon />}
                  name={"passwordConfirmation"}
                  label={"Password Confirmation"}
                  type={"password"}
                  id={"passwordConfirmation"}
                />
              </Box>
              <div className={classes.inlineContainer}>
              </div>
              
              <div className={classes.actions}>
              <button
                  type="submit"
                  style={{
                    backgroundColor: formik.isSubmitting && "lightgrey",
                  }}
                  className={classes.loginButton}
                >
                  {!formik.isSubmitting ? "Sign Up" : "Loading.."}
                </button>
                <button
                  className={classes.toggle}
                  type="button"
                  onClick={onSignInHandler}
                >
                  Log In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;

// import React, { useContext, useRef, useState } from "react";
// import AuthContext from "../../store/auth-context";
// import { useNavigate } from "react-router-dom";
// // import AuthFormInput from "./AuthFormInput";
// import classes from "./SignUp.module.scss";
// import { motion, AnimatePresence } from "framer-motion";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
// import Box from "@mui/system/Box";
// import InputMui from "./InputMui";

// const SignUp = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const authCtx = useContext(AuthContext);
//   const navigate = useNavigate();

//   const enteredEmailRef = useRef("");
//   const enteredPasswordRef = useRef("");
//   const enteredPasswordConfirmationRef = useRef("");

//   const onSignInHandler = () => {
//     navigate("/login", { replace: true });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setError("");
//     const enteredEmail = enteredEmailRef.current.value;
//     const enteredPassword = enteredPasswordRef.current.value;
//     const enteredPasswordConfirmation =
//       enteredPasswordConfirmationRef.current.value;
//     console.log(enteredEmail, enteredPassword, enteredPasswordConfirmation);
//     if (enteredPassword !== enteredPasswordConfirmation) {
//       console.log("Password dont match");
//       setError(`Password don't match`);
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await authCtx.signUp(enteredEmail, enteredPassword);
//       navigate("/profile", { replace: true });
//     } catch (err) {
//       setError(err.message);
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
//         <h1 className={classes.h1}>Sign Up</h1>
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               variants={variants}
//               initial="hidden"
//               animate="visible"
//               className={classes.alert}
//             >
//               {error}
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
//           <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
//             <InputMui
//               icon={<KeyOutlinedIcon />}
//               ref={enteredPasswordConfirmationRef}
//               label={"Confirm your Password"}
//               type={"password"}
//               id={"confirmPassword"}
//             />
//           </Box>

//           <div className={classes.actions}>
//             {!isLoading && <button>Sign Up</button>}
//             {isLoading && (
//               <button
//                 disabled
//                 style={{ backgroundColor: "lightgray", border: "none" }}
//               >
//                 Loading...
//               </button>
//             )}

//             <button
//               className={classes.toggle}
//               type="button"
//               onClick={onSignInHandler}
//             >
//               Log In
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
