import React from "react";
import { Link } from "react-router-dom";
import classes from "./NewArrival.module.scss";
import { motion } from "framer-motion";

const imageVariant = {
  initial: { scale: 1 },
  animate: { scale: 1.05, opacity: 0.7 },
};

const NewArrival = () => {
  return (
    <div className={classes.main}>
      <motion.div
        variants={imageVariant}
        initial="initial"
        whileHover="animate"
        className={classes.single}
      >
        <Link to={"/phones/iPhone-14-Pro?color=Deep%20Purple&storage=128+GB"}>
          <h2>iPhone 14 Pro</h2>
          <img
            alt="iphone 14 pro"
            src="https://admin.ledikom.mk/uploads/banners/4/1664009636-4.jpg?v=1"
          />
        </Link>
      </motion.div>
      <div className={classes.multi}>
        <motion.div
          variants={imageVariant}
          initial="initial"
          whileHover="animate"
        >
          <h2>Cases</h2>
          <motion.img
            alt="cases"
            src="https://admin.ledikom.mk/uploads/banners/6/1660649694-6.jpg?v=1"
          />
        </motion.div>
        <Link to={"/phones/Watch-Series-7?color=Starlight&storage=41+mm"}>
          <motion.div  variants={imageVariant}
          initial="initial"
          whileHover="animate">
            <h2 className={classes.watch}>Watch</h2>
            <motion.img
              alt="watch"
              src="https://admin.ledikom.mk/uploads/banners/7/1664010086-7.jpg?v=1"
            />
          </motion.div>
        </Link>
      </div>
      <motion.div
        variants={imageVariant}
        initial="initial"
        whileHover="animate"
        className={classes.single}
      >
        <Link to={"/phones/Z-Fold-4?color=Black&storage=256+GB"}>
          <h2>Z Fold 4</h2>
          <motion.img
   
            alt="z fold 4"
            src="https://admin.ledikom.mk/uploads/banners/5/1664009729-5.jpg?v=1"
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default NewArrival;
