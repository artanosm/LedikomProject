import React, { useState, useEffect, useContext } from "react";
import { auth } from "../components/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

//   const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjustedExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjustedExpirationTime - currentTime;

//   return remainingDuration;
// };

// const retriveStoredToken = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedExpirationDate = localStorage.getItem("expirationTime");

//   const remainingTime = calculateRemainingTime(storedExpirationDate);
//   if (remainingTime <= 3600) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     return;
//   }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = {
    user,
    signUp,
    signIn,
    logOut,
    googleSignIn,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// import React, { useState, useEffect, useCallback } from "react";

// let logoutTimer;

// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjustedExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjustedExpirationTime - currentTime;

//   return remainingDuration;
// };

// const retriveStoredToken = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedExpirationDate = localStorage.getItem("expirationTime");

//   const remainingTime = calculateRemainingTime(storedExpirationDate);
//   if (remainingTime <= 3600) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     return;
//   }

//   return {
//     token: storedToken,
//     duration: remainingTime,
//   };
// };

// export const AuthContextProvider = (props) => {
//   const tokenData = retriveStoredToken();
//   let initialToken;
//   if (tokenData) {
//     initialToken = tokenData.token;
//   }
//   const [token, setToken] = useState(initialToken);

//   const userIsLoggedIn = !!token;

//   const logoutHandler = useCallback(() => {
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   },[]);

//   const loginHandler = (token, expirationTime) => {
//     setToken(token);
//     localStorage.setItem("token", token);
//     localStorage.setItem("expirationTime", expirationTime);
//     const remainingTime = calculateRemainingTime(expirationTime);

//     logoutTimer = setTimeout(logoutHandler, remainingTime);
//   };

//   useEffect(()=>{
//     if(tokenData){
//         logoutTimer = setTimeout(logoutHandler, tokenData.duration)
//     }
//     return;
//   },[tokenData,logoutHandler])

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
