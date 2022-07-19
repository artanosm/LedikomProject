import { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import classes from "./PhoneDetails.module.css";
import Colors from "./Colors";
import Storage from "./Storage";
import InfoItem from "./InfoItem";
import CartContext from "../../store/cart-context";
import CheckIcon from "@mui/icons-material/Check";
import { motion } from "framer-motion";

const PhoneDetails = (props) => {
  const cartCtx = useContext(CartContext);
  const { phoneId } = useParams();
  const [colorImg, setColorImg] = useState({});
  const [price, setPrice] = useState("");
  const [storage, setStorage] = useState("");
  const [phone, setPhone] = useState(null);
  const [alert, setAlert] = useState(false);
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
          id: responseData[key].model.replace(/\s/g, "-"),
          model: responseData[key].model,
          brand: responseData[key].brand,
          storageOrCase: responseData[key].storageOrCase,

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
          waranty: responseData[key].waranty,

          color1: responseData[key].colors?.color1,
          color2: responseData[key].colors?.color2,
          color3: responseData[key].colors?.color3,
          color4: responseData[key].colors?.color4,
          color5: responseData[key].colors?.color5,
        });
      }

      const found = loadedPhones.filter((f) => f.id === phoneId);
      setPhone(...found);
      setColorImg({ color: found[0].color1.image, name: found[0].color1.name });
      setPrice(found[0]?.price64GB);
      setStorage(found[0]?.storage64GB);
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
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    let rand =
      Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
    cartCtx.addItem({
      id: rand,
      model: phony.model,
      brand: phony.brand,
      storage: storage,
      price: +price,
      color: colorImg,
      amount: 1,
    });
  };

  return (
    <Fragment>
      {/* {!phone && <h2>Not Found</h2>} */}
      <div
        className={alert ? `${classes.alert} ${classes.active}` : classes.alert}
      >
        <CheckIcon fontSize="large" /> <p>Item Added to Cart</p>
      </div>
      {phone && (
        <div className={classes.container}>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={colorImg.color}
              alt="phone"
            ></img>
          </div>
          <div className={classes.dataContainer}>
            <h1 className={classes.h1}>{phony.model}</h1>
            <InfoItem title="Brand:" content={phony.brand} />
            <InfoItem title="Waranty:" content={phony.waranty} />
            {phony.ram && <InfoItem title="Ram:" content={phony.ram} />}
            {phony.color1.hex && (
              <Colors
                phony={phony}
                setColorImg={colorImageHandler}
                colorImg={colorImg}
              />
            )}
            {phony.storage64GB && (
              <Storage
                phony={phony}
                setPrice={priceHandler}
                price={price}
                setStorage={storageHandler}
                storage={storage}
              />
            )}
            <motion.div
              className={classes.containerPrice}
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>{price ? price : phony.price128GB} $</h3>
              <motion.button
                className={classes.button}
                onClick={addItemToCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PhoneDetails;
