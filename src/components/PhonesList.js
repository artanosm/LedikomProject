import React from "react";
import PhoneItem from "./PhoneItem";
import classes from "./PhonesList.module.scss";
import Loader from "../ui/Loader";
import { db } from "./firebase";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import useGetData from "./customHooks/useGetData";

const PhonesList = ({
  priceRange,
  brand,
  type,
  sort,
  numberOfItems,
  searchQuery = false,
}) => {
  let colRef = collection(db, "products");
  let queryName;

  const quer = (brand, type) => {
  if (searchQuery) {
    queryName = query(colRef);
    return;
  }
  if (brand !== "" && type !== "") {
    queryName = query(
      colRef,
      where("brand", "==", brand),
      where("type", "==", type),
      limit(numberOfItems)
    );
    return;
  }
  if (brand !== "") {
    queryName = query(
      colRef,
      where("brand", "==", brand),
      limit(numberOfItems)
    );
    return;
  }
  if (type !== "") {
    queryName = query(colRef, where("type", "==", type), limit(numberOfItems));
    return;
  } else {
    queryName = query(
      colRef,
      orderBy("serverDate", "desc"),
      limit(numberOfItems)
    );
    return;
  }
  };

  quer(brand, type);

  let [phones, isLoading] = useGetData(queryName, numberOfItems, brand, type);

  searchQuery &&
    (phones = phones.filter(
      (item) =>
        item.brand.toLowerCase().includes(searchQuery) ||
        item.model.toLowerCase().includes(searchQuery)
    ));

  if (sort) {
    if (sort === "Ascending") {
      phones = phones.sort(
        (a, b) =>
          parseFloat(a.storage.storage1.price) -
          parseFloat(b.storage.storage1.price)
      );
    }
    if (sort === "Descending") {
      phones = phones.sort(
        (a, b) =>
          parseFloat(b.storage.storage1.price) -
          parseFloat(a.storage.storage1.price)
      );
    }
  }

  const phoneItems = phones.map((phone, i) => {
    if (!priceRange) {
      return (
        <PhoneItem
          isLoading={isLoading}
          date={phone.date}
          phone={phone}
          type={phone.type}
          key={i}
          id={phone.id}
          price={phone.storage.storage1.price}
          brand={phone.brand}
          model={phone.model}
          colors={phone.colors}
          storage={phone.storage}
          animation={true}
        />
      );
    }
    if (
      phone.storage.storage1.price < priceRange[1] &&
      phone.storage.storage1.price > priceRange[0]
    ) {
      return (
        <PhoneItem
                  isLoading={isLoading}

          date={phone.date}
          phone={phone}
          type={phone.type}
          key={i}
          id={phone.id}
          price={phone.storage.storage1.price}
          brand={phone.brand}
          model={phone.model}
          colors={phone.colors}
          storage={phone.storage}
          animation={true}
        />
      );
    }
    return null;
  });

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className={classes.container}>{phoneItems}</div>
    </>
  );
};

export default PhonesList;
