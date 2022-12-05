import React, { Fragment } from "react";
import classes from "./Colors.module.scss";
import ColorItem from "./ColorItem";

const Colors = ({ phoneColors, setColorImg, colorImg }) => {

  // const colors = Object.keys(phoneColors).map((col, i) => {
  //   return (
  //     phoneColors[col].hex && (
  //         <ColorItem
  //           key={col}
  //           color={phoneColors[col]}
  //           colorImg={colorImg}
  //           setColorImg={setColorImg}
  //         />
  //       )
  //     );
  //   });

  return (
    <Fragment>
      <h4 className={classes.title}>Colors:</h4>
      <div className={classes.colorsContainer}>
        {phoneColors.color1?.hex && (
          <ColorItem
            colorA={phoneColors.color1}
            colorImg={colorImg}
            setColorImg={setColorImg}
          />
        )}
        {phoneColors.color2?.hex && (
          <ColorItem
            colorA={phoneColors.color2}
            colorImg={colorImg}
            setColorImg={setColorImg}
          />
        )}
        {phoneColors.color3?.hex && (
          <ColorItem
            colorA={phoneColors.color3}
            colorImg={colorImg}
            setColorImg={setColorImg}
          />
        )}
        {phoneColors.color4?.hex && (
          <ColorItem
            colorA={phoneColors.color4}
            colorImg={colorImg}
            setColorImg={setColorImg}
          />
        )}
        {phoneColors.color5?.hex && (
          <ColorItem
            colorA={phoneColors.color5}
            colorImg={colorImg}
            setColorImg={setColorImg}
          />
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(Colors);

// {/* {phoneColors.color1.hex && (
//   <ColorItem colorA={phoneColors.color1} colorImg={colorImg}  setColorImg={setColorImg}/>
// )}
// {phoneColors.color2.hex && (
//  <ColorItem colorA={phoneColors.color2} colorImg={colorImg} setColorImg={setColorImg}/>
// )}
// {phoneColors.color3.hex && (
//   <ColorItem colorA={phoneColors.color3} colorImg={colorImg} setColorImg={setColorImg}/>
// )}
// {phoneColors.color4.hex && (
//   <ColorItem colorA={phoneColors.color4} colorImg={colorImg} setColorImg={setColorImg}/>
// )}
// {phoneColors.color5.hex && (
//   <ColorItem colorA={phoneColors.color5} colorImg={colorImg} setColorImg={setColorImg}/>
// )} */}

// import React from "react";
// import classes from "./Colors.module.css";
