import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    magenta: {
      main: "#ee3183",
    },
  },
});

const menuItemStyles = {
  "&.MuiButtonBase-root.MuiMenuItem-root": {
    color: "gray",
  },
  "&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected": {
    backgroundColor: "rgb(238 49 131 / 10%)",
    color: "#ee3183",
  },
};

const options = ["Apple", "Samsung", "Xiaomi", "Google", "Huawei", "OnePlus"];

const Brand = ({ brand, setBrand }) => {
  return (
    // <div className={classes.container}>
    <ThemeProvider theme={theme}>
      <FormControl
        variant="standard"
        color="magenta"
        sx={{
          m: 1,
          minWidth: { xs: "80%", sm: 120 },
          "&.MuiFormControl-root": {
            margin: 0,
          },
        }}
      >
        <InputLabel
          // sx={{
          //   "&.MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
          //     color: "#ee3183",
          //   },
          // }}
          id="simple-select-standard-label"
        >
          Brand
        </InputLabel>
        <Select
          sx={{
            "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
              color: "#ee3183",
            },
          }}
          labelId="simple-select-standard-label"
          label="Brand"
          id="simple-select-standard"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          <MenuItem sx={menuItemStyles} value="">
            <em>None</em>
          </MenuItem>
          {options.map((option, i) => {
            return (
              <MenuItem key={i} sx={menuItemStyles} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </ThemeProvider>
    // </div>
  );
};

export default React.memo(Brand);

// import React from "react";
// import Select from "react-select";
// import classes from "./Brand.module.css";

// const options = [
//   { value: "Apple", label: "Apple" },
//   { value: "Samsung", label: "Samsung" },
//   { value: "Xiaomi", label: "Xiaomi" },
//   { value: "Huawei", label: "Huawei" },
//   { value: "OnePlus", label: "OnePlus" },
//   { value: "Google", label: "Google" },
// ];

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: "white",
//     color: state.isFocused ? "#ee3183" : "darkgrey",
//     padding: 6,
//   }),
// };

// const Brand = ({ brand, setBrand }) => {
//   return (
//     <div className={classes.container}>
//       <Select
//         styles={customStyles}
//         isClearable={true}
//         placeholder="Brand"
//         defaultValue={brand}
//         isSearchable={false}
//         onChange={setBrand}
//         options={options}
//         theme={(theme) => ({
//           ...theme,
//           borderRadius: 10,
//           colors: {
//             ...theme.colors,
//             primary: "#ee3183",
//           },
//         })}
//       ></Select>
//     </div>
//   );
// };

// export default React.memo(Brand);
