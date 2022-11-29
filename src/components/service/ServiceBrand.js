import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhoneServiceItem from "./PhoneServiceItem";
import classes from "./ServiceBrand.module.css";
import Loader from "../../ui/Loader";
import { db } from "../firebase";
import { getDocs ,collection} from 'firebase/firestore';

const ServiceBrand = () => {
  const [phones, setPhones] = useState([]);
  const brand = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "service");
    getDocs(colRef).then(snapshot => {
      let services=[];
      snapshot.forEach((doc,i)=>{
        services.push({
          date: doc.data().date,
          type: doc.data().type,
          id: doc.data().id,
          model: doc.data().model,
          brand: doc.data().brand,
          image: doc.data().image,
          screen: doc.data().screen,
          battery: doc.data().battery,
          backGlass: doc.data().backGlass,
          backCamera: doc.data().backCamera,
          frontCamera: doc.data().frontCamera,
          speaker: doc.data().speaker,
         } )
      })
      console.log(services)
      setPhones(services)
      setIsLoading(false)

    })
console.log(phones)
    // const getBrand = async () => {
    //   const response = await fetch(
    //     "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/service.json"
    //   );

    //   if (!response.ok) {
    //     throw new Error("Something went wrong");
    //   }
    //   const responseData = await response.json();
    //   let loadedPhones = [];

      
    //   for (const key in responseData) {
    //     loadedPhones.push({
    //       date: responseData[key].date,
    //       type: responseData[key].type,
    //       id: key,
    //       model: responseData[key].model,
    //       brand: responseData[key].brand,
    //       image: responseData[key].image,
    //       screen: responseData[key].screen,
    //       battery: responseData[key].battery,
    //       backGlass: responseData[key].backGlass,
    //       backCamera: responseData[key].backCamera,
    //       frontCamera: responseData[key].frontCamera,
    //       speaker: responseData[key].speaker,
    //     });
    //   }
    //   return loadedPhones;
    // };
    // getBrand()
    //   .then((data) => {
    //     setPhones([...data])
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [brand]);

console.log(brand)
  const filtered = phones.filter((phone) => phone?.brand === brand?.brand);
  
  const phoneItems = (
    <ul className={classes.listItems}>
      {filtered.map((item, key) => {
        return <PhoneServiceItem key={key} item={item} />;
      })}
    </ul>
  );

  return (
    <Fragment>
      {isLoading && <Loader/>}

      <div className={classes.main}>{phoneItems}</div>
    </Fragment>

   
  );
};

export default ServiceBrand;
