import SliderImages from "../components/home/SliderImages";
import classes from "./Home.module.scss";
import CarouselCom from "../components/home/CarouselCom";
import FreeDelivery from "../components/home/FreeDelivery";
import NewArrival from "../components/home/NewArrival";
import NewProducts from "../components/home/NewProducts";
import { db } from "../components/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import useGetData from "../components/customHooks/useGetData";
import {motion} from 'framer-motion'

const Home = () => {
  let colRef = collection(db, "products");
  let  queryName = query(colRef,  orderBy("serverDate", "desc"));
  let [phones, isLoading] = useGetData(queryName);

  return (
    <motion.div
  // initial={{ opacity: 0.6 }}
  //     animate={{ opacity: 1 }}
  //     exit={{ opacity: 0.6 }}
  //     transition={{ duration: .3 }}
      >
      <SliderImages className={classes.sliderContainer} />
      <div className={classes.container}>
        <h2>New Products</h2>
        <NewProducts  isLoading={isLoading} phones={phones.slice(0,8)} />
      </div>
      <FreeDelivery />
      <div className={classes.carouselContainer} >
        <h2 >
          Suggested Products
        </h2>
          <CarouselCom isLoading={isLoading}  phones={phones}/>
      </div>
      <NewArrival/>
    </motion.div>
  );
};

export default Home;
