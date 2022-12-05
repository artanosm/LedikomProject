import React, { Fragment } from "react";
import PhoneItem from "./PhoneItem";
import classes from "./PhonesList.module.scss";
import Loader from "../ui/Loader";
import { db } from "./firebase";
import { collection, query, orderBy } from "firebase/firestore";
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
  // const [phones, setPhones] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const colRef = collection(db, "products");
  const q = query(colRef, orderBy("serverDate", "desc"));
  const [phones, isLoading] = useGetData(q);

  if (searchQuery) {
    phones.filter(
      (item) =>
        item.brand.toLowerCase().includes(searchQuery) ||
        item.model.toLowerCase().includes(searchQuery)
    );
  }
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

  let filteredPhones;
  if (brand) {
    filteredPhones = phones.filter((phone) => phone.brand === brand);
  } else {
    filteredPhones = phones;
  }

  let filteredType;
  if (type) {
    filteredType = filteredPhones.filter((phone) => phone.type === type);
  } else {
    filteredType = filteredPhones;
  }
  let sortedPhones;

  if (sort) {
    if (sort === "ascending") {
      sortedPhones = filteredType.sort(
        (a, b) =>
          parseFloat(a.storage.storage1.price) -
          parseFloat(b.storage.storage1.price)
      );
    }
    if (sort === "descending") {
      sortedPhones = filteredType.sort(
        (a, b) =>
          parseFloat(b.storage.storage1.price) -
          parseFloat(a.storage.storage1.price)
      );
    }
  } else {
    sortedPhones = filteredType;
  }
  randomItems &&
    (sortedPhones = getMultipleRandom(sortedPhones, numberOfItems));

  let itemsToDisplay;

  numberOfItems
    ? (itemsToDisplay = sortedPhones.slice(0, numberOfItems))
    : (itemsToDisplay = sortedPhones);

  date &&
    itemsToDisplay.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  const phoneItems = itemsToDisplay.map((phone, i) => {
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
    <Fragment>
      {isLoading && <Loader />}
      <div className={classes.container}>{phoneItems}</div>
    </Fragment>
  );
};

export default PhonesList;

// import React, { Fragment, useEffect, useState } from "react";
// import PhoneItem from "./PhoneItem";
// import classes from "./PhonesList.module.scss";
// import Loader from "../ui/Loader";
// import { realTimeDatabase } from "./firebase";

// const getMultipleRandom = (arr, num) => {
//   const shuffled = [...arr].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, num);
// };

// const PhonesList = ({
//   priceRange,
//   brand,
//   type,
//   sort,
//   date,
//   numberOfItems,
//   randomItems,
//   searchQuery = false,
// }) => {
//   const [phones, setPhones] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPhones = async () => {
//       const response = await fetch(`${realTimeDatabase}/phones.json`);
//       if (!response.ok) {
//         throw new Error("Something went wrong");
//       }
//       const data = await response.json();
//       const loadedPhones = [];
//       for (const key in data) {
//         loadedPhones.push({
//           date: data[key].date,
//           type: data[key].type,
//           firebaseId: key,
//           // adding dash to every empty space
//           id: data[key].model.replace(/\s/g, "-"),
//           model: data[key].model,
//           brand: data[key].brand,
//           price: data[key].price,
//           colors: data[key].colors,
//           storage: data[key].storage,
//           ram: data[key].ram,
//         });
//       }

//       searchQuery
//         ? setPhones(
//             loadedPhones.filter(
//               (item) =>
//                 item.brand.toLowerCase().includes(searchQuery) ||
//                 item.model.toLowerCase().includes(searchQuery)
//             )
//           )
//         : setPhones(() => loadedPhones);
//       setIsLoading(false);
//     };
//     fetchPhones();
//   }, [searchQuery]);

//   let filteredPhones;
//   if (brand) {
//     filteredPhones = phones.filter((phone) => phone.brand === brand.value);
//   } else {
//     filteredPhones = phones;
//   }

//   let filteredType;
//   if (type) {
//     filteredType = filteredPhones.filter((phone) => phone.type === type.value);
//   } else {
//     filteredType = filteredPhones;
//   }

//   let sortedPhones;
//   if (sort) {
//     if (sort.value === "ascending") {
//       sortedPhones = filteredType.sort(
//         (a, b) => parseFloat(a.price.price64GB) - parseFloat(b.price.price64GB)
//       );
//     } else {
//       sortedPhones = filteredType.sort(
//         (a, b) => parseFloat(b.price.price64GB) - parseFloat(a.price.price64GB)
//       );
//     }
//   } else {
//     sortedPhones = filteredType;
//   }

//   // Arranges the products the newest first
//   date &&
//     sortedPhones.sort((a, b) => {
//       return new Date(b.date) - new Date(a.date);
//     });

//   randomItems &&
//     (sortedPhones = getMultipleRandom(sortedPhones, numberOfItems.value));

//   let itemsToDisplay;

//   numberOfItems
//     ? (itemsToDisplay = sortedPhones.slice(0, numberOfItems.value))
//     : (itemsToDisplay = sortedPhones);

//   const phoneItems = itemsToDisplay.map((phone) => {
//     let price1;

//     // takes the prices in price property
//     const values = Object.values(phone.price);
//     const minPrice = values.filter((val) => val !== "");
//     price1 = Math.min(...minPrice);
//     if (!priceRange) {
//       return (
//         <PhoneItem
//           firebaseId={phone?.firebaseId}
//           date={phone.date}
//           type={phone.type}
//           price1={price1}
//           key={phone.id}
//           id={phone.id}
//           price={phone.price}
//           brand={phone.brand}
//           model={phone.model}
//           colors={phone.colors}
//           storage={phone.storage}
//         />
//       );
//     }
//     if (price1 < priceRange[1] && price1 > priceRange[0]) {
//       return (
//         <PhoneItem
//           firebaseId={phone?.firebaseId}
//           type={phone.type}
//           price1={price1}
//           key={phone.id}
//           id={phone.id}
//           price={phone.price}
//           brand={phone.brand}
//           model={phone.model}
//           colors={phone.colors}
//           storage={phone.storage}
//         />
//       );
//     }
//     return null;
//   });

//   return (
//     <Fragment>
//       {isLoading && <Loader />}
//       <div className={classes.container}>{phoneItems}</div>
//     </Fragment>
//   );
// };

// export default PhonesList;
