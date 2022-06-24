import React, { useContext } from 'react'
import AuthContext from '../store/auth-context'
import { Navigate } from "react-router-dom";



const Profile = () => {
    const authCtx = useContext(AuthContext)
    const logoutHandler = () => {
        authCtx.logout();
      };
    
    const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div>
        {isLoggedIn && <h1>Welcome</h1>}
        {!isLoggedIn && <Navigate to='/login' />}
        {isLoggedIn && <button onClick={logoutHandler}>Log Out</button>}
    </div>
  )
}

export default Profile