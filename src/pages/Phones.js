import React, { useState, useEffect } from "react";
import PhonesList from "../components/PhonesList";
import RangePrice from "../components/phones/RangePrice";
import classes from "./Phones.module.scss";
import Brand from "../components/phones/Brand";
import TypeFilter from "../components/phones/TypeFilter";
import SortItems from "../components/phones/SortItems";
import ItemsToDisplay from "../components/phones/ItemsToDisplay";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { motion } from "framer-motion";
// import { useSearchParams } from "react-router-dom";

const Phones = () => {
  const [filtersClick, setFiltersClick] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 1500]);
  // const [searchParams, setSearchParams] = useSearchParams();

  const [brand, setBrand] = useState(null);
  const [type, setType] = useState(null);
  const [sort, setSort] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState({
    value: 24,
    label: "24",
  });

  const filtersClickHandler = () => {
    setFiltersClick(!filtersClick);
  };

  return (
    <div className={classes.container}>
      <motion.div
        className={
          filtersClick
            ? `${classes.filterContainer} ${classes.active}`
            : classes.filterContainer
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={classes.priceRangeContainer}>
          <h4>Price:</h4>
          <RangePrice priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>

        <Brand brand={brand} setBrand={setBrand} />
        <TypeFilter brand={brand} type={type} setType={setType} />
        <SortItems sort={sort} setSort={setSort} />
        <ItemsToDisplay
          numberOfItems={numberOfItems}
          setNumberOfItems={setNumberOfItems}
        />
      </motion.div>

      <motion.button
        layout
        transition={{ duration: 0.3 }}
        className={classes.showFilter}
        onClick={filtersClickHandler}
      >
        {filtersClick ? (
          <span>
            Close
            <CloseOutlinedIcon />
          </span>
        ) : (
          <span>
            Filter
            <FilterListOutlinedIcon />
          </span>
        )}
      </motion.button>

      <PhonesList
        sort={sort}
        type={type}
        brand={brand}
        priceRange={priceRange}
        numberOfItems={numberOfItems}
      />
    </div>
  );
};

export default Phones;

// const brandParam = searchParams.get("brand");

// useEffect(() => {
//   if (brandParam) {
//     setBrand({value:brandParam,label:brandParam})
//   }
// },[]);

// useEffect(()=>{
// if (brandParam) {
//   return;
// }
// else{
//  if (!brandParam) {
//   return
//  }
//   setBrand({value:null,label:'Brands'})
// }
// },[brandParam])

// useEffect(()=>{
//   if (brand.value === null) {
//     setSearchParams({})
//   }else {
//   setSearchParams({brand: brand.value})
//   }
// },[brand])

// useEffect(() => {
//   if (brandParam) {
//     setBrand({value:brandParam,label:brandParam})
//   }
// },[]);