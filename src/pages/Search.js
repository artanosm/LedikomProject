import {memo} from "react";
import { useParams } from "react-router-dom";
import PhonesList from "../components/PhonesList";


const Search = () => {
  const {searchId} = useParams();
  let search = searchId.toLocaleLowerCase()

  return (
    <div style={{ display:'flex',flexDirection:'column' ,justifyContent:'center', alignItems: 'center'}}>
      <h4 style={{color: 'gray'}}>Search results for: {search}</h4>
      
   <PhonesList searchQuery={search} />
    </div>
  );

};

export default memo(Search);
