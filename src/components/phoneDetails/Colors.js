import { memo } from "react";
import classes from "./Colors.module.scss";
import ColorItem from "./ColorItem";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};
const Colors = ({ phoneColors, setColorImg, colorImg }) => {
  return (
    <>
      <h4 className={classes.title}>Colors:</h4>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={classes.colorsContainer}
      >
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
      </motion.div>
    </>
  );
};

export default memo(Colors);


