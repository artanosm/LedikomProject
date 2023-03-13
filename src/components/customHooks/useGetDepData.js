import { useEffect, useState } from "react";
import { getDoc, query, where, limit, getDocs } from "firebase/firestore";

const useGetDepData = (singleRef, multipleRef) => {
  const [isLoading, setIsLoading] = useState(false);
  const [singleData, setSingleData] = useState([]);
  const [multipleData, setMultipleData] = useState([]);
  useEffect(() => {
    let found = true;
    setIsLoading(true);
    getDoc(singleRef).then((doc) => {
      found = doc.data();
      const queryName = query(
        multipleRef,
        where("brand", "==", found.brand),
        where("type", "==", found.type),
        limit(10)
      );

      getDocs(queryName).then((docs) => {

        let phones = [];
        docs.forEach((doc) => {
          phones.push(doc.data());
        });
        setMultipleData(phones);
      });

      // setTimeout(() => {
        setSingleData(found);
        setIsLoading(false);
      // }, 500);
    });

    return () => {
      found = false;
    };
  }, []);

  return [singleData, isLoading, multipleData];
};
export default useGetDepData;
