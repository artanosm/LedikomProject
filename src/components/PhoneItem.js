import classes from "./PhoneItem.module.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneItemSkeleton from "./PhoneItemSkeleton";
// import Box from "@mui/material/Box";
// import Skeleton from "@mui/material/Skeleton";

const PhoneItem = ({
  id,
  storage,
  colors,
  model,
  price,
  animation = false,
  isLoading = true,
}) => {
  const discountPercent =
    storage.storage1.discountPrice &&
    Math.floor(
      (100 * (storage.storage1.discountPrice - storage.storage1.price)) /
        storage.storage1.price
    );
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
        duration: 1.05,
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <PhoneItemSkeleton />
      ) : (
        <Link
          to={`/phones/${id}?color=${
            colors.color1.name
          }&storage=${storage.storage1.storage.replace(/\s/g, "+")}`}
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
                <div
                  percent={discountPercent && `${discountPercent}%`}
                  className={
                    storage.storage1.discountPrice
                      ? `${classes.discount}`
                      : `${classes.priceContainer}`
                  }
                >
                  <p
                    style={{
                      textDecoration:
                        storage.storage1.discountPrice && "line-through",
                      color: storage.storage1.discountPrice && "lightgray",
                      marginLeft: !storage.storage1.discountPrice && "2.4rem",
                      marginRight: storage.storage1.discountPrice && ".4rem",
                    }}
                    className={classes.price}
                  >
                    {price}$
                  </p>
                  {storage.storage1.discountPrice && (
                    <p className={classes.discountPrice}>
                      {storage.storage1.discountPrice}$
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Link>
      )}
    </>
  );
};

export default PhoneItem;
