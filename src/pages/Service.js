import classes from "./Service.module.scss";
import BrandItem from "../components/service/BrandItem";
import AppleLogo from "../assets/brandsLogo/apple-logo.png";
import SamsungLogo from "../assets/brandsLogo/samsung-logo.png";
import XiaomiLogo from "../assets/brandsLogo/xiaomi-logo.png";
import HuaweiLogo from "../assets/brandsLogo/huawei-logo.png";
import OnePlusLogo from "../assets/brandsLogo/oneplus-logo.png";
import GoogleLogo from "../assets/brandsLogo/google-logo.png";
import {motion} from 'framer-motion'


const brands = [
  { name: "Apple", logo: AppleLogo },
  { name: "Samsung", logo: SamsungLogo },
  { name: "Xiaomi", logo: XiaomiLogo },
  { name: "Huawei", logo: HuaweiLogo },
  { name: "OnePlus", logo: OnePlusLogo },
  { name: "Google", logo: GoogleLogo },
];

const brandsItem = brands.map((brand, key) => {
  return <BrandItem key={key} brand={brand} />;
});
const Service = () => {
  return (
    <>
      <motion.div className={classes.main}
      //      initial={{ opacity: 0.6 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0.6 }}
      // transition={{ duration: .3 }}
      >{brandsItem}</motion.div>
    </>
  );
};

export default Service;
