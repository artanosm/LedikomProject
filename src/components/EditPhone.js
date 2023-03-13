import  { useEffect, useState, useRef,useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import InputForm from "./addPhone/InputForm";
import SnackBar from "../ui/SnackBar";
import CheckIcon from "@mui/icons-material/Check";
import AuthContext from "../store/auth-context";

const EditPhone = () => {   
     const authCtx = useContext(AuthContext)
  const [phone, setPhone] = useState();
  const [alert, setAlert] = useState(false);
const [disable, setDisable] = useState(false)
  const { phoneId } = useParams();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };
 

  const brandRef = useRef("");
  const modelRef = useRef("");
  const typeRef = useRef("");
  const ramRef = useRef("");
  const warantyRef = useRef("");
  const storageOrCaseRef = useRef("");

  const storage1Ref = useRef("");
  const storage2Ref = useRef("");
  const storage3Ref = useRef("");
  const storage4Ref = useRef("");
  const storage5Ref = useRef("");

  const price1Ref = useRef("");
  const price2Ref = useRef("");
  const price3Ref = useRef("");
  const price4Ref = useRef("");
  const price5Ref = useRef("");

  const discountPrice1Ref = useRef("");
  const discountPrice2Ref = useRef("");
  const discountPrice3Ref = useRef("");
  const discountPrice4Ref = useRef("");
  const discountPrice5Ref = useRef("");

  const color1NameRef = useRef("");
  const color1HexRef = useRef("");
  const color1ImageRef = useRef("");

  const color2NameRef = useRef("");
  const color2HexRef = useRef("");
  const color2ImageRef = useRef("");

  const color3NameRef = useRef("");
  const color3HexRef = useRef("");
  const color3ImageRef = useRef("");

  const color4NameRef = useRef("");
  const color4HexRef = useRef("");
  const color4ImageRef = useRef("");

  const color5NameRef = useRef("");
  const color5HexRef = useRef("");
  const color5ImageRef = useRef("");
  useEffect(() => {
    
    let found;
    {
      const docRef = doc(db, "products", phoneId);
      getDoc(docRef).then((doc) => {
        found = doc.data();

        setPhone(found);
      });
    }
  }, [setPhone, phoneId]);


  const submitHandler = (e) =>{
    e.preventDefault()
    setDisable(true)
    setAlert(true)
    const phoneToUpdate = {
        // id: modelRef.current.value.replace(/\s/g, "-"),
        // date: new Date(),
        // serverDate: serverTimestamp(),
        // brand: brandRef.current.value,
        // model: modelRef.current.value,
        // threeDModel:threeD,
        rating:{ 
          overall: 10,
          numRatings:3
        },
        // type: typeRef.current.value,
        ram: ramRef.current.value,
        waranty: warantyRef.current.value,
        // storageOrCase: storageOrCaseRef.current.value,
        storage: {
          storage1: {
            storage: storage1Ref.current.value,
            price: price1Ref.current.value,
            discountPrice:discountPrice1Ref.current.value
          },
          storage2: {
            storage: storage2Ref.current.value,
            price: price2Ref.current.value,
            discountPrice:discountPrice2Ref.current.value

          },
          storage3: {
            storage: storage3Ref.current.value,
            price: price3Ref.current.value,
            discountPrice:discountPrice3Ref.current.value

          },
          storage4: {
            storage: storage4Ref.current.value,
            price: price4Ref.current.value,
            discountPrice:discountPrice4Ref.current.value

          },
          storage5: {
            storage: storage5Ref.current.value,
            price: price5Ref.current.value,
            discountPrice:discountPrice5Ref.current.value
          },
        },
        colors: {
          color1: {
            name: color1NameRef.current.value,
            hex: color1HexRef.current.value,
            image: color1ImageRef.current.value,
          },
          color2: {
            name: color2NameRef.current.value,
            hex: color2HexRef.current.value,
            image: color2ImageRef.current.value,
          },
          color3: {
            name: color3NameRef.current.value,
            hex: color3HexRef.current.value,
            image: color3ImageRef.current.value,
          },
          color4: {
            name: color4NameRef.current.value,
            hex: color4HexRef.current.value,
            image: color4ImageRef.current.value,
          },
          color5: {
            name: color5NameRef.current.value,
            hex: color5HexRef.current.value,
            image: color5ImageRef.current.value,
          },
        },
      };

      updateDoc(doc(db, 'products',phoneId), {
            ...phoneToUpdate
          }).then(()=>{
         setPhone(null)
          });
  }

  return (
    <>
    {authCtx.user ? <div>
      <h1>Edit Phone</h1>

      <SnackBar
        color={"rgba(75, 183, 75, .8)"}
        message="Edited phone successfully"
        handleClose={handleClose}
        alert={alert}
        icon={<CheckIcon />}
      />
      <form onSubmit={submitHandler}>
      
        <InputForm
          value={phone?.brand}
          title="Brand"
          type="text"
          ref={brandRef}
        />
        <InputForm
          value={phone?.model}
          title="Model"
          type="text"
          ref={modelRef}
        />
        <label>Type:</label>
        <select value={phone?.type} ref={typeRef}>
          <option value="Phone">Phone</option>
          <option value="Tablet">Tablet</option>
          <option value="Accessories">Accessories</option>
          <option value="Smartwatch">Smartwatch</option>
        </select>
        <InputForm value={phone?.ram} title="Ram" type="text" ref={ramRef} />
        <InputForm
          value={phone?.waranty}
          title="Waranty"
          type="text"
          ref={warantyRef}
        />
        <br />
        <div>
          <label>Storage or Case Size:</label>
          <select value={phone?.storageOrCase} ref={storageOrCaseRef}>
            <option value="Storage">Storage</option>
            <option value="Case">Case</option>
          </select>
          <br />
          <InputForm
            value={phone?.storage?.storage1?.storage}
            title="Storage 1"
            type="text"
            ref={storage1Ref}
          />
          <InputForm
            value={phone?.storage?.storage2?.storage}
            title="Storage 2"
            type="text"
            ref={storage2Ref}
          />
          <InputForm
            value={phone?.storage?.storage3?.storage}
            title="Storage 3"
            type="text"
            ref={storage3Ref}
          />
          <InputForm
            value={phone?.storage?.storage4?.storage}
            title="Storage 4"
            type="text"
            ref={storage4Ref}
          />
          <InputForm
            value={phone?.storage?.storage5?.storage}
            title="Storage 5"
            type="text"
            ref={storage5Ref}
          />
        </div>
        <br />
        <div>
          <InputForm
            value={phone?.storage?.storage1?.price}
            title="Price 1"
            type="number"
            ref={price1Ref}
          />
          <InputForm
            value={phone?.storage?.storage2?.price}
            title="Price 2"
            type="number"
            ref={price2Ref}
          />
          <InputForm
            value={phone?.storage?.storage3?.price}
            title="Price 3"
            type="number"
            ref={price3Ref}
          />
          <InputForm
            value={phone?.storage?.storage4?.price}
            title="Price 4"
            type="number"
            ref={price4Ref}
          />
          <InputForm
            value={phone?.storage?.storage5?.price}
            title="Price 5"
            type="number"
            ref={price5Ref}
          />
        </div>
        <br />
        <div>
          <InputForm
          value={phone?.storage?.storage1?.discountPrice}
            title="Discount Price 1"
            type="number"
            ref={discountPrice1Ref}
          />
          <InputForm
          value={phone?.storage?.storage2?.discountPrice}
            title="Discount Price 2"
            type="number"
            ref={discountPrice2Ref}
          />
          <InputForm
          value={phone?.storage?.storage3?.discountPrice}
            title="Discount Price 3"
            type="number"
            ref={discountPrice3Ref}
          />
          <InputForm
          value={phone?.storage?.storage4?.discountPrice}
            title="Discount Price 4"
            type="number"
            ref={discountPrice4Ref}
          />
          <InputForm
          value={phone?.storage?.storage5?.discountPrice}
            title="Discount Price 5"
            type="number"
            ref={discountPrice5Ref}
          />
        </div>
        <br />
        <div>
          <label>Colors</label>
          <br />
          <label>Color 1</label>
          <InputForm
            value={phone?.colors?.color1?.name}
            title="Name"
            type="text"
            ref={color1NameRef}
          />
          <InputForm
            value={phone?.colors?.color1?.hex}
            title="Hex"
            type="text"
            ref={color1HexRef}
          />
          <InputForm
            value={phone?.colors?.color1?.image}
            title="Image Url"
            type="text"
            ref={color1ImageRef}
          />
          <br />
          <label>Color 2</label>
          <InputForm
            value={phone?.colors?.color2?.name}
            title="Name"
            type="text"
            ref={color2NameRef}
          />
          <InputForm
            value={phone?.colors?.color2?.hex}
            title="Hex"
            type="text"
            ref={color2HexRef}
          />
          <InputForm
            value={phone?.colors?.color2?.image}
            title="Image Url"
            type="text"
            ref={color2ImageRef}
          />
          <br />
          <label>Color 3</label>
          <InputForm
            value={phone?.colors?.color3?.name}
            title="Name"
            type="text"
            ref={color3NameRef}
          />
          <InputForm
            value={phone?.colors?.color3?.hex}
            title="Hex"
            type="text"
            ref={color3HexRef}
          />
          <InputForm
            value={phone?.colors?.color3?.image}
            title="Image Url"
            type="text"
            ref={color3ImageRef}
          />
          <br />
          <label>Color 4</label>
          <InputForm
            value={phone?.colors?.color4?.name}
            title="Name"
            type="text"
            ref={color4NameRef}
          />
          <InputForm
            value={phone?.colors?.color4?.hex}
            title="Hex"
            type="text"
            ref={color4HexRef}
          />
          <InputForm
            value={phone?.colors?.color4?.image}
            title="Image Url"
            type="text"
            ref={color4ImageRef}
          />
          <br />
          <label>Color 5</label>
          <InputForm
            value={phone?.colors?.color5?.name}
            title="Name"
            type="text"
            ref={color5NameRef}
          />
          <InputForm
            value={phone?.colors?.color5?.hex}
            title="Hex"
            type="text"
            ref={color5HexRef}
          />
          <InputForm
            value={phone?.colors?.color5?.image}
            title="Image Url"
            type="text"
            ref={color5ImageRef}
          />
          <br />
          {/* <input
              accept="*"
              type="file"
              onChange={(e) => {
                uploadImage(e.target.files[0]);
              }}
            /> */}
        </div>

        <button disabled={disable} type="submit">Edit Phone</button>
      </form>
    </div> : <Link to={'/login'}>Please login first</Link>}
    </>
  );
};

export default EditPhone;
