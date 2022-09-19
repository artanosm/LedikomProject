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
import { useSearchParams } from "react-router-dom";


const Phones = () => {

  const [filtersClick, setFiltersClick] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 1500]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [brand, setBrand] = useState(null);
  const [type, setType] = useState(null);
  const [sort, setSort] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState({
    value: 24,
    label: "24",
  });

  const paramsFunction = (e,queryName) =>{
    if (e === null) {
      searchParams.delete(queryName);
      setSearchParams(searchParams);
    } else {
      searchParams.set(queryName, e.value);
      setSearchParams(searchParams);
    }
  }
  useEffect(() => {
    let brandParam = searchParams.get("brand");
    let typeParam = searchParams.get("type");
    let sortParam = searchParams.get("sort");
    brandParam ? setBrand({ value: brandParam, label: brandParam }) : setBrand(null)
    typeParam ? setType({ value: typeParam, label: typeParam }) : setType(null)
    sortParam ? setSort({ value: sortParam, label: sortParam }) :setSort(null)
  },[searchParams]);

  const filtersClickHandler = () => {
    setFiltersClick(!filtersClick);
  };

  const setBrandHandler = (e) => {
    setBrand(e);
    paramsFunction(e,'brand')
  };

  const setSortHandler = (e) => {
    setSort(e);
    paramsFunction(e,'sort')
  };

  const setTypeHandler = (e) => { 
    setType(e);
    paramsFunction(e,'type')
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

        <Brand brand={brand} setBrand={setBrandHandler} />
        <TypeFilter brand={brand} type={type} setType={setTypeHandler} />
        <SortItems sort={sort} setSort={setSortHandler} />
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
