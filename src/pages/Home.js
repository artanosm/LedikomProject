import React from "react";
import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.scss";
import PhonesList from '../components/PhonesList';
import FreeDelivery from "../components/home/FreeDelivery";

const Home = () => {
  const date = true;
  return (
    <div>
      {/* <div className={classes.sliderContainer}> */}
        <SliderImages className={classes.sliderContainer} />
      {/* </div> */}
      <div className={classes.container}>
        <h2>New Products</h2>
        <PhonesList numberOfItems={{value:8}} date={date}/>
      </div>
      <FreeDelivery/>
      <div className={classes.container}>
        <h2>Suggested Products</h2>
        <PhonesList numberOfItems={{value:4}}  randomItems={true} sort={{value:'descending'}} date={date}/>
      </div>
    </div>
  );
};

export default Home;
