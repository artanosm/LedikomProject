import React from "react";
import { Carousel } from "react-carousel-minimal";
import classes from "./SliderImages.module.css";


const SliderImages = () => {
  const images = [
    {
      image:
        "https://admin.ledikom.mk/uploads/banners/2/1648652561-2-1920x800.jpg?v=1",
    },
    {
      image:
        "https://admin.ledikom.mk/uploads/banners/1/1651573737-1-1920x800.jpg?v=1",
    },
    {
      image:
        "https://admin.ledikom.mk/uploads/banners/3/1648652568-3-1920x800.jpg?v=1",
    },
    
  ];

  return (
    <div className={classes.sliderContainer}>
      <Carousel 
        data={images}
        time={3000}
        width="100%"
        height="100%"
        radius="10px"
        automatic={true}
        dots={true}
        slideBackgroundColor="white"
        slideImageFit="contain"
        style={{
          textAlign: "center",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "0",
          padding: "0",
        }}
      />
    </div>
  );
};

export default SliderImages;
