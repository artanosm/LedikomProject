import React from "react";
import classes from "./FreeDelivery.module.scss";
import { useParallax } from "react-scroll-parallax";

const FreeDelivery = () => {
  const image = useParallax({ speed: -15 });
  const text = useParallax({ speed:0 });
  const title = useParallax({ speed: 0 });

  return (

      <div ref={image.ref} className={classes.mainContainer}>
        <h1 ref={title.ref}>Professional Service</h1>
        <h4 ref={text.ref}>Free delivery for orders above 40$</h4>
      </div>
 
  );
};

export default FreeDelivery;
