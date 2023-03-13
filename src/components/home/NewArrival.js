import { Link } from "react-router-dom";
import classes from "./NewArrival.module.scss";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    x: "100%",
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      // type: "spring",
      duration: .6,
      // bounce: 0.1,
      ease:"easeOut"
    },
  },
};

const NewArrival = () => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0}}
      className={classes.main}
    >
      <motion.div variants={cardVariants} className={classes.single}>
        <motion.div whileHover={{ scale: 1.05, opacity: 0.7 }}>
          <Link to={"/phones/iPhone-14-Pro"}>
            <h2>iPhone 14 Pro</h2>
            <img
              alt="iphone 14 pro"
              src="https://admin.ledikom.mk/uploads/banners/4/1664009636-4.jpg?v=1"
            />
          </Link>
        </motion.div>
      </motion.div>
      <motion.div variants={cardVariants} className={classes.multi}>
        <motion.div whileHover={{ scale: 1.05, opacity: 0.7 }}>
          <h2>Cases</h2>
          <motion.img
            alt="cases"
            src="https://admin.ledikom.mk/uploads/banners/6/1660649694-6.jpg?v=1"
          />
        </motion.div>

        <Link to={"/phones/Watch-Series-7?color=Starlight&storage=41+mm"}>
          <motion.div whileHover={{ scale: 1.05, opacity: 0.7 }}>
            <h2 className={classes.watch}>Watch</h2>
            <motion.img
              alt="watch"
              src="https://admin.ledikom.mk/uploads/banners/7/1664010086-7.jpg?v=1"
            />
          </motion.div>
        </Link>
      </motion.div>
      <motion.div variants={cardVariants} className={classes.single}>
        {/* <Link to={"/phones/Z-Fold-4?color=Black&storage=256+GB"}> */}
        <motion.div whileHover={{ scale: 1.05, opacity: 0.7 }}>
          <Link to={"/phones/Z-Fold-4"}>
            <h2>Z Fold 4</h2>
            <img
              className={classes.secondImg}
              alt="z fold 4"
              src="https://admin.ledikom.mk/uploads/banners/5/1664009729-5.jpg?v=1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NewArrival;
