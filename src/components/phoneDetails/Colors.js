import React from "react";
import classes from "./Colors.module.css";
import ColorItem from "./ColorItem";

const Colors = ({ phony, setColorImg, colorImg }) => {
 
  return (
    <div>
      <h4 className={classes.title}>Colors:</h4>
      <div className={classes.colorsContainer}>
        {phony.color1.hex && (
          <ColorItem colorA={phony.color1} colorImg={colorImg}  setColorImg={setColorImg}/>
        )}
        {phony.color2.hex && (
         <ColorItem colorA={phony.color2} colorImg={colorImg} setColorImg={setColorImg}/>
        )}
        {phony.color3.hex && (
          <ColorItem colorA={phony.color3} colorImg={colorImg} setColorImg={setColorImg}/>
        )}
        {phony.color4.hex && (
          <ColorItem colorA={phony.color4} colorImg={colorImg} setColorImg={setColorImg}/>
        )}
        {phony.color5.hex && (
          <ColorItem colorA={phony.color5} colorImg={colorImg} setColorImg={setColorImg}/>
        )}
      </div>
    </div>
  );
};

export default Colors;




// import React from "react";
// import classes from "./Colors.module.css";

// const Colors = ({ phony, setColorImg, color }) => {
//   return (
//     <div>
//       <h4 className={classes.title}>Colors:</h4>
//       <div className={classes.colorsContainer}>
//         {phony.black && (
//           <div
//             // className={color === phony.black ? classes.active : classes.colorsItem }
//             className={`${classes.colorsItem} ${
//               color === phony.black ? classes.active : ""
//             }`}
//             onClick={() => {
//               setColorImg(phony.black);
//             }}
//           >
//             <div className={classes.black}></div>
//             <p>Black</p>
//           </div>
//         )}
//         {phony.white && (
//           <div
//             // className={color === phony.white ? classes.active : classes.colorsItem}
//             className={`${classes.colorsItem} ${
//               color === phony.white ? classes.active : ""
//             }`}
//             onClick={() => {
//               setColorImg(phony.white);
//             }}
//           >
//             <div className={classes.white}></div>
//             <p>White</p>
//           </div>
//         )}
//         {phony.red && (
//           <div
//             // className={color === phony.red ? classes.active : classes.colorsItem}
//             className={`${classes.colorsItem} ${
//               color === phony.red ? classes.active : ""
//             }`}
//             onClick={() => {
//               setColorImg(phony.red);
//             }}
//           >
//             <div className={classes.red}></div>
//             <p>Red</p>
//           </div>
//         )}
//         {phony.blue && (
//           <div
//             // className={color === phony.blue ? classes.active : classes.colorsItem}
//             className={`${classes.colorsItem} ${
//               color === phony.blue ? classes.active : ""
//             }`}
//             onClick={() => {
//               setColorImg(phony.blue);
//             }}
//           >
//             <div className={classes.blue}></div>
//             <p>Blue</p>
//           </div>
//         )}
//         {phony.green && (
//           <div
//             // className={color === phony.green ? classes.active : classes.colorsItem}
//             className={`${classes.colorsItem} ${
//               color === phony.green ? classes.active : ""
//             }`}
//             onClick={() => {
//               setColorImg(phony.green);
//             }}
//           >
//             <div className={classes.green}></div>
//             <p>Green</p>
//           </div>
//         )}
//         {phony.gold && (
//           <div
//             // className={color === phony.gold ? classes.active : classes.colorsItem}
//             className={`${classes.colorsItem} ${
//               color === phony.gold ? classes.active : ""
//             }`}
//             onClick={() => {
//               setColorImg(phony.gold);
//             }}
//           >
//             <div className={classes.gold}></div>
//             <p>Gold</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Colors;
