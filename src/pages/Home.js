import React from "react";
import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.css";
import PhonesList from '../components/PhonesList';
import FreeDelivery from "../components/home/FreeDelivery";

const Home = () => {
  const date = true
  return (
    <div>
      <div className={classes.sliderContainer}>
        <SliderImages />
      </div>
      <div className={classes.container}>
        <h2>New Products</h2>
        <PhonesList numberOfItems={{value:4}} date={date}/>
      </div>
      <FreeDelivery/>
    </div>
  );
};

export default Home;
