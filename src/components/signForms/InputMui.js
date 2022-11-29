import React from "react";
import { TextField } from "@mui/material";

const InputMui = React.forwardRef(
  ({ id, label, type, defaultValue = "" }, ref) => {
    console.log(defaultValue)
    return (
      <>
        <TextField
          defaultValue={defaultValue}
          inputRef={ref}
          fullWidth={true}
          id={id}
          label={label}
          variant="standard"
          type={type}
          sx={{
            "& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled):before":
              {
                borderBottom: "2px solid #ee3183",
              },
            "& .MuiInputBase-input": {
              color: "text.secondary",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "#ee3183",
            },
            "& .Mui-focused": {
              color: "text.secondary",
            },
            "& .MuiInput-root::after": {
              borderBottom: "2px solid #ee3183",
            },
          }}
        />
      </>
    );
  }
);

export default InputMui;
