import React, { useState, useEffect, useCallback } from "react";
import { auth, db } from "../components/firebase";
import { setDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

let logoutTimer;
const AuthContext = React.createContext();

// ==============================

const retriveStoredToken = () => {
  const storedToken = sessionStorage.getItem("token");
  const storedExpirationDate = sessionStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingtime(storedExpirationDate);
  if (remainingTime < 0) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expirationTime");
    return null;
  }
  return { token: storedToken, duration: remainingTime };
};

const calculateRemainingtime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpiration = new Date(expirationTime).getTime();
  const remainingDuration = adjExpiration - currentTime;
  return remainingDuration;
};

// ==============================
export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});
  const tokenData = retriveStoredToken();
  let initialtoken;
  if (tokenData) {
    initialtoken = tokenData.token;
  } else {
    initialtoken = null;
  }

  const [token, setToken] = useState(initialtoken);
  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log(cred);
      setDoc(doc(db, "users", cred.user.uid), {
        userId: cred.user.uid,
        createdAt: serverTimestamp(),
      });
      const expirationTime = new Date(
        new Date().getTime() + +cred._tokenResponse.expiresIn * 800
      );
      sessionStorage.setItem("token", cred._tokenResponse.idToken);
      sessionStorage.setItem("expirationTime", expirationTime);
      const remainingTime = calculateRemainingtime(expirationTime);
      logoutTimer = setTimeout(logOut, remainingTime);
    });
  }

  async function getUserData(uid) {
    await onSnapshot(doc(db, "users", uid), (doc) => {
      setUserData(doc.data());
    });
  }

  async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password).then((cred) => {
      getUserData(cred.user.uid);
      const expirationTime = new Date(
        new Date().getTime() + +cred._tokenResponse.expiresIn * 800
      );
      sessionStorage.setItem("token", cred._tokenResponse.idToken);
      sessionStorage.setItem("expirationTime", expirationTime);
      const remainingTime = calculateRemainingtime(expirationTime);
      logoutTimer = setTimeout(logOut, remainingTime);
    });
  }

  const logOut = useCallback(async () => {
    await signOut(auth).then(() => {
      setToken(null);
      setUser(null);
      setUserData({});
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("expirationTime");
      sessionStorage.removeItem("cartItems");
      sessionStorage.removeItem("cartTotalAmount");
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    });
  }, []);

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider).then((cred) => {
      setDoc(doc(db, "users", cred.user.uid), {
        userId: cred.user.uid,
        createdAt: serverTimestamp(),
      });
      const expirationTime = new Date(
        new Date().getTime() + +cred._tokenResponse.expiresIn * 800
      );
      sessionStorage.setItem("token", cred._tokenResponse.idToken);
      sessionStorage.setItem("expirationTime", expirationTime);
      const remainingTime = calculateRemainingtime(expirationTime);
      logoutTimer = setTimeout(logOut, remainingTime);
    });
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserProfile(userDisplayName, userPhotoURL) {
    return updateProfile(auth.currentUser, {
      displayName: userDisplayName,
      photoURL: userPhotoURL,
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      currentuser && getUserData(currentuser.uid);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logOut, tokenData.duration);
    }
  }, [tokenData, logOut]);

  const contextValue = {
    token,
    user,
    userData,
    signUp,
    signIn,
    logOut,
    googleSignIn,
    resetPassword,
    updateUserProfile,
    getUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
