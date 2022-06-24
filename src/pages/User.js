import React, { useContext } from "react";
import AuthForm from "../components/signForms/AuthForm";
import AuthContext from "../store/auth-context";
import { Navigate } from "react-router-dom";

const User = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  
  return (
    <div>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <Navigate to='/profile' />}
    </div>
  );
};

export default User;
