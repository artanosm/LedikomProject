import React, { Fragment } from "react";
import classes from "./Service.module.css";
import BrandItem from "../components/service/BrandItem";

const brands = [
  { name: "Apple", logo: "https://logodix.com/logo/434207.png" },
  { name: "Samsung", logo: "https://www.freepnglogos.com/uploads/samsung-logo-text-png-1.png" },
  {
    name: "Xiaomi",
    logo: "https://www.freepnglogos.com/uploads/xiaomi-png/xiaomi-logo-png-transparent-xiaomi-logo-images-mi-logo-2.png",
  },
  { name: "Huawei", logo: "https://logodix.com/logo/434123.png" },
  { name: "OnePlus", logo: "https://www.seekpng.com/png/detail/99-998528_oneplus-bw-icon-oneplus-6-logo-png.png"},
  {
    name: "Google",
    logo: "https://www.freepnglogos.com/uploads/new-google-logo-png-0.png",
  },
];

const brandsItem = brands.map((brand, key) => {
  return <BrandItem key={key} brand={brand} />;
});
const Service = () => {
  return (
    <Fragment>
      <div className={classes.main}>{brandsItem}</div>
    </Fragment>
  );
};

export default Service;
