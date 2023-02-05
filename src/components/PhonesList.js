import React from "react";
import PhoneItem from "./PhoneItem";
import classes from "./PhonesList.module.scss";
import Loader from "../ui/Loader";
import { db } from "./firebase";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import useGetData from "./customHooks/useGetData";

const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const PhonesList = ({
  priceRange,
  brand,
  type,
  sort,
  date,
  numberOfItems,
  randomItems,
  searchQuery = false,
}) => {
  let colRef = collection(db, "products");
  let queryName;

  const quer = (brand, type) => {
    if (date) {
      queryName = query(colRef,  orderBy("serverDate", "desc"),   limit(numberOfItems));
      return;
    }
    if (randomItems) {
      queryName = query(colRef,orderBy("serverDate", "desc"));
      return;
    }
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
      )
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
      queryName = query(
        colRef,
        where("type", "==", type),
        limit(numberOfItems)
      );
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

  // useEffect(() => {
  //   setIsLoading(true);
  //   const colRef = collection(db, "products");
  //   const q = query(colRef, orderBy("serverDate", "desc"));
  //   const unSubscribe = onSnapshot(q, (colSnapshot) => {
  //     let phonesArr = [];
  //     colSnapshot.docs.forEach((doc) => {
  //       phonesArr.push(doc.data());
  //     });
  //     if (searchQuery) {
  //       setPhones(
  //         phonesArr.filter(
  //           (item) =>
  //             item.brand.toLowerCase().includes(searchQuery) ||
  //             item.model.toLowerCase().includes(searchQuery)
  //         )
  //       );
  //       setIsLoading(false);
  //     } else {
  //       setPhones(() => phonesArr);
  //       setIsLoading(false);
  //     }
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, [searchQuery]);


  if (sort) {
    if (sort === "ascending") {
      phones = phones.sort(
        (a, b) =>
          parseFloat(a.storage.storage1.price) -
          parseFloat(b.storage.storage1.price)
      );
    }
    if (sort === "descending") {
      phones = phones.sort(
        (a, b) =>
          parseFloat(b.storage.storage1.price) -
          parseFloat(a.storage.storage1.price)
      );
    }
  }
  randomItems && (phones = getMultipleRandom(phones, numberOfItems));

  const phoneItems = phones.map((phone, i) => {
    if (!priceRange) {
      return (
        <PhoneItem
          date={phone.date}
          type={phone.type}
          key={i}
          id={phone.id}
          price={phone.storage.storage1.price}
          brand={phone.brand}
          model={phone.model}
          colors={phone.colors}
          storage={phone.storage}
        />
      );
    }
    if (
      phone.storage.storage1.price < priceRange[1] &&
      phone.storage.storage1.price > priceRange[0]
    ) {
      return (
        <PhoneItem
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
        />
      );
    }
    return null;
  });

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.container}>{phoneItems}</div>
    </>
  );
};

export default PhonesList;
