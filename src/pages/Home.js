import React from "react";
import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.scss";
import PhonesList from '../components/PhonesList';
import FreeDelivery from "../components/home/FreeDelivery";

const Home = () => {
  
  return (
    <div>
      {/* <div className={classes.sliderContainer}> */}
        <SliderImages className={classes.sliderContainer} />
      {/* </div> */}
      <div className={classes.container}>
        <h2>New Products</h2>
        <PhonesList numberOfItems={8} date={true}/>
      </div>
      <FreeDelivery/>
      <div className={classes.container}>
        <h2>Suggested Products</h2>
        
        <PhonesList numberOfItems={4}  randomItems={true} sort={'descending'} date={true}/>
      </div>
    </div>
  );
};

export default Home;
