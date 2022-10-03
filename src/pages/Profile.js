import React, { useContext} from "react";
import AuthContext from "../store/auth-context";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext);
  
  const isLoggedIn = authCtx.user;
 
  const logoutHandler = () => {
    authCtx.logOut();
    navigate('/', {replace:true})
  };

  return (
    <div>
      {!isLoggedIn && <Navigate to="/login" />}
      {isLoggedIn && <h1>Welcome your email is: {authCtx.user.email} </h1>}
      {isLoggedIn && <button onClick={logoutHandler}>Log Out</button>}
    </div>
  );
};

export default Profile;



// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "../store/auth-context";
// import { Navigate } from "react-router-dom";

// const Profile = () => {
//   const authCtx = useContext(AuthContext);
//   const [users, setUsers] = useState([{ email: "" }]);

//   const logoutHandler = () => {
//     authCtx.logout();
//   };

//   const isLoggedIn = authCtx.isLoggedIn;

//   useEffect(() => {
//     const getUserData = async () => {
//       const response = await fetch(
//         "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDzk-iiZ_Pp7Ic95GXULqdmdnGcKuRJiW8",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             idToken: authCtx.token,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const responseData = await response.json();
//       const users = [];
//       users.push({
//         email: responseData.users[0].email,
//       });

//       setUsers(users);
//     };
//     getUserData().catch((err) => console.log(err));
//   }, [authCtx.isLoggedIn, authCtx.token]);
//   return (
//     <div>
//       {isLoggedIn && <h1>Welcome your email is {users[0].email} </h1>}
//       {!isLoggedIn && <Navigate to="/login" />}
//       {isLoggedIn && <button onClick={logoutHandler}>Log Out</button>}
//     </div>
//   );
// };

// export default Profile;
