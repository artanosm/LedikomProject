import { useState } from "react";
import { useParams } from "react-router-dom";
import RangePrice from "../components/phones/RangePrice";
import PhonesList from "../components/PhonesList";
import classes from "./BrandPage.module.scss";
import TypeFilter from "../components/phones/TypeFilter";

const BrandPage = () => {
  
  const [priceRange, setPriceRange] = useState([10, 1500]);
  const [type, setType] = useState(null)

  const { brand } = useParams();

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <h4>Price:</h4>
        <RangePrice priceRange={priceRange} setPriceRange={setPriceRange} />
        <TypeFilter type={type} setType={setType}/>
      </div>
      <PhonesList type={type} brand={{ value: brand }} priceRange={priceRange} />
    </div>
  );
};

export default BrandPage;
