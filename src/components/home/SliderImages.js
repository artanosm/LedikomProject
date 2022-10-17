import React from "react";
import { Carousel } from "react-carousel-minimal";
import classes from "./SliderImages.module.css";
import { motion } from "framer-motion";

const SliderImages = () => {
  const images = [
    {
      image:
        "https://admin.ledikom.mk/uploads/banners/1/1663416099-1-1920x800.jpg?v=1",
    },
    {
      image:
        "https://admin.ledikom.mk/uploads/banners/9/1665413528-9-1920x800.jpg?v=1",
    },
    {
      image:
        "https://admin.ledikom.mk/uploads/banners/3/1648652568-3-1920x800.jpg?v=1",
    },
    {
      image:
        "https://admin.ledikom.mk/uploads/banners/2/1664010366-2-1920x800.jpg?v=1",
    },
  ];

  return (
    <motion.div
      className={classes.sliderContainer}
      // initial={{ opacity: 1 }}
      // animate={{ opacity: 1 }}
    >
      <Carousel
        data={images}
        time={3000}
        width="100%"
        height="100%"
        radius="0px"
        automatic={true}
        dots={true}
        slideBackgroundColor="black"
        slideImageFit="contain"
        style={{
          textAlign: "center",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "0",
          padding: "0",
        }}
      />
    </motion.div>
  );
};

export default SliderImages;
