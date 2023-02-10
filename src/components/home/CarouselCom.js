import React from "react";
import useGetData from "../customHooks/useGetData";
import Loader from "../../ui/Loader";
import PhoneItem from "../PhoneItem";
import { db } from "../firebase";
import { collection, query } from "firebase/firestore";
import Carousel, { consts } from "react-elastic-carousel";
import './CarouselCom.css'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const getMultipleRandom = (arr) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled;
};

const CarouselCom = () => {
  let colRef = collection(db, "products");
  let queryName = query(colRef);
  let [phones, isLoading] = useGetData(queryName);

const arrowTheme = {
    fontSize: '2rem',
  "&:hover": {
    color: 'rgb(238, 49, 131)',
  },
}

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <ArrowBackIosIcon sx={{...arrowTheme}} />
      ) : (
        <ArrowForwardIosIcon sx={{...arrowTheme}} />
      );

    return (
      <button
        style={{
          cursor: "pointer",
          backgroundColor: "transparent",
          alignSelf: "center",
          border: "none",
          color: "gray",
        }}
        onClick={onClick}
        disabled={isEdge}
      >
        {pointer}
      </button>
    );
  };

  const breakPoints = [
    { width: 250, itemsToShow: 1 ,},
    { width: 550, itemsToShow: 2,},
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4},
    // { width: 1450, itemsToShow: 4 },
    { width: 1750, itemsToShow: 5 },
  ];

  const randomized = getMultipleRandom(phones)

  const phoneItems = randomized.map((phone, i) => {
    return (
      <PhoneItem
        date={phone.date}
        phone={phone}
        type={phone.type}
        key={i}
        id={phone.id}
        price={phone.storage.storage1.price}
        brand={phone.brand}
        model={phone.model}
        colors={phone.colors}
        storage={phone.storage}
      />
    );
  });

  return (
    <>
      {isLoading && <Loader/>}
      <Carousel
        renderArrow={myArrow}
        // itemPadding={[10, 50]}
        // itemPadding={[5, 30]}
        pagination={false}
        breakPoints={breakPoints}
      >
        {phoneItems}
      </Carousel>
    </>
  );
};

export default CarouselCom;
