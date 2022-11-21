import React from "react";
import classes from "./Storage.module.scss";
import StorageItem from "./StorageItem";

function Storage({ phone, setPrice, price, storage, setStorage }) {
  
  return (
    <div>
      <h4 className={classes.title}>{phone.storageOrCase}:</h4>
      <div className={classes.storageContainer}>
        {phone.storage.storage1.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage1}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phone.storage.storage2.storage  && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage2}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phone.storage.storage3.storage  && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage3}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phone.storage.storage4.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage4}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phone.storage.storage5.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage5}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
      </div>
    </div>
  );
}

export default React.memo(Storage);



// import React from "react";
// import classes from "./Storage.module.scss";
// import StorageItem from "./StorageItem";

// function Storage({ phone, setPrice, price, storage, setStorage }) {

//   if (!price) {
//     price = phone.price128GB;
//   }
//   return (
//     <div>
//       <h4 className={classes.title}>{phone.storageOrCase}:</h4>
//       <div className={classes.storageContainer}>
//         {phone.storage.storage64GB && (
//           <StorageItem
//             storage={storage}
//             price={phone.price.price64GB}
//             storageA={phone.storage.storage64GB}
//             setStorage={setStorage}
//             setPrice={setPrice}
//           />
//         )}
//         {phone.storage.storage128GB && (
//           <StorageItem
//             storage={storage}
//             price={phone.price.price128GB}
//             storageA={phone.storage.storage128GB}
//             setStorage={setStorage}
//             setPrice={setPrice}
//           />
//         )}
//         {phone.storage.storage256GB && (
//           <StorageItem
//             storage={storage}
//             price={phone.price.price256GB}
//             storageA={phone.storage.storage256GB}
//             setStorage={setStorage}
//             setPrice={setPrice}
//           />
//         )}
//         {phone.storage.storage512GB && (
//           <StorageItem
//             storage={storage}
//             price={phone.price.price512GB}
//             storageA={phone.storage.storage512GB}
//             setStorage={setStorage}
//             setPrice={setPrice}
//           />
//         )}
//         {phone.storage.storage1TB && (
//           <StorageItem
//             storage={storage}
//             price={phone.price.price1TB}
//             storageA={phone.storage.storage1TB}
//             setStorage={setStorage}
//             setPrice={setPrice}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default React.memo(Storage);