import React from "react";
import InputFilter from "./InputFilter";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

const options = ["Phone", "Smartwatch", "Tablet", "Accessories"];

const TypeFilter = ({ type, setType }) => {
  return (
    <InputFilter none={true}  options={options} value={type} setValue={setType} label={'Type'} />

    // <ThemeProvider theme={theme}>
    //   <FormControl
    //     variant="standard"
    //     color="magenta"
    //     sx={{
    //       m: 1,
    //       minWidth: { xs: "80%", sm: '300px', md:120 },
    //       "&.MuiFormControl-root": {
    //         margin: "2px 0 0 0",
    //       },
    //     }}
    //   >
    //     <InputLabel
        
    //       sx={{
    //         "&.MuiFormLabel-root.MuiInputLabel-root": {
    //           fontSize:{xs:'15px',md:'17px',lg:'20px'},
    //         },
    //         "&.MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    //           color: "#ee3183",
              
    //         },
    //       }}
    //       id="simple-select-standard-label"
    //     >
    //       Type
    //     </InputLabel>
    //     <Select
    //       sx={{
    //         "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    //           color: "#ee3183",
    //           fontSize:{xs:'15px',md:'17px',lg:'20px'},

            
    //         },
    //       }}
    //       labelId="simple-select-standard-label"
    //       label="Type"
    //       id="simple-select-standard"
    //       value={type}
    //       onChange={(e) => {
    //         setType(e.target.value);
    //       }}
    //     >
    //       <MenuItem sx={menuItemStyles} value="">
    //         <em>None</em>
    //       </MenuItem>
    //       {options.map((option, i) => {
    //         return (
    //           <MenuItem   key={i} sx={menuItemStyles} value={option}>
    //             {option}
    //           </MenuItem>
    //         );
    //       })}
    //     </Select>
    //   </FormControl>
    // </ThemeProvider>
  );
};

export default React.memo(TypeFilter);

// import React from "react";
// import Select from "react-select";
// import classes from "./TypeFilter.module.css";
// const options = [
//   { value: "Phone", label: "Phone" },
//   { value: "Smartwatch", label: "Smartwatch" },
//   { value: "Tablet", label: "Tablet" },
//   { value: "Accessories", label: "Accessories" },
// ];

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: "white",
//     // borderBottom: "1px dotted darkgrey",
//     // color: state.isSelected ? "darkgrey" : "darkgrey",
//     color: state.isFocused ? "#ee3183" : "darkgrey",

//     padding: 6,
//   }),

//   // singleValue: (provided, state) => {
//   //   const opacity = state.isDisabled ? 0.5 : 1;
//   //   const transition = "opacity 300ms";

//   //   return { ...provided, opacity, transition };
//   // },
// };

// const TypeFilter = ({ type, setType }) => {
//   return (
//     <div className={classes.container}>
//       <Select
//         styles={customStyles}
//         isClearable={true}
//         isSearchable={false}
//         placeholder="Type"
//         defaultValue={type}
//         onChange={setType}
//         options={options}
//         theme={(theme) => ({
//           ...theme,
//           borderRadius: 10,
//           colors: {
//             ...theme.colors,
//             primary25: "#ee3183",
//             primary: "#ee3183",
//           },
//         })}
//       />
//     </div>
//   );
// };

// export default React.memo(TypeFilter);
