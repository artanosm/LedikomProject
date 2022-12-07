import React, { useState, useEffect, useCallback } from "react";
import PhonesList from "../components/PhonesList";
import RangePrice from "../components/phones/RangePrice";
import classes from "./Phones.module.scss";
import Brand from "../components/phones/Brand";
import TypeFilter from "../components/phones/TypeFilter";
import SortItems from "../components/phones/SortItems";
import ItemsToDisplay from "../components/phones/ItemsToDisplay";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Phones = (props) => {
  const [filtersClick, setFiltersClick] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 1500]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [numberOfItems, setNumberOfItems] = useState(24);

  let brandParam = searchParams.get("brand");
  let typeParam = searchParams.get("type");
  let sortParam = searchParams.get("sort");

  // const paramsFunction = (e, queryName) => {
  //   if (e === null) {
  //     searchParams.delete(queryName);
  //     setSearchParams(searchParams);
  //   } else {
  //     searchParams.set(queryName, e);
  //     setSearchParams(searchParams);
  //   }
  // };

  const paramsFunction = useCallback((e, queryName)=> {
        if (e === '') {
          searchParams.delete(queryName);
          setSearchParams(searchParams);
        } else {
          searchParams.set(queryName, e);
          setSearchParams(searchParams);
        }
  },[setSearchParams,searchParams])

  useEffect(() => {
    brandParam ? setBrand(brandParam) : setBrand("");
    typeParam ? setType(typeParam) : setType("");
    sortParam ? setSort(sortParam) : setSort("");
  }, [searchParams,typeParam,sortParam,brandParam]);

  const filtersClickHandler = () => {
    setFiltersClick(prev => !prev);
  };

  const setNumberOfItemsHandler = useCallback(
    (e) => {
      setNumberOfItems(e);
    },
    [setNumberOfItems]
  );

  const setBrandHandler = useCallback(
    (e) => {
      setBrand(e);
      paramsFunction(e, "brand");
    },
    [setBrand,paramsFunction]
  );

  const setSortHandler = useCallback(
    (e) => {
      setSort(e);
      paramsFunction(e, "sort");
    },
    [setSort,paramsFunction]
  );

  const setTypeHandler = useCallback(
    (e) => {
      setType(e);
      paramsFunction(e, "type");
    },
    [setType,paramsFunction]
  );

  return (
    <div className={classes.container}>
      <AnimatePresence initial={false}>
        (
        <motion.div
          key="filter"
          className={
            filtersClick
              ? `${classes.filterContainer} ${classes.active}`
              : classes.filterContainer
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            // y: -100,
            opacity: 0,
            transition: { duration: 0.1 },
          }}
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
            setNumberOfItems={setNumberOfItemsHandler}
          />
        </motion.div>
        )
      </AnimatePresence>

      <motion.button
        layout
        transition={{ duration: 0.2 }}
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
        layout
        sort={sort}
        type={type}
        brand={brand}
        priceRange={priceRange}
        numberOfItems={numberOfItems}
        searchQuery={props.searchQuery}
      />
    </div>
  );
};

export default Phones;
