import classes from "./RangePrice.module.css";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";

const theme = createTheme({
  
  palette: {
    primary: {
      // Magenta color
      main: "#ea39ea",
    }
  },
});

export default function RangePrice({priceRange, setPriceRange}) {

  function valuetext(value) {
    return `${value}`;
  }
  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 300 }}>
        <div className={classes.valueContainer}>
          {/* <div className={classes.valueShow}>
            <div className={classes.priceRange}>{priceRange[0]} $</div>
            <div className={classes.priceRange}>{priceRange[1]} $</div>
          </div> */}
          <Slider
            size="small"
            min={0}
            max={1500}
            value={priceRange}
            onChange={handleChange}
            valueLabelDisplay='on'
            getAriaValueText={valuetext}
            color="primary"
            disableSwap
            
          />
        </div>
      </Box>
    </ThemeProvider>
  );
}

// import classes from './RangePrice.module.css'
// import React, { useState } from "react";

// const RangePrice = () => {
// //   const [value, setValue] = useState([10, 1500]);

//   return (
//     <div>
//     <div className={classes.valueShow}>
//     <span>{10}</span>
//     <span>{1500}</span>
//     </div>

//     </div>
//   );
// };

// export default RangePrice;
