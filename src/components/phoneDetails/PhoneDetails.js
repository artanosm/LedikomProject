import {
  Suspense,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CartContext from "../../store/cart-context";
import classes from "./PhoneDetails.module.scss";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import PhoneDetailsSkeleton from "./PhoneDetailsSkeleton";


import SnackBar from "../../ui/SnackBar";
import Modal from "../../ui/Modal";

// import Loader from "../../ui/Loader";
import Colors from "./Colors";
import InfoItem from "./InfoItem";
import Storage from "./Storage";
import {
  db,
  // storage as store
} from "../firebase";

import {
  doc,
  // query,
  // where,
  // limit,
  collection,
  //  getDoc
} from "firebase/firestore";
// import {
//   ref,
//   list,
//   listAll,
// } from "firebase/storage";
// import useGetSingleData from "../customHooks/useGetSingleData";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stage } from "@react-three/drei";
// import GltfModel from "../../pages/GltfModel";
import model from "../../assets/iPhone14pro.glb";
import CarouselCom from "../home/CarouselCom";
import useGetDepData from "../customHooks/useGetDepData";

import GltfModel from "../../pages/GltfModel";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import RatingCom from "./RatingCom";
import { Link} from "react-router-dom";
const PhoneDetails = () => {
  const [threeD, setThreeD] = useState(false);
  const cartCtx = useContext(CartContext);
  const { phoneId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const storageParam = searchParams.get("storage");
  const colorParam = searchParams.get("color");

  const [colorImg, setColorImg] = useState({});
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [storage, setStorage] = useState("");
  const [alert, setAlert] = useState(false);
  // const [phone, setPhone] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // const [model, setModel] = useState('')
  const colRef = collection(db, "products");
  const docRef = doc(db, "products", phoneId);
  // const [phone, isLoading] = useGetSingleData(docRef);

  // const queryName = query(
  //   colRef,
  //   where("brand", "==", 'Apple'),
  //   where("type", "==", 'Phone'),
  //   limit(5)
  //   );
  const [phone, isLoading, suggestedPhones] = useGetDepData(docRef, colRef);



  const showThreeD = () => {
    // setModel(phone.threeDModel)
    //     const modelRef = ref(
    //       store,
    //       `products/${phone.id}/threeD`
    //     );
    //     list(modelRef).then((res) => {

    //       // const existing = res.items[0]?.fullPath;
    // // setModel(existing)

    //     });
    window.document.body.style.overflow = "hidden";
    setThreeD(true);
  };
  const closeThreeD = () => {
    window.document.body.style.overflow = "unset";

    setThreeD(false);
  };


  const storageHandler = useCallback(
    (e) => {
      setStorage(e.storage);
      setPrice(e.price);
      e.discountPrice ? setDiscount(e.discountPrice) : setDiscount("");
      searchParams.set("storage", e.storage);
      setSearchParams(searchParams);
    },

    [setStorage, searchParams, setSearchParams]
  );

  const colorImageHandler = useCallback(
    (e) => {
      setColorImg(e);
      searchParams.set("color", e.name);
      setSearchParams(searchParams);
    },
    [setColorImg, searchParams, setSearchParams]
  );

  useEffect(() => {
    setStorage(storageParam);
    for (const storage in phone?.storage) {
      const element = phone?.storage[storage];
      if (storageParam === element.storage) {
        setStorage(element.storage);
        setPrice(element.price);
        element.discountPrice && setDiscount(element.discountPrice);
      }
      if (storageParam === null) {
        setStorage(phone?.storage?.storage1.storage)
        setPrice(phone?.storage?.storage1?.price)
        phone?.storage?.storage1?.discountPrice && setDiscount(phone?.storage?.storage1?.discountPrice);
      }
      
    }
  }, [storageParam, phone.storage]);

  useEffect(() => {
    for (const color in phone?.colors) {
      const element = phone?.colors[color];
      if (colorParam === element.name) {
        setColorImg(element);
      }
      if (colorParam === null) {
       setColorImg(phone?.colors?.color1)
      }
    }
  }, [colorParam, phone.colors]);


  

  const addItemToCart = () => {
    const unqId = `${phone.model} ${storage} ${colorImg.name}`;
    setAlert(true);
    cartCtx.addItem({
      id: unqId.replace(/\s/g, "-"),
      model: phone.model,
      brand: phone.brand,
      storage: storage,
      price: discount ? +discount : +price,
      color: colorImg,
      amount: 1,
    });
  };



  return (
    <Fragment>
      {/* {isLoading && <Loader />} */}
      <SnackBar
        color={"rgba(75, 183, 75, .8)"}
        message="Item Added to Cart"
        handleClose={()=> setAlert(false)}
        alert={alert}
        icon={<CheckIcon />}
      />
      {isLoading ? (
        <PhoneDetailsSkeleton />
      ) : (
        <div className={classes.container}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={colorImg.image} alt="phone" />

            <button onClick={showThreeD}>
              <ThreeDRotationIcon sx={{ fontSize: "1.5rem" }} />
              {/* 3D View */}
            </button>
            {phone?.rating && <RatingCom rating={phone?.rating} phoneId={phone?.id} />}
          </div>
          <div className={classes.dataContainer}>
            <h1 className={classes.h1}>{phone?.model}</h1>
            <InfoItem title="Brand:" content={phone?.brand} />
            <InfoItem title="Waranty:" content={phone?.waranty} />
            {phone?.ram && <InfoItem title="Ram:" content={phone?.ram} />}
            {phone?.colors?.color1?.hex && (
              <Colors
                phoneColors={phone?.colors}
                setColorImg={colorImageHandler}
                colorImg={colorImg}
              />
            )}
            {phone?.storage?.storage1?.storage && (
              <Storage
                phone={phone}
                setStorage={storageHandler}
                storage={storage}
              />
            )}
            <div className={classes.containerPrice}>
              <h3
                style={{
                  textDecoration: discount && "line-through",
                  color: discount && "lightgray",
                }}
              >
                {price ? price : phone?.storage?.storage1?.price} $
              </h3>
              {discount && (
                <h3 className={classes.discountText}>{discount}$</h3>
              )}
              <button disabled={storage === ""} onClick={addItemToCart}>
                <AddShoppingCartIcon />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {threeD && (
        <Modal onClose={closeThreeD}>
          <div className={classes.modalContainer}>
            <button
              style={{
                border: "none",
                color: "gray",
                backgroundColor: "white",
              }}
              onClick={closeThreeD}
            >
              Close
            </button>
            <Canvas style={{ height: "500px", width: "100%" }}>
              <Suspense fallback={null}>
                <Stage environment={"studio"}>
                  <GltfModel modelPath={model} scale={1} position={[0, 0, 0]} />
                  <mesh></mesh>
                </Stage>
                <OrbitControls />
              </Suspense>
            </Canvas>

            {/* <iframe
              style={{ width: "100%", height: "500px" }}
              title={phone.model}
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              // src={ colorImg.threeD.slice(1, -1)}
              src={ colorImg.threeD}
            ></iframe> */}
          </div>
        </Modal>
      )}
      <div className={classes.suggestContainer}>
        <h2>Maybe you will like</h2>
        <CarouselCom phones={suggestedPhones} showDots={false} />
      </div>
    </Fragment>
  );
};

export default PhoneDetails;

// useEffect(() => {
//   let found;
//   getDoc(docRef).then((doc) => {
//     found = doc.data();
//     if (storageParam) {
//       for (const storage in found.storage) {
//         const element = found.storage[storage];
//         if (storageParam === element.storage) {
//           setStorage(element.storage);
//           setPrice(element.price);
//           element.discountPrice
//             ? setDiscount(element.discountPrice)
//             : setDiscount("");
//         }
//       }
//     } else {
//       setStorage(found.storage.storage1.storage);
//       setPrice(found.storage.storage1.price);
//       found.storage.storage1.discountPrice
//         ? setDiscount(found.storage.storage1.discountPrice)
//         : setDiscount("");
//     }
//     if (colorParam) {
//       for (const color in found.colors) {
//         const element = found.colors[color];
//         if (colorParam === element.name) {
//           setColorImg(element);
//         }
//       }
//     } else {
//       setColorImg(found.colors.color1);
//     }
//     setPhone(found);
//   });
//   setIsLoading(false);
// }, []);

/* <Canvas style={{ height: "500px", width: "100%" }}>
<Suspense fallback={null}>
  <Stage environment={"studio"}>
    <GltfModel
      modelPath={model}

      scale={1}
      position={[0, 0, 0]}
    />
  </Stage>
  <OrbitControls />
</Suspense>
</Canvas> */

/* <iframe
style={{width:'100%',height:'500px'}}
    title={phone.model}
    border='0'
    allowFullScreen
    mozallowfullscreen="true"
    webkitAllowFullScreen="true"
    src={colorImg.threeD} */

// src="https://sketchfab.com/models/4328dea00e47497dbeac73c556121bc9/embed"
// >

// </iframe>
