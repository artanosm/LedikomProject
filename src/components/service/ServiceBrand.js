import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhoneServiceItem from "./PhoneServiceItem";
import classes from "./ServiceBrand.module.css";

const ServiceBrand = () => {
  const [phones, setPhones] = useState([]);
  const brand = useParams();

  useEffect(() => {
    const getBrand = async () => {
      const response = await fetch(
        "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/service.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      let loadedPhones = [];

      
      for (const key in responseData) {
        loadedPhones.push({
          date: responseData[key].date,
          type: responseData[key].type,
          id: key,
          model: responseData[key].model,
          brand: responseData[key].brand,
          image: responseData[key].image,
          screen: responseData[key].screen,
          battery: responseData[key].battery,
          backGlass: responseData[key].backGlass,
          backCamera: responseData[key].backCamera,
          frontCamera: responseData[key].frontCamera,
        });
      }
      return loadedPhones;
    };
    getBrand()
      .then((data) => setPhones([...data]))
      .catch((error) => {
        console.log(error);
      });
  }, [brand]);
  const filtered = phones.filter((phone) => phone.brand === brand.brand);
  
  const phoneItems = (
    <ul>
      {filtered.map((item, key) => {
        return <PhoneServiceItem key={key} item={item} />;
      })}
    </ul>
  );

  return (
    
      <div className={classes.main}>{phoneItems}</div>
   
  );
};

export default ServiceBrand;
