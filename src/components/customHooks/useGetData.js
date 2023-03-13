import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

const useGetData = (queryPassed, argumentChange = null, brand, type) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onSnapshot(queryPassed, (snapshot) => {
      let orderArr = snapshot.docs.map((doc) => doc.data());
      setData(orderArr);
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
  }, [argumentChange, brand, type]);

  return [data, isLoading];
};

export default useGetData;
