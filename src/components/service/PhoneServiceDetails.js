import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./PhoneServiceDetails.module.css";
import ServiceCard from "./ServiceCard";
import Battery from "../../assets/service/battery.png";
import Screen from "../../assets/service/screen.png";
import BackGlass from "../../assets/service/backGlass.png";
import BackCamera from "../../assets/service/backCamera.png";
import FrontCamera from "../../assets/service/frontCamera.png";

const PhoneServiceDetails = () => {
  const param = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    const getBrand = async () => {
      const response = await fetch(
        `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/service/${param.serviceId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      console.log(responseData);

      setItem(responseData);
    };
    getBrand().catch((error) => {
      console.log(error);
    });
  }, [param.serviceId]);
  console.log(item, "item");
  let itemD;
  if (item) {
    itemD = item;
  } else {
    return;
  }
  console.log(itemD);
  return (
    <div className={classes.main}>
      <div className={classes.imageContainer}>
        <img src={itemD.image} alt="Phone" />
      </div>
      <div className={classes.headerService}>
        <h2>{itemD.model}</h2>
        <hr />
        <div className={classes.servicesContainer}>
          <ServiceCard
            itemImage={Screen}
            price={itemD.screen.price}
            name="Screen"
          />
          <ServiceCard
            itemImage={Battery}
            price={itemD.battery.price}
            name="Battery"
          />
          <ServiceCard
            itemImage={BackGlass}
            price={itemD.backGlass.price}
            name="Back Glass"
          />
          <ServiceCard
            itemImage={BackCamera}
            price={itemD.backCamera.price}
            name="Back Camera"
          />
          <ServiceCard
            itemImage={FrontCamera}
            price={itemD.frontCamera.price}
            name="Front Camera"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneServiceDetails;
