import { useState, useEffect, useContext, Fragment, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import classes from "./PhoneDetails.module.scss";
import Colors from "./Colors";
import Storage from "./Storage";
import InfoItem from "./InfoItem";
import CartContext from "../../store/cart-context";
import CheckIcon from "@mui/icons-material/Check";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../ui/Loader";

const PhoneDetails = () => {
  const cartCtx = useContext(CartContext);
  const { phoneId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const storageParam = searchParams.get("storage");
  const colorParam = searchParams.get("color");

  const [colorImg, setColorImg] = useState({});
  const [price, setPrice] = useState("");
  const [storage, setStorage] = useState(storageParam);
  const [phone, setPhone] = useState(null);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setStorage(storageParam);
    let priceStorage = storageFunction(storageParam, phone);
    setPrice(priceStorage);
    // for (const color in phone?.colors) {
    //   colorParam === phone?.colors[color].name &&
    //     setColorImg({ color: phone?.colors[color].image, name: colorParam });
    // }
  }, [storageParam, phone]);

  useEffect(() => {
    for (const color in phone?.colors) {
      colorParam === phone?.colors[color].name &&
        setColorImg({ color: phone?.colors[color].image, name: colorParam });
    }
  }, [colorParam, phone?.colors]);

  const storageFunction = (storageP, obj) => {
    let p;
    if (storageP) {
      storageP === obj?.storage.storage64GB && (p = obj?.price.price64GB);
      storageP === obj?.storage.storage128GB && (p = obj?.price.price128GB);
      storageP === obj?.storage.storage256GB && (p = obj?.price.price256GB);
      storageP === obj?.storage.storage512GB && (p = obj?.price.price512GB);
      storageP === obj?.storage.storage1TB && (p = obj?.price.price1TB);
    } else {
      p = obj?.price.price64GB;
    }
    return p;
  };

  useEffect(() => {
    const fetchPhones = async () => {
      const response = await fetch(
        "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/phones.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();

      let found;
      for (const key in responseData) {
        if (responseData[key].model.replace(/\s/g, "-") === phoneId) {
          found = responseData[key];
        }
      }

      if (colorParam) {
        for (const color in found.colors) {
          colorParam === found.colors[color].name &&
            setColorImg({ color: found.colors[color].image, name: colorParam });
        }
      } else {
        setColorImg({ color: found.color1.image, name: found.color1.name });
      }

      let storagePrice = storageFunction(storageParam, found);
      setPrice(storagePrice);
      setPhone(() => found);
      setIsLoading(false);
    };

    fetchPhones().catch((error) => {
      console.log(error);
    });
  }, []);

  const colorImageHandler = useCallback(
    (e) => {
      setColorImg(e);
      searchParams.set("color", e.name);
      setSearchParams(searchParams);
    },
    [setColorImg]
  );

  const priceHandler = useCallback(
    (e) => {
      setPrice(e);
    },
    [setPrice]
  );

  const storageHandler = useCallback(
    (e) => {
      setStorage(e);
      searchParams.set("storage", e);
      setSearchParams(searchParams);
    },
    [setStorage]
  );

  const addItemToCart = () => {
    setAlert(() => true);
    setTimeout(() => setAlert(() => false), 2000);
    let rand =
      Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
    cartCtx.addItem({
      id: rand,
      model: phone.model,
      brand: phone.brand,
      storage: storage,
      price: +price,
      color: colorImg,
      amount: 1,
    });
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <AnimatePresence>
        {alert && (
          <motion.div
            layout
            className={classes.alert}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CheckIcon fontSize="large" />
            <p>Item Added to Cart</p>
          </motion.div>
        )}
      </AnimatePresence>

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
            <h1 className={classes.h1}>{phone.model}</h1>
            <InfoItem title="Brand:" content={phone.brand} />
            <InfoItem title="Waranty:" content={phone.waranty} />
            {phone.ram && <InfoItem title="Ram:" content={phone.ram} />}
            {phone.colors.color1.hex && (
              <Colors
                phoneColors={phone.colors}
                setColorImg={colorImageHandler}
                colorImg={colorImg}
              />
            )}
            {phone.storage.storage64GB && (
              <Storage
                phone={phone}
                setPrice={priceHandler}
                price={price}
                setStorage={storageHandler}
                storage={storage}
              />
            )}
            <div className={classes.containerPrice}>
              <h3>{price ? price : phone.price128GB} $</h3>
              <motion.button
                className={classes.button}
                onClick={addItemToCart}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PhoneDetails;
