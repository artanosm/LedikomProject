import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import SnackBar from "../../ui/SnackBar";

import { motion } from "framer-motion";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CartContext from "../../store/cart-context";
import Loader from "../../ui/Loader";
import Colors from "./Colors";
import InfoItem from "./InfoItem";
import classes from "./PhoneDetails.module.scss";
import Storage from "./Storage";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const PhoneDetails = () => {
  const location = useLocation();
  const cartCtx = useContext(CartContext);
  const { phoneId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const storageParam = searchParams.get("storage");
  const colorParam = searchParams.get("color");

  const [colorImg, setColorImg] = useState({});
  const [price, setPrice] = useState("");
  const [storage, setStorage] = useState(null);
  const [phone, setPhone] = useState(location?.state?.phone);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setStorage(storageParam);
    for (const storage in phone?.storage) {
      const element = phone?.storage[storage];
      if (storageParam === element.storage) {
        setStorage(element.storage);
        setPrice(element.price);
      }
    }
  }, [storageParam, phone]);

  useEffect(() => {
    for (const color in phone?.colors) {
      const element = phone?.colors[color];
      if (colorParam === element.name) {
        setColorImg(element);
      }
    }
  }, [colorParam, phone]);

  useEffect(() => {
    let found;
    if (location?.state?.phone) {
      setPhone(location.state.phone);
    } else {
      const docRef = doc(db, "products", phoneId);
      getDoc(docRef).then((doc) => {
        found = doc.data();
        if (storageParam) {
          for (const storage in found.storage) {
            const element = found.storage[storage];
            if (storageParam === element.storage) {
              setStorage(element.storage);
              setPrice(element.price);
            }
          }
        } else {
          setStorage(found.storage.storage1.storage);
          setPrice(found.storage.storage1.price);
        }
        if (colorParam) {
          for (const color in found.colors) {
            const element = found.colors[color];
            if (colorParam === element.name) {
              setColorImg(element);
            }
          }
        } else {
          setColorImg(found.colors.color1);
        }
        setPhone(found);
      });
    }
    setIsLoading(false);
  }, [
    setPhone,
    setIsLoading,
    setColorImg,
    setPrice,
    setStorage,
    location.state,
    colorParam,
    phoneId,
    storageParam,
  ]);

  const colorImageHandler = useCallback(
    (e) => {
      setColorImg(e);
      searchParams.set("color", e.name);
      setSearchParams(searchParams);
    },
    [setColorImg, searchParams, setSearchParams]
  );

  const storageHandler = useCallback(
    (e) => {
      setStorage(e.storage);
      setPrice(e.price);

      searchParams.set("storage", e.storage);
      setSearchParams(searchParams);
    },

    [setStorage, searchParams, setSearchParams]
  );

  const addItemToCart = () => {
    setAlert(true);
    cartCtx.addItem({
      id: `${phone.model}${storage}${colorImg.name}`,
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
      <SnackBar
        color={"#4bb74b"}
        message="Item Added to Cart"
        handleClose={handleClose}
        alert={alert}
        icon={<CheckIcon />}
      />
      {phone && (
        <div className={classes.container}>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={colorImg.image}
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
            {phone.storage.storage1.storage && (
              <Storage
                phone={phone}
                price={price}
                setStorage={storageHandler}
                storage={storage}
              />
            )}
            <div className={classes.containerPrice}>
              <h3>{price ? price : phone.storage.storage1.price} $</h3>
              <motion.button
                onClick={addItemToCart}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <AddShoppingCartIcon />
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
