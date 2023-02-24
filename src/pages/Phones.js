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
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

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

  const paramsFunction = useCallback(
    (e, queryName) => {
      if (e === "") {
        searchParams.delete(queryName);
        setSearchParams(searchParams);
      } else {
        searchParams.set(queryName, e);
        setSearchParams(searchParams);
      }
    },
    [setSearchParams, searchParams]
  );

  useEffect(() => {
    brandParam ? setBrand(brandParam) : setBrand("");
    typeParam ? setType(typeParam) : setType("");
    sortParam ? setSort(sortParam) : setSort("");
  }, [searchParams, typeParam, sortParam, brandParam]);

  const filtersClickHandler = () => {
    setFiltersClick((prev) => !prev);
  };

  const clearFilterHandler = () => {
    setBrand("");
    setSort("");
    setType("");
    setNumberOfItems(24);
    setPriceRange([10,1500])
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
    [setBrand, paramsFunction]
  );

  const setSortHandler = useCallback(
    (e) => {
      setSort(e);
      paramsFunction(e, "sort");

    },
    [setSort, paramsFunction]
  );

  const setTypeHandler = useCallback(
    (e) => {
      setType(e);
      paramsFunction(e, "type");

    },
    [setType, paramsFunction]
  );

  return (
    <motion.div
      // initial={{ opacity: 0.6 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0.6 }}
      // transition={{ duration: .3 }}
      className={classes.container}
    >
      <div
        className={
          filtersClick
            ? `${classes.filterContainer} ${classes.active}`
            : classes.filterContainer
        }
      >
        {/* <div className={classes.priceRangeContainer}>
        </div> */}
        <RangePrice priceRange={priceRange} setPriceRange={setPriceRange} />
        <Brand brand={brand} setBrand={setBrandHandler} />
        <TypeFilter brand={brand} type={type} setType={setTypeHandler} />

        <SortItems sort={sort} setSort={setSortHandler} />
        <ItemsToDisplay
          numberOfItems={numberOfItems}
          setNumberOfItems={setNumberOfItemsHandler}
        />
      </div>
      <div className={classes.buttonsContainer}>
        <button className={classes.showFilter} onClick={filtersClickHandler}>
          {filtersClick ? (
            <span>
              Close
              <CloseOutlinedIcon />
            </span>
          ) : (
            <span>
              Filters
              <FilterListOutlinedIcon />
            </span>
          )}
        </button>
        {filtersClick &&  (
          <button className={classes.clearFilter} onClick={clearFilterHandler}>
            <span>
              Clear
              <ClearAllIcon />
            </span>
          </button>
        )}
      </div>

      <PhonesList
        layout
        sort={sort}
        type={type}
        brand={brand}
        priceRange={priceRange}
        numberOfItems={numberOfItems}
        searchQuery={props.searchQuery}
      />
    </motion.div>
  );
};

export default Phones;
