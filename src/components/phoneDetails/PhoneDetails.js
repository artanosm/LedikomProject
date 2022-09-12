import { useState, useEffect, useContext, Fragment } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import classes from "./PhoneDetails.module.scss";
import Colors from "./Colors";
import Storage from "./Storage";
import InfoItem from "./InfoItem";
import CartContext from "../../store/cart-context";
import CheckIcon from "@mui/icons-material/Check";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../ui/Loader";

const PhoneDetails = () => {
  const navigate = useNavigate();

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
        console.log("here");
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
      if (storageParam) {
        storageParam === found.storage.storage64GB &&
          setPrice(found.price.price64GB);
        storageParam === found.storage.storage128GB &&
          setPrice(found.price.price128GB);
        storageParam === found.storage.storage256GB &&
          setPrice(found.price.price256GB);
        storageParam === found.storage.storage512GB &&
          setPrice(found.price.price512GB);
        storageParam === found.storage.storage1TB &&
          setPrice(found.price.price1TB);
      } else {
        setPrice(found.price.price64GB);
      }
      setPhone(found);
      setIsLoading(false);
    };

    fetchPhones().catch((error) => {
      console.log(error);
    });
  }, []);

  const colorImageHandler = (color) => {
    
    setColorImg(color);
    navigate('/phones',{replace:true})
  };
  const priceHandler = (price) => {
    setPrice(price);
  };

  const storageHandler = (storage) => {
    setStorage(storage);
    navigate('/phones',{replace:true})
  };

  const addItemToCart = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
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
            className={classes.alert}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 160,
              damping: 20,
            }}
          >
            <CheckIcon fontSize="large" /> <p>Item Added to Cart</p>
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
                phone={phone}
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

// import { useState, useEffect, useContext, Fragment } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import classes from "./PhoneDetails.module.scss";
// import Colors from "./Colors";
// import Storage from "./Storage";
// import InfoItem from "./InfoItem";
// import CartContext from "../../store/cart-context";
// import CheckIcon from "@mui/icons-material/Check";
// import { motion, AnimatePresence } from "framer-motion";
// import Loader from "../../ui/Loader";

// const PhoneDetails = (props) => {
//   const cartCtx = useContext(CartContext);
//   const { phoneId } = useParams();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const storageParam = searchParams.get("storage");
//   const colorParam = searchParams.get("color");

//   const [colorImg, setColorImg] = useState({});
//   const [price, setPrice] = useState("");
//   const [storage, setStorage] = useState("");
//   const [phone, setPhone] = useState(null);
//   const [alert, setAlert] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const fetchPhones = async () => {
//       const response = await fetch(
//         "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/phones.json"
//       );

//       if (!response.ok) {
//         throw new Error("Something went wrong");
//       }
//       const responseData = await response.json();

//       const loadedPhones = [];

//       for (const key in responseData) {
//         loadedPhones.push({
//           id: responseData[key].model.replace(/\s/g, "-"),
//           model: responseData[key].model,
//           brand: responseData[key].brand,
//           storageOrCase: responseData[key].storageOrCase,

//           price64GB: responseData[key].price.price64GB,
//           price128GB: responseData[key].price.price128GB,
//           price256GB: responseData[key].price.price256GB,
//           price512GB: responseData[key].price.price512GB,
//           price1TB: responseData[key].price.price1TB,

//           storage64GB: responseData[key].storage.storage64GB,
//           storage128GB: responseData[key].storage.storage128GB,
//           storage256GB: responseData[key].storage.storage256GB,
//           storage512GB: responseData[key].storage.storage512GB,
//           storage1TB: responseData[key].storage.storage1TB,

//           ram: responseData[key].ram,
//           waranty: responseData[key].waranty,

//           color1: responseData[key].colors?.color1,
//           color2: responseData[key].colors?.color2,
//           color3: responseData[key].colors?.color3,
//           color4: responseData[key].colors?.color4,
//           color5: responseData[key].colors?.color5,
//         });
//       }

//       const [found] = loadedPhones.filter((f) => f.id === phoneId);
//       setPhone(found);

//       if (colorParam) {
//         for (const color in found) {
//           colorParam === found[color].name &&
//             setColorImg({ color: found[color].image, name: colorParam });
//           // if (colorParam === found[color].name) {
//           //   setColorImg({ color: found[color].image, name: colorParam });
//           // }
//         }
//       } else {
//         setColorImg({ color: found.color1.image, name: found.color1.name });
//       }

//       if (storageParam) {
//         setStorage(storageParam);
//         storageParam === found.storage64GB && setPrice(found.price64GB);
//         storageParam === found.storage128GB && setPrice(found.price128GB);
//         storageParam === found.storage256GB && setPrice(found.price256GB);
//         storageParam === found.storage512GB && setPrice(found.price512GB);
//         storageParam === found.storage1TB && setPrice(found.price1TB);
//         setSearchParams({ color: colorParam, storage: storageParam });
//       } else {
//         setStorage(found.storage64GB);
//         setPrice(found.price64GB);
//         colorParam
//           ? setSearchParams({ color: colorParam, storage: found.storage64GB })
//           : setSearchParams({
//               color: found.color1.name,
//               storage: found.storage64GB,
//             });
//         // if (colorParam) {
//         //   setSearchParams({color:colorParam,storage:found.storage64GB})
//         // }else {
//         //   setSearchParams({color:found.color1.name,storage:found.storage64GB})
//         // }
//       }
//       setIsLoading(false);
//     };

//     fetchPhones().catch((error) => {
//       console.log(error);
//     });
//   }, []);

//   const colorImageHandler = (color) => {
//     setColorImg(color);
//   };
//   const priceHandler = (price) => {
//     setPrice(price);
//   };

//   const storageHandler = (storage) => {
//     setStorage(storage);
//   };

//   const addItemToCart = () => {
//     setAlert(true);
//     setTimeout(() => setAlert(false), 3000);
//     let rand =
//       Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);
//     cartCtx.addItem({
//       id: rand,
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
//             className={classes.alert}
//             initial={{ x: "100vw" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100vw" }}
//             transition={{
//               duration: 0.8,
//               type: "spring",
//               stiffness: 160,
//               damping: 20,
//             }}
//           >
//             <CheckIcon fontSize="large" /> <p>Item Added to Cart</p>
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
//             {phone.color1.hex && (
//               <Colors
//                 phone={phone}
//                 setColorImg={colorImageHandler}
//                 colorImg={colorImg}
//               />
//             )}
//             {phone.storage64GB && (
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
