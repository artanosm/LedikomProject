import React from "react";
import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.scss";
import PhonesList from "../components/PhonesList";
import CarouselCom from "../components/home/CarouselCom";
import FreeDelivery from "../components/home/FreeDelivery";
import { useParallax } from "react-scroll-parallax";
import NewArrival from "../components/home/NewArrival";

const Home = () => {
  const div = useParallax({ speed: 0 });
  return (
    <div>
      {/* <div className={classes.sliderContainer}> */}
      <SliderImages className={classes.sliderContainer} />
      {/* </div> */}
      <div className={classes.container}>
        <h2>New Products</h2>
        <PhonesList numberOfItems={8} date={true} />
      </div>
      <FreeDelivery />
      <div className={classes.carouselContainer} ref={div.ref}>
        <h2 >
          Suggested Products
        </h2>
          <CarouselCom />

        {/* <PhonesList
          numberOfItems={4}
          randomItems={true}
          sort={"descending"}
       
        /> */}
      </div>
      <NewArrival/>
    </div>
  );
};

export default Home;
