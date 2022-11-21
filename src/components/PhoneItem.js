import React from "react";
import classes from "./PhoneItem.module.scss";
import { Link} from "react-router-dom";
import { motion } from "framer-motion";

const PhoneItem = ({
  phone,
  id,
  storage,
  colors,
  model,
  brand,
  price,
}) => {
 
  return (
    <Link
      to={`/phones/${id}?color=${
        colors.color1.name
      }&storage=${storage.storage1.storage.replace(/\s/g, "+")}`}
      state={{ phone }}
      className={classes.a}
    >
      <motion.div
        className={classes.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          className={classes.image}
          alt="phone-img"
          src={colors.color1.image}
          loading="lazy"
        />
        <div className={classes.dataContainer}>
          <p className={classes.model}>{model}</p>
          <p className={classes.brand}>{brand}</p>
          <p className={classes.price}>{price} $</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default PhoneItem;



// import React from "react";
// import classes from "./PhoneItem.module.scss";
// import { Link} from "react-router-dom";
// import { motion } from "framer-motion";

// const PhoneItem = ({
//   id,
//   storage,
//   colors,
//   model,
//   brand,
//   price1,
//   firebaseId,
// }) => {
//   return (
//     <Link
//       to={`/phones/${id}?color=${
//         colors.color1.name
//       }&storage=${storage.storage64GB.replace(/\s/g, "+")}`}
//       state={{ firebaseId: firebaseId }}
//       className={classes.a}
//     >
//       <motion.div
//         className={classes.container}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <img
//           className={classes.image}
//           alt="phone-img"
//           src={colors.color1.image}
//           loading="lazy"
//         />
//         <div className={classes.dataContainer}>
//           <p className={classes.model}>{model}</p>
//           <p className={classes.brand}>{brand}</p>
//           <p className={classes.price}>{price1} $</p>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// export default PhoneItem;
