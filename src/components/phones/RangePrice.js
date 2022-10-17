import classes from "./RangePrice.module.css";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";

const theme = createTheme({
  palette: {
    primary: {
      // Magenta color
      main: "#ee3183",
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
          <Slider
            size="small"
            min={0}
            max={1500}
            value={priceRange}
            onChange={handleChange}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
            color="primary"
            disableSwap
          />
        </div>
      </Box>
    </ThemeProvider>
  );
}

