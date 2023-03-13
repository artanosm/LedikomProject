import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";


const useGetSingleData = (refPassed, argumentChange = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(refPassed, (snapshot) => {
      setData(snapshot.data());
      // setTimeout(() => {
        setIsLoading(false);
      // }, 500);
    }
    // ,(err) => {
    //   console.log(err)
    // }   
    )
    return () => {
      unsubscribe();
    };
  }, [argumentChange]);

  return [data, isLoading];
};

export default useGetSingleData;



// import { useEffect, useState } from "react";
// import { getDoc } from "firebase/firestore";

// const useGetSingleData = (refPassed) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//       let found = true;
//     setIsLoading(true);
//     getDoc(refPassed).then((doc) => {
//       found = doc.data();
//       // setTimeout(() => {
//         setData(found);
//         setIsLoading(false);
        
//       // }, 500);

//     })

//     return ()=>{
//         found= false;
//     }
//   }, []);

//   return [data, isLoading];
// };

// export default useGetSingleData;
