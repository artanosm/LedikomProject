import {memo} from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputFilter from "./InputFilter";


const options = [6,12,24,48,96];
const ItemsToDisplay = ({ numberOfItems, setNumberOfItems }) => {
  return (
    <InputFilter options={options} none={false} label='Items' value={numberOfItems} setValue={setNumberOfItems} />
    // <ThemeProvider theme={theme}>

    // <FormControl variant="standard" color="magenta" sx={{ m: 1, minWidth:{xs:'80%', sm:60},
    //  "&.MuiFormControl-root":{
    //   margin: "2px 0 0 0",
    // }}}>
    //   <InputLabel
    //       sx={{
    //         "&.MuiFormLabel-root.MuiInputLabel-root": {
    //           fontSize:{xs:'15px',md:'17px',lg:'20px'},
    //         },
    //         "&.MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    //           color: "#ee3183",
              
    //         },
    //       }}
    //     id="simple-select-standard-label"
    //   >
    //     Items
    //   </InputLabel>
    //   <Select
    //     sx={{
    //       "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    //         color: "#ee3183",
    //         fontSize:{xs:'15px',md:'17px',lg:'20px'},
    //       },
    //     }}
    //     labelId="simple-select-standard-label"
    //     label="Items"
    //     id="simple-select-standard"
    //     value={numberOfItems}
    //     onChange={(e) => {
    //       setNumberOfItems(e.target.value);
    //     }}
    //   >
    //   {options.map((option,i)=>{
    //     return(
    //       <MenuItem key={i} selected sx={menuItemStyles} value={option}>
    //       {option}
    //     </MenuItem>
    //     )
    //   })}
    //   </Select>
    // </FormControl>
    // </ThemeProvider>
  );
};

export default memo(ItemsToDisplay);

