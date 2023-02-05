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


const SortItems = ({ sort, setSort }) => {

  return (
    <ThemeProvider theme={theme}>

    <FormControl variant="standard" color="magenta" sx={{ m: 1, 
     minWidth: { xs: "80%", sm: '300px', md:120 },
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
        Sort
      </InputLabel>
      <Select
        sx={{
          "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
            color: "#ee3183",
          },
        }}
        labelId="simple-select-standard-label"
        label="Sort"
        id="simple-select-standard"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <MenuItem sx={menuItemStyles} value="">
          <em>None</em>
        </MenuItem>
        <MenuItem sx={menuItemStyles} value={"ascending"}>
          Ascending
        </MenuItem>
        <MenuItem sx={menuItemStyles} value={"descending"}>
          Descending
        </MenuItem>
      </Select>
    </FormControl>
    </ThemeProvider>
  );
};

export default React.memo(SortItems);



// import React from "react";
// import Select from "react-select";
// import classes from "./TypeFilter.module.css";
// const options = [
//   { value: "ascending", label: "Ascending" },
//   { value: "descending", label: "Descending" },
// ];

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: "white",
//     // borderBottom: "1px dotted darkgrey",
//     // color: state.isSelected ? "black" : "darkgrey",
//     color: state.isFocused ? "#ee3183" : "darkgrey",

//     padding: 6,
//   }),
//   //   control: () => ({
//   //     // none of react-select's styles are passed to <Control />
//   //     width: 200,
//   //   }),
//   // singleValue: (provided, state) => {
//   //   const opacity = state.isDisabled ? 0.5 : 1;
//   //   const transition = "opacity 300ms";

//   //   return { ...provided, opacity, transition };
//   // },
// };

// const SortItems = ({ sort, setSort }) => {

//   return (
//     <div className={classes.container}>
//       <Select
//         styles={customStyles}
//         isClearable={true}
//         isSearchable={false}
//         placeholder="Price"
//         defaultValue={sort}
//         onChange={setSort}
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

// export default React.memo(SortItems);
