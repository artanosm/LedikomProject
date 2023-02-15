import { useEffect, useState, useContext } from "react";
import { onSnapshot } from "firebase/firestore";
import AuthContext from "../../store/auth-context";

const useGetData = (
  queryPassed,
  argumentChange = null,
  brand,
  type,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
      setIsLoading(true);   
      let unsubscribe = onSnapshot(queryPassed, (snapshot) => {
        let orderArr = snapshot.docs.map((doc) => doc.data());
        setData(orderArr);
        setIsLoading(false);
      });
   

    return () => {
      unsubscribe();
    };
  }, [authCtx?.user, argumentChange, brand, type]);
  return [data, isLoading];
};

export default useGetData;
