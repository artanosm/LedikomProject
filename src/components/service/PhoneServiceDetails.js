import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./PhoneServiceDetails.module.scss";
import ServiceCard from "./ServiceCard";
import Battery from "../../assets/service/battery.png";
import Screen from "../../assets/service/screen.png";
import BackGlass from "../../assets/service/backGlass.png";
import BackCamera from "../../assets/service/backCamera.png";
import FrontCamera from "../../assets/service/frontCamera.png";
import Speaker from "../../assets/service/speaker.png";
import ServiceContext from "../../store/service-context";
import ServiceItem from "./ServiceItem";
import { db } from "../firebase";
import { getDoc,doc} from 'firebase/firestore';


const PhoneServiceDetails = () => {
  const serviceCtx = useContext(ServiceContext);
  const param = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    const docRef = doc(db,'service',param.serviceId)
    getDoc(docRef).then(docSnap =>{
      console.log(docSnap.data())
      setItem(docSnap.data())
    })
    // const getBrand = async () => {
    //   const response = await fetch(
    //     `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/service/${param.serviceId}.json`
    //   );
    //   if (!response.ok) {
    //     throw new Error("Something went wrong");
    //   }
    //   const responseData = await response.json();

    //   setItem(responseData);
    // };
    // getBrand().catch((error) => {
    //   console.log(error);
    // });
  }, [param.serviceId]);

  let itemD;
  if (item) {
    itemD = item;
  } else {
    return;
  }

  const serviceList = (
    <ul className={classes.cartContainer}>
      {serviceCtx.items.map((item, key) => {
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
              itemImage={Screen}
              price={itemD.screen.price}
              name="Screen"
            />
          )}
          {itemD.battery.price !== 0 && (
            <ServiceCard
              itemImage={Battery}
              price={itemD.battery.price}
              name="Battery"
            />
          )}
          {itemD.backGlass.price !== 0 && (
            <ServiceCard
              itemImage={BackGlass}
              price={itemD.backGlass.price}
              name="Back Glass"
            />
          )}
          {itemD.backCamera.price !== 0 && (
            <ServiceCard
              itemImage={BackCamera}
              price={itemD.backCamera.price}
              name="Back Camera"
            />
          )}
          {itemD.frontCamera.price !== 0 && (
            <ServiceCard
              itemImage={FrontCamera}
              price={itemD.frontCamera.price}
              name="Front Camera"
            />
          )}
          {itemD.speaker.price !== 0 && (
            <ServiceCard
              itemImage={Speaker}
              price={itemD.speaker.price}
              name="Speaker"
            />
          )}
        </div>
        <div className={classes.serviceAmountsContainer}>
          {serviceList}

          {serviceCtx.items.length > 0 && (
            <div>
            <div className={classes.totalAmount}>
              <p>Total:</p>
              <p className={classes.totalNum}>{serviceCtx.totalAmount} $</p>
            </div>
            <p className={classes.callP}>Call On: <span className={classes.numS}>  070 660 038</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneServiceDetails;
