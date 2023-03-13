import { Box } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const ProfileInfo = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Box fontSize={{xs:'14px',sm:'15px',md:'17px'}} spacing={.5}>
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
