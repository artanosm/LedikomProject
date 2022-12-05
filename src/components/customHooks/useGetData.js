import {useEffect,useState,useContext} from 'react'
import { onSnapshot } from "firebase/firestore";
import AuthContext from '../../store/auth-context';

const useGetData = (q) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        setIsLoading(true)
        const unsubscribe = onSnapshot(q, (snapshot) => {
         let orderArr = snapshot.docs.map((doc) => doc.data());
         setData(orderArr)
         setIsLoading(false)
        });
        
        return () => {
            unsubscribe();
        };
    },[authCtx?.user]);
    
    return [data,isLoading]
}

export default useGetData;