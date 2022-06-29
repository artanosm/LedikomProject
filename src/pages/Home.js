import React from "react";
import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.css";
import PhonesList from '../components/PhonesList'

const Home = () => {
  const date = true
  return (
    <div>
      <div className={classes.sliderContainer}>
        <SliderImages />
      </div>
      <div className={classes.container}>
        <h2>New Products</h2>
        <PhonesList date={date}/>
      </div>
    </div>
  );
};

export default Home;
