import { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import classes from "./PhoneDetails.module.css";
import Colors from "./Colors";
import Storage from "./Storage";
import CartContext from "../../store/cart-context";

const PhoneDetails = (props) => {
  const cartCtx = useContext(CartContext);
  const { phoneId } = useParams();
  const [colorImg, setColorImg] = useState("");
  const [price, setPrice] = useState("");
  const [storage, setStorage] = useState("");
  const [phone, setPhone] = useState(null);

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
          id: key,
          model: responseData[key].model,
          brand: responseData[key].brand,
          image: responseData[key].image,

          price64GB: responseData[key].price.price64GB,
          price128GB: responseData[key].price.price128GB,
          price256GB: responseData[key].price.price256GB,
          price512GB: responseData[key].price.price512GB,
          price1TB: responseData[key].price.price1TB,

          storage64GB: responseData[key].storage.storage64GB,
          storage128GB: responseData[key].storage.storage128GB,
          storage256GB: responseData[key].storage.storage256GB,
          storage512GB: responseData[key].storage.storage512GB,
          storage1TB: responseData[key].storage.storage1TB,

          ram: responseData[key].ram,

          black: responseData[key].colors?.black,
          white: responseData[key].colors?.white,
          red: responseData[key].colors?.red,
          blue: responseData[key].colors?.blue,
          green: responseData[key].colors?.green,
          gold: responseData[key].colors?.gold,
        });
      }

      const found = loadedPhones.filter((f) => f.id === phoneId);
      setPhone(...found);
      setColorImg(found[0].image);
      setPrice(found[0]?.price64GB);
      if (found[0]?.price64GB === "") {
        setPrice(found[0].price128GB);
      }
      setStorage(found[0]?.storage64GB);
      if (found[0]?.storage64GB === "") {
        setStorage(found[0]?.storage128GB);
      }
    };

    fetchPhones().catch((error) => {
      console.log(error);
    });
  }, [phoneId]);

  const phony = { ...phone };

  const colorImageHandler = (color) => {
    setColorImg(color);
  };
  const priceHandler = (price) => {
    setPrice(price);
  };

  const storageHandler = (storage) => {
    setStorage(storage);
  };

  const addItemToCart = () => {
    let rand =
      Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
    cartCtx.addItem({
      id: rand,
      model: phony.model,
      brand: phony.brand,
      storage: storage,
      // + Converts string to number
      price: +price,
      color: colorImg,
      amount: 1,
    });
  };
  return (
    <Fragment>
      {!phone && <h2>Not Found</h2>}
      {phone && <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={colorImg} alt="phone"></img>
        </div>
        <div className={classes.dataContainer}>
          <h1 className={classes.h1}>{phony.model}</h1>
          <div>
            <h3>Brand:</h3> {phony.brand}
          </div>
          <div>
            <h3>Waranty:</h3> 12 months
          </div>
          {phony.ram && (
            <div>
              <h3>Ram:</h3> {phony.ram}
            </div>
          )}
          <Colors
            phony={phony}
            setColorImg={colorImageHandler}
            color={colorImg}
          />
          <Storage
            phony={phony}
            setPrice={priceHandler}
            price={price}
            setStorage={storageHandler}
            storage={storage}
          />
          <div className={classes.containerPrice}>
            <h3>{price ? price : phony.price128GB} $</h3>
            <button className={classes.button} onClick={addItemToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>}
    </Fragment>
  );
};

export default PhoneDetails;
