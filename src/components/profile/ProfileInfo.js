import { Box } from "@mui/material";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const ProfileInfo = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Box spacing={.5}>
      {authCtx.userData?.name && <p>Name: {authCtx.userData?.name}</p>}
      {authCtx.user?.email && <p>Email: {authCtx.user.email}</p>}
      {authCtx.userData?.address && <p>Address: {authCtx.userData?.address}</p>}
      {authCtx.userData?.city && <p>City: {authCtx.userData?.city}</p>}
      {authCtx.userData?.phoneNumber && (
        <p>Phone number: {authCtx.userData?.phoneNumber}</p>
      )}
    </Box>
  );
};

export default ProfileInfo;
