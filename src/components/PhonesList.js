import React, { Fragment, useEffect, useState } from "react";
import PhoneItem from "./PhoneItem";
import classes from "./PhonesList.module.css";

const PhonesList = ({ priceRange, brand, type, sort, date }) => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      const response = await fetch(
        "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/phones.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();

      const loadedPhones = [];

      for (const key in responseData) {
        loadedPhones.push({
          date: responseData[key].date,
          type: responseData[key].type,
          id: key,
          model: responseData[key].model,
          brand: responseData[key].brand,
          price: responseData[key].price,
          image: responseData[key].image,
          colors: responseData[key].colors,
          storage: responseData[key].storage,
          ram: responseData[key].ram,
        });
      }

      setPhones(loadedPhones);
    };

    fetchPhones().catch((error) => {
      console.log(error);
    });
  }, []);
  // console.log(phones);

  let filteredPhones;

  if (brand) {
    filteredPhones = phones.filter((phone) => phone.brand === brand.value);
  } else {
    filteredPhones = phones;
  }

  let filteredType;
  if (type) {
    filteredType = filteredPhones.filter((phone) => phone.type === type.value);
  } else {
    filteredType = filteredPhones;
  }
  let sortedPhones;
  if (sort) {
    if (sort.value === "ascending") {
      sortedPhones = filteredType.sort(
        (a, b) => parseFloat(a.price.price64GB) - parseFloat(b.price.price64GB)
      );
    } else {
      sortedPhones = filteredType.sort(
        (a, b) => parseFloat(b.price.price64GB) - parseFloat(a.price.price64GB)
      );
    }
  } else {
    sortedPhones = filteredType;
  }

// Arranges the products the newest first
if (date) {
  sortedPhones.sort((a,b) =>{
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
}

  const phoneItems = sortedPhones.map((phone) => {
    let price1;
   // takes the prices in price property
    const values = Object.values(phone.price);
    const minPrice = values.filter((val) => val !== "");
    price1 = Math.min(...minPrice);
    if (!priceRange) {
      return (
        <PhoneItem
        date={phone.date}
          type={phone.type}
          price1={price1}
          key={phone.id}
          id={phone.id}
          price={phone.price}
          brand={phone.brand}
          model={phone.model}
          image={phone.image}
          colors={phone.colors}
        />
      );
    }
    if (price1 < priceRange[1] && price1 > priceRange[0]) {
      return (
        <PhoneItem
          type={phone.type}
          price1={price1}
          key={phone.id}
          id={phone.id}
          price={phone.price}
          brand={phone.brand}
          model={phone.model}
          image={phone.image}
          colors={phone.colors}
        />
      );
    }

    return null;
  });

  return (
    <Fragment>
      <div className={classes.container}>{phoneItems}</div>
    </Fragment>
  );
};

export default PhonesList;
