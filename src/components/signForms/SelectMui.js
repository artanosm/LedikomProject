import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useField, useFormikContext } from "formik";

const SelectMui = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  const configSelect = {
    select: true,
    fullWidth: true,
    variant: "standard",
    onChange: handleChange,
    ...field,

    ...otherProps
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, index) => (
        <MenuItem key={index} value={item}>
          {options[item]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectMui;