import React, { useState } from "react";
import PhonesList from "../components/PhonesList";
import RangePrice from "../components/phones/RangePrice";
import classes from "./Phones.module.css";
import Brand from "../components/phones/Brand";
import TypeFilter from "../components/phones/TypeFilter";
import SortItems from "../components/phones/SortItems"

const Phones = () => {
  const [priceRange, setPriceRange] = useState([10, 1500]);
  const [brand, setBrand] = useState(null);
  const [type, setType] = useState(null);
  const [sort, setSort] = useState(null)

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <h4>Price:</h4>
        <RangePrice
          className={classes.rangePrice}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <Brand brand={brand} setBrand={setBrand} />
        <TypeFilter brand={brand} type={type} setType={setType} />
        <SortItems sort={sort} setSort={setSort} />
      </div>
      <PhonesList sort={sort} type={type} brand={brand} priceRange={priceRange} />
    </div>
  );
};

export default Phones;
