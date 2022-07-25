import React, { useState } from "react";
import PhonesList from "../components/PhonesList";
import RangePrice from "../components/phones/RangePrice";
import classes from "./Phones.module.css";
import Brand from "../components/phones/Brand";
import TypeFilter from "../components/phones/TypeFilter";
import SortItems from "../components/phones/SortItems";
import ItemsToDisplay from "../components/phones/ItemsToDisplay";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {motion} from 'framer-motion'

const Phones = () => {
  const [filtersClick, setFiltersClick] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 1500]);
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
        initial={{opacity:0}}
        animate={{opacity:1}}
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

      <button className={classes.showFilter} onClick={filtersClickHandler}>
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
      </button>

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
