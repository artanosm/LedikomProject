import { TextField, InputAdornment } from "@mui/material";

import { useField } from "formik";

const InputMui = ({ name, icon, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    fullWidth: true,
    variant: "standard",
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      sx={{
        "& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled):before": {
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
      {...configTextField}
    />
  );
};

export default InputMui;

// import React from "react";
// import { TextField,InputAdornment } from "@mui/material";

// const InputMui = React.forwardRef(
//   ({ icon,id, label, type, defaultValue = "" }, ref) => {

//     return (
//       <>
//         <TextField
//            InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               {icon}
//             </InputAdornment>
//           ),
//         }}
//           defaultValue={defaultValue}
//           inputRef={ref}
//           fullWidth={true}
//           id={id}
//           label={label}
//           variant="standard"
//           type={type}
//           sx={{
//             "& .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled):before":
//               {
//                 borderBottom: "2px solid #ee3183",
//               },
//             "& .MuiInputBase-input": {
//               color: "text.secondary",
//             },
//             "& .MuiFormLabel-root.Mui-focused": {
//               color: "#ee3183",
//             },
//             "& .Mui-focused": {
//               color: "text.secondary",
//             },
//             "& .MuiInput-root::after": {
//               borderBottom: "2px solid #ee3183",
//             },
//           }}
//         />
//       </>
//     );
//   }
// );

// export default InputMui;
