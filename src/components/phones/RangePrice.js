// import classes from "./RangePrice.module.scss";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      // Magenta color
      main: "#ee3183",
      // light: '#dc8caf'
    },
  },
});

export default function RangePrice({ priceRange, setPriceRange }) {
  function valuetext(value) {
    return `${value}`;
  }
  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display='flex' alignItems={'center'} justifyContent={'space-between'} gap='1rem' sx={{ 
          minWidth: { xs: "90%", sm: '300px', md:'250px' },
          marginTop:{xs:'1.3rem'},
         }}>

          <Typography fontSize={{xs:14,md:16}} color='gray'>Price:</Typography>
          <Slider
            size="small"
            min={0}
            max={1500}
            value={priceRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            color="primary"
            disableSwap
            sx={{
              "& .MuiSlider-thumb": {
                borderRadius: "2px",
                height: "15px",
                width: "3px",
              },
              "& .MuiSlider-thumb.Mui-active":{
                boxShadow: '0px 0px 0px 7px rgb(238 49 49 / 16%)'
              },
              "& .MuiSlider-valueLabel": {
                lineHeight: 1,
                background: "unset",
                padding: 0,
                width: 25,
                height: 25,
                borderRadius: "50% 50% 50% 0",
                backgroundColor: "primary.main",
                opacity: '0.7',
                transformOrigin: "bottom left",
                transform: "translate(50%, -40%) rotate(-45deg) scale(0)",
                "&:before": { display: "none" },
                "&.MuiSlider-valueLabelOpen": {
                  transform: "translate(50%, -80%) rotate(-45deg) scale(1)",
            
                },
                "& .MuiSlider-valueLabelLabel": {
            fontSize:'10px'
                },

                "& > *": {
                  transform: "rotate(45deg)",
                },
              },
            }}
          />
      </Box>
    </ThemeProvider>
  );
}
