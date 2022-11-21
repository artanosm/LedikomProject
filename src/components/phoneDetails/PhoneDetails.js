import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
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
  const [phone, setPhone] = useState(null);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    if (location.state?.phone) {
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
  }, []);

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
    console.log(storage);
    console.log(price);
    console.log(colorImg);
    setAlert(() => true);
    setTimeout(() => setAlert(() => false), 2000);
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
                className={classes.button}
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

// import { realTimeDatabase } from "../firebase";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import CheckIcon from "@mui/icons-material/Check";
// import { AnimatePresence, motion } from "framer-motion";
// import { Fragment, useCallback, useContext, useEffect, useState } from "react";
// import { useLocation, useParams, useSearchParams } from "react-router-dom";
// import CartContext from "../../store/cart-context";
// import Loader from "../../ui/Loader";
// import Colors from "./Colors";
// import InfoItem from "./InfoItem";
// import classes from "./PhoneDetails.module.scss";
// import Storage from "./Storage";

// const storageFunction =(storageP, obj) => {
//   let p;
//   if (storageP) {
//     storageP === obj?.storage.storage64GB && (p = obj?.price.price64GB);
//     storageP === obj?.storage.storage128GB && (p = obj?.price.price128GB);
//     storageP === obj?.storage.storage256GB && (p = obj?.price.price256GB);
//     storageP === obj?.storage.storage512GB && (p = obj?.price.price512GB);
//     storageP === obj?.storage.storage1TB && (p = obj?.price.price1TB);
//   } else {
//     p = obj?.price.price64GB;
//   }
//   return p;
// };

// const PhoneDetails = () => {
//   const location = useLocation();
//   const cartCtx = useContext(CartContext);
//   const { phoneId } = useParams();

//   const [searchParams, setSearchParams] = useSearchParams();

//   const storageParam = searchParams.get("storage");
//   const colorParam = searchParams.get("color");

//   const [colorImg, setColorImg] = useState({});
//   const [price, setPrice] = useState("");
//   const [storage, setStorage] = useState(storageParam);
//   const [phone, setPhone] = useState(null);
//   const [alert, setAlert] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [firebaseId, setFirebaseId] = useState(location.state?.firebaseId);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     setStorage(storageParam);
//     let priceStorage = storageFunction(storageParam, phone);
//     setPrice(priceStorage);
//   }, [storageParam, phone]);

//   useEffect(() => {
//     for (const color in phone?.colors) {
//       colorParam === phone?.colors[color].name &&
//         setColorImg({ color: phone?.colors[color].image, name: colorParam });
//     }
//   }, [colorParam, phone?.colors]);

//   useEffect(() => {
//     const fetchPhones = async () => {
//       let url;
//       if (firebaseId) {
//         url = `${realTimeDatabase}/phones/${firebaseId}.json`;
//       } else {
//         url =
//           `${realTimeDatabase}/phones.json`;
//       }
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error("Something went wrong");
//       }
//       const responseData = await response.json();

//       let found;
//       if (firebaseId) {
//         found = responseData;
//       } else {
//         for (const key in responseData) {
//           if (responseData[key].model.replace(/\s/g, "-") === phoneId) {
//             setFirebaseId(key);
//             found = responseData[key];
//           }
//         }
//       }

//       if (colorParam) {
//         for (const color in found.colors) {
//           colorParam === found.colors[color].name &&
//             setColorImg({ color: found.colors[color].image, name: colorParam });
//         }
//       } else {
//         setColorImg({ color: found.color1.image, name: found.color1.name });
//       }

//       let storagePrice = storageFunction(storageParam, found);
//       setPrice(storagePrice);
//       setPhone(() => found);
//       setIsLoading(false);
//     };

//     fetchPhones().catch((error) => {
//       console.log(error);
//     });
//   }, [colorParam,firebaseId,phoneId,storageParam]);

//   const colorImageHandler = useCallback(
//     (e) => {
//       setColorImg(e);
//       searchParams.set("color", e.name);
//       setSearchParams(searchParams);
//     },
//     [setColorImg,searchParams,setSearchParams]
//   );

//   const priceHandler = useCallback(
//     (e) => {
//       setPrice(e);
//     },
//     [setPrice]
//   );

//   const storageHandler = useCallback(
//     (e) => {
//       setStorage(e);
//       searchParams.set("storage", e);
//       setSearchParams(searchParams);
//     },
//     [setStorage,searchParams,setSearchParams]
//   );

//   const addItemToCart = () => {
//     setAlert(() => true);
//     setTimeout(() => setAlert(() => false), 2000);
//     cartCtx.addItem({
//       id: `${phone.model}${storage}${colorImg.name}`,
//       model: phone.model,
//       brand: phone.brand,
//       storage: storage,
//       price: +price,
//       color: colorImg,
//       amount: 1,
//     });
//   };

//   return (
//     <Fragment>
//       {isLoading && <Loader />}
//       <AnimatePresence>
//         {alert && (
//           <motion.div
//             layout
//             className={classes.alert}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <CheckIcon fontSize="large" />
//             <p>Item Added to Cart</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {phone && (
//         <div className={classes.container}>
//           <div className={classes.imageContainer}>
//             <img
//               className={classes.image}
//               src={colorImg.color}
//               alt="phone"
//             ></img>
//           </div>
//           <div className={classes.dataContainer}>
//             <h1 className={classes.h1}>{phone.model}</h1>
//             <InfoItem title="Brand:" content={phone.brand} />
//             <InfoItem title="Waranty:" content={phone.waranty} />
//             {phone.ram && <InfoItem title="Ram:" content={phone.ram} />}
//             {phone.colors.color1.hex && (
//               <Colors
//                 phoneColors={phone.colors}
//                 setColorImg={colorImageHandler}
//                 colorImg={colorImg}
//               />
//             )}
//             {phone.storage.storage64GB && (
//               <Storage
//                 phone={phone}
//                 setPrice={priceHandler}
//                 price={price}
//                 setStorage={storageHandler}
//                 storage={storage}
//               />
//             )}
//             <div className={classes.containerPrice}>
//               <h3>{price ? price : phone.price128GB} $</h3>
//               <motion.button
//                 className={classes.button}
//                 onClick={addItemToCart}
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <AddShoppingCartIcon />
//                 Add to Cart
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Fragment>
//   );
// };

// export default PhoneDetails;
