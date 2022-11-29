import AuthContext from "../store/auth-context";
// import { storage } from "../components/firebase";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Profile.module.scss";
import ProfileForm from "../components/profile/ProfileForm";
import { Stack, Button } from "@mui/material";
import ProfileInfo from "../components/profile/ProfileInfo";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.user;

  // const logoutHandler = () => {
  //   authCtx.logOut();
  //   navigate("/", { replace: true });
  // };

  return (
    <div className={classes.mainContainer}>
      {!isLoggedIn && (
        <h5>
          You are not signed in <Link to="/login">Login</Link> first
        </h5>
      )}
      {isLoggedIn && (
        /* <div className={classes.profileContainer}> */
         <Stack alignItems={"center"} sx={{ p:2, width: "100%" }}>
         {!edit && <Stack direction={"row"} justifyContent="end" sx={{ width: "100%" }}>
            <Button sx={{textTransform:'none'}} onClick={()=> navigate('orders')}>My Orders</Button>
           <Button sx={{textTransform:'none'}} onClick={() => setEdit(!edit)}>Edit Profile</Button>
          </Stack>}

          {!edit && (
            <ProfileInfo />
          )}
          {edit && (
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="center"
            >
              <ProfileForm edit={edit} setEdit={setEdit} />
            </Stack>
          )}
        </Stack>
        /* </div> */
      )}
    </div>
  );
};

export default Profile;
