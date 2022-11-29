import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    magenta: {
      main: '#ee3183',
    },
  },
})

const menuItemStyles = {
  "&.MuiButtonBase-root.MuiMenuItem-root": {
    color: "gray",
  },
  "&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected": {
    backgroundColor: "rgb(238 49 131 / 10%)",
    color: "#ee3183",
  },
};

const options = [24,48,96];
const ItemsToDisplay = ({ numberOfItems, setNumberOfItems }) => {
  return (
    <ThemeProvider theme={theme}>

    <FormControl variant="standard" color="magenta" sx={{ m: 1, minWidth:{xs:'80%', sm:60},
     "&.MuiFormControl-root":{
      margin:0
    }}}>
      <InputLabel
        sx={{
          "&.MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
            color: "#ee3183",
          },
        }}
        id="simple-select-standard-label"
      >
        Items
      </InputLabel>
      <Select
        sx={{
          "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
            color: "#ee3183",
          },
        }}
        labelId="simple-select-standard-label"
        label="Items"
        id="simple-select-standard"
        value={numberOfItems}
        onChange={(e) => {
          setNumberOfItems(e.target.value);
        }}
      >
      {options.map((option,i)=>{
        return(
          <MenuItem key={i} selected sx={menuItemStyles} value={option}>
          {option}
        </MenuItem>
        )
      })}
      </Select>
    </FormControl>
    </ThemeProvider>
  );
};

export default React.memo(ItemsToDisplay);


// import React from "react";
// import Select from "react-select";
// import classes from "./ItemsToDisplay.module.css";
// const options = [
//   { value: 24, label: "24" },
//   { value: 48, label: "48" },
//   { value: 96, label: "96" },
// ];

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: "white",
//     // borderBottom: "1px dotted darkgrey",
//     color: state.isFocused ? "#ee3183" : "darkgrey",

//     padding: 6,
//   }),
//   // control: () => ({
//   //   // none of react-select's styles are passed to <Control />
//   //   width: 150,
//   // }),
//   // singleValue: (provided, state) => {
//   //   const opacity = state.isDisabled ? 0.5 : 1;
//   //   const transition = "opacity 300ms";

//   //   return { ...provided, opacity, transition };
//   // },
// };

// const ItemsToDisplay = ({ numberOfItems, setNumberOfItems }) => {
//   return (
//     <div className={classes.container}>
//       <Select
//         styles={customStyles}
//         isClearable={false}
//         isSearchable={false}
//         placeholder="24"
//         defaultValue={numberOfItems}
//         onChange={setNumberOfItems}
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

// export default React.memo(ItemsToDisplay);
