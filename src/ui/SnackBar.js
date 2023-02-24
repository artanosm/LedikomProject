import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const SnackBar = ({alert,icon,handleClose,color='#000000',message}) => {
  return (
    <Slide direction="left" in={alert}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alert}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{
          width: { xs: "250px", md: "300px" },
          left: "auto",
          top: { xs: "100px !important", md: "200px !important" },
        }}
      >
        <MuiAlert
          icon={icon}
          onClose={handleClose}
          elevation={6}
          variant="filled"
          sx={{ backgroundColor: `${color} !important` }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Slide>
  );
};

export default SnackBar;
