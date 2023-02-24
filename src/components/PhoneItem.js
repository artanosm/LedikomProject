import React from "react";
import classes from "./PhoneItem.module.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Box from "@mui/material/Box";
// import Skeleton from "@mui/material/Skeleton";

const PhoneItem = ({
  phone,
  id,
  storage,
  colors,
  model,
  price,
  animation = false,
  // isLoading=true,
}) => {
  const cardVariants = {
    offscreen: {
      y: animation ? 200 : 0,
      opacity: animation ? 0 : 1,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
      },
    },
  };

  return (
    <Link
      to={`/phones/${id}?color=${
        colors.color1.name
      }&storage=${storage.storage1.storage.replace(/\s/g, "+")}`}
      state={{ phone }}
      className={classes.a}
    >
      <motion.div
        className={classes.main}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className={classes.container} variants={cardVariants}>
          <img
            className={classes.image}
            alt="phone-img"
            src={colors.color1.image}
            loading="lazy"
          />
          <div className={classes.dataContainer}>
            <p className={classes.model}>{model}</p>
            <p className={classes.price}>{price} $</p>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default PhoneItem;


  /* <Link
to={`/phones/${id}?color=${
  colors.color1.name
}&storage=${storage.storage1.storage.replace(/\s/g, "+")}`}
state={{ phone }}
className={classes.a}
>
<motion.div
  className={classes.main}
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: true, amount: 0.2 }}
>
  <motion.div className={classes.container} variants={cardVariants}>
    {!isLoading ? (
      <>
        <img
          className={classes.image}
          alt="phone-img"
          src={colors.color1.image}
          loading="lazy"
        />
        <div className={classes.dataContainer}>
          <p className={classes.model}>{model}</p>
          <p className={classes.price}>{price} $</p>
        </div>
      </>
    ) : (
      <Box
        ml="10px"
        width={{ xs: "150px", md: "200px" }}
        height={"100%"}
        pt={0.5}
      >
        <Skeleton
          variant="rounded"
          sx={{ borderRadius: "10px" }}
          height={"170px"}
          width={"80%"}
        />
        <Skeleton width={"70%"} />
        <Skeleton width={"40px"} />
      </Box>
    )}
  </motion.div>
</motion.div>
</Link> */

