import React from "react";
import classes from "./ColorItem.module.scss";
import { motion } from "framer-motion";

const ColorItem = ({ color, colorImg, setColorImg }) => {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.1 }}
      className={`${classes.colorsItem} ${
      colorImg.hex === color.hex ? classes.active : ""
      }`}
      onClick={() => {    
        setColorImg(color);        
      }}
    >
      <div style={{ backgroundColor: color.hex }}></div>
      <p>{color.name}</p>
    </motion.div>
  );
};

export default React.memo(ColorItem);
