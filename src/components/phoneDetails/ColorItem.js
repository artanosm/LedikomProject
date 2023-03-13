import {memo} from "react";
import classes from "./ColorItem.module.scss";
import { motion } from "framer-motion";
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
const ColorItem = ({ colorA, colorImg, setColorImg }) => {
  return (
    <motion.div
    variants={item}
    //   initial={{ opacity: 0, scale: 0.5 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   whileHover={{ scale: 1.1 }}
    //   transition={{ duration: 0.1 }}
      className={`${classes.colorsItem} ${
      colorImg?.hex === colorA?.hex ? classes.active : ""
      }`}
      onClick={() => {    
        setColorImg(colorA);        
      }}
    >
      <div style={{ backgroundColor: colorA?.hex }}></div>
      <p>{colorA?.name}</p>
    </motion.div>
  );
};

export default memo(ColorItem);
