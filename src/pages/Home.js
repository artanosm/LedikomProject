import React from "react";
import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.scss";
import PhonesList from "../components/PhonesList";
import FreeDelivery from "../components/home/FreeDelivery";
import { useParallax } from "react-scroll-parallax";

const Home = () => {
  const div = useParallax({speed: 0})
  return (
    <div>
      {/* <div className={classes.sliderContainer}> */}
      <SliderImages className={classes.sliderContainer} />
      {/* </div> */}
      <div  className={classes.container}>
        <h2>New Products</h2>
        <PhonesList numberOfItems={8} date={true} />
      </div>
      <FreeDelivery />
      <div ref={div.ref} className={classes.container}>
        <h2>Suggested Products</h2>

        <PhonesList
          numberOfItems={4}
          randomItems={true}
          sort={"descending"}
       
        />
      </div>
    </div>
  );
};

export default Home;
