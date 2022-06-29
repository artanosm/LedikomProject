import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [users, setUsers] = useState([{ email: "" }]);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDzk-iiZ_Pp7Ic95GXULqdmdnGcKuRJiW8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      const users = [];
      users.push({
        email: responseData.users[0].email,
      });

      setUsers(users);
    };
    getUserData().catch((err) => console.log(err));
  }, [authCtx.isLoggedIn, authCtx.token]);
  console.log(users);
  return (
    <div>
      {isLoggedIn && <h1>Welcome your email is {users[0].email} </h1>}
      {!isLoggedIn && <Navigate to="/login" />}
      {isLoggedIn && <button onClick={logoutHandler}>Log Out</button>}
    </div>
  );
};

export default Profile;
