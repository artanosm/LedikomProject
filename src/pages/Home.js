import React from "react";
import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.scss";
import CarouselCom from "../components/home/CarouselCom";
import FreeDelivery from "../components/home/FreeDelivery";
import NewArrival from "../components/home/NewArrival";
import NewProducts from "../components/home/NewProducts";
import { db } from "../components/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import useGetData from "../components/customHooks/useGetData";

const Home = () => {
  // const div = useParallax({ speed:0 });
  let colRef = collection(db, "products");
  let  queryName = query(colRef,  orderBy("serverDate", "desc"));
  let [phones, isLoading] = useGetData(queryName);

  return (
    <div>
      <SliderImages className={classes.sliderContainer} />
      <div className={classes.container}>
        <h2>New Products</h2>
        <NewProducts  isLoading={isLoading} phones={phones.slice(0,8)} />
        {/* <PhonesList  numberOfItems={8} date={true} /> */}
      </div>
      <FreeDelivery />
      <div className={classes.carouselContainer} >
        <h2 >
          Suggested Products
        </h2>
          <CarouselCom  phones={phones}/>
      </div>
      <NewArrival/>
    </div>
  );
};

export default Home;
