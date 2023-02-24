import React from 'react'
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
    fontSize:{xs:'15px',md:'17px'},
    padding:'0 1rem',
    minHeight:{xs:'35px',md:'48px'},
    height:{xs:'1rem',md:'2.5rem'}
  
  },
  "&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected": {
    backgroundColor: "rgb(238 49 131 / 10%)",
    color: "#ee3183",
    
  },
};
const InputFilter = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <FormControl
        variant="standard"
        // variant="filled"
        color="magenta"
        sx={{
          m: 1,
          minWidth: { xs: "45%",  md:'100px' },
          "&.MuiFormControl-root": {
            margin: "2px 0 0 0",
          },
        }}
      >
        <InputLabel
        
           sx={{
            "&.MuiFormLabel-root.MuiInputLabel-root": {
              fontSize:{xs:'14px',md:'16px'},
            },
            "&.MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
              color: "#ee3183",
              
            },
          }}
          id="simple-select-standard-label"
        >
          {props.label}
        </InputLabel>
        <Select
       
          sx={{
            "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
              color: "#ee3183",
              fontSize:{xs:'15px',md:'17px'},
            },
          }}
          labelId="simple-select-standard-label"
          label="Brand"
          id="simple-select-standard"
          value={props.value}
          onChange={(e) => {
            props.setValue(e.target.value);
          }}
        >
        {
            props.none &&
          <MenuItem sx={menuItemStyles} value="">
            <em>None</em>
          </MenuItem>
        }
          {props.options.map((option, i) => {
            return (
              <MenuItem key={i} sx={menuItemStyles} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </ThemeProvider>
  )
}

export default InputFilter