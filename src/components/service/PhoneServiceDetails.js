import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./PhoneServiceDetails.module.scss";
import ServiceCard from "./ServiceCard";
import Battery from "../../assets/service/battery.png";
import Screen from "../../assets/service/screen.png";
import BackGlass from "../../assets/service/backGlass.png";
import BackCamera from "../../assets/service/backCamera.png";
import FrontCamera from "../../assets/service/frontCamera.png";
import Speaker from "../../assets/service/speaker.png";
import ServiceItem from "./ServiceItem";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const PhoneServiceDetails = () => {
  const param = useParams();
  const [item, setItem] = useState();
  const [services, setServices] = useState({items:[],totalAmount:0})

  console.log(services)
  useEffect(() => {
    const docRef = doc(db, "service", param.serviceId);
    getDoc(docRef).then((docSnap) => {
      setItem(docSnap.data());
    });

  }, [param.serviceId]);

  let itemD;
  if (item) {
    itemD = item;
  } else {
    return;
  }

  const serviceList = (
    <ul className={classes.cartContainer}>
      {services.items.map((item, key) => {
        return <ServiceItem key={key} name={item.name} price={item.price} />;
      })}
    </ul>
  );
  return (
    <div className={classes.main}>
      <div className={classes.imageContainer}>
        <img src={itemD.image} alt="Phone" />
      </div>
      <div className={classes.headerService}>
        <h2>{itemD.model}</h2>
        <hr />
        <div className={classes.servicesContainer}>
          {itemD.screen.price !== 0 && (
            <ServiceCard
              services={services}
              setServices={setServices}
              itemImage={Screen}
              price={itemD.screen.price}
              name="Screen"
            />
          )}
          {itemD.battery.price !== 0 && (
            <ServiceCard
              services={services}
              setServices={setServices}
              itemImage={Battery}
              price={itemD.battery.price}
              name="Battery"
            />
          )}
          {itemD.backGlass.price !== 0 && (
            <ServiceCard
              services={services}
              setServices={setServices}
              itemImage={BackGlass}
              price={itemD.backGlass.price}
              name="Back Glass"
            />
          )}
          {itemD.backCamera.price !== 0 && (
            <ServiceCard
              services={services}
              setServices={setServices}
              itemImage={BackCamera}
              price={itemD.backCamera.price}
              name="Back Camera"
            />
          )}
          {itemD.frontCamera.price !== 0 && (
            <ServiceCard
              services={services}
              setServices={setServices}
              itemImage={FrontCamera}
              price={itemD.frontCamera.price}
              name="Front Camera"
            />
          )}
          {itemD.speaker.price !== 0 && (
            <ServiceCard
              services={services}
              setServices={setServices}
              itemImage={Speaker}
              price={itemD.speaker.price}
              name="Speaker"
            />
          )}
        </div>
        <div className={classes.serviceAmountsContainer}>
          {serviceList}

          {services.items.length > 0 && (
            <div>
              <div className={classes.totalAmount}>
                <p>Total:</p>
                <p className={classes.totalNum}>{services.totalAmount} $</p>
              </div>
              <p className={classes.callP}>
                Call On: <span className={classes.numS}> 070 660 038</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneServiceDetails;
