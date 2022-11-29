import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "./addPhone/InputForm";
import { db } from "./firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const AddPhone = () => {
  const navigate = useNavigate();

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

  async function addPhoneHandler(product) {
    setDoc(doc(db, "products", product.model.replace(/\s/g, "-")), {
      ...product,
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const phone = {
      id: modelRef.current.value.replace(/\s/g, "-"),
      date: new Date(),
      serverDate: serverTimestamp(),
      brand: brandRef.current.value,
      model: modelRef.current.value,
      type: typeRef.current.value,
      ram: ramRef.current.value,
      waranty: warantyRef.current.value,
      storageOrCase: storageOrCaseRef.current.value,
      storage: {
        storage1: {
          storage: storage1Ref.current.value,
          price: price1Ref.current.value,
        },
        storage2: {
          storage: storage2Ref.current.value,
          price: price2Ref.current.value,
        },
        storage3: {
          storage: storage3Ref.current.value,
          price: price3Ref.current.value,
        },
        storage4: {
          storage: storage4Ref.current.value,
          price: price4Ref.current.value,
        },
        storage5: {
          storage: storage5Ref.current.value,
          price: price5Ref.current.value,
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

    addPhoneHandler(phone);
    navigate("/phones", { replace: true });
  };
  return (
    <div>
      <h1>Add Phone</h1>
      <form onSubmit={submitHandler}>
        <InputForm title="Brand" type="text" ref={brandRef} />
        <InputForm title="Model" type="text" ref={modelRef} />
        <label>Type:</label>
        <select ref={typeRef}>
          <option value="Phone">Phone</option>
          <option value="Tablet">Tablet</option>
          <option value="Accessories">Accessories</option>
          <option value="Smartwatch">Smartwatch</option>
        </select>
        <InputForm title="Ram" type="text" ref={ramRef} />
        <InputForm title="Waranty" type="text" ref={warantyRef} />
        <br />
        <div>
          <label>Storage or Case Size:</label>
          <select ref={storageOrCaseRef}>
            <option value="Storage">Storage</option>
            <option value="Case">Case</option>
          </select>
          <br />
          <InputForm title="Storage 1" type="text" ref={storage1Ref} />
          <InputForm title="Storage 2" type="text" ref={storage2Ref} />
          <InputForm title="Storage 3" type="text" ref={storage3Ref} />
          <InputForm title="Storage 4" type="text" ref={storage4Ref} />
          <InputForm title="Storage 5" type="text" ref={storage5Ref} />
        </div>
        <br />
        <div>
          <InputForm title="Price 1" type="number" ref={price1Ref} />
          <InputForm title="Price 2" type="number" ref={price2Ref} />
          <InputForm title="Price 3" type="number" ref={price3Ref} />
          <InputForm title="Price 4" type="number" ref={price4Ref} />
          <InputForm title="Price 5" type="number" ref={price5Ref} />
        </div>
        <br />
        <div>
          <label>Colors</label>
          <br />
          <label>Color 1</label>
          <InputForm title="Name" type="text" ref={color1NameRef} />
          <InputForm title="Hex" type="text" ref={color1HexRef} />
          <InputForm title="Image Url" type="text" ref={color1ImageRef} />
          <br />
          <label>Color 2</label>
          <InputForm title="Name" type="text" ref={color2NameRef} />
          <InputForm title="Hex" type="text" ref={color2HexRef} />
          <InputForm title="Image Url" type="text" ref={color2ImageRef} />
          <br />
          <label>Color 3</label>
          <InputForm title="Name" type="text" ref={color3NameRef} />
          <InputForm title="Hex" type="text" ref={color3HexRef} />
          <InputForm title="Image Url" type="text" ref={color3ImageRef} />
          <br />
          <label>Color 4</label>
          <InputForm title="Name" type="text" ref={color4NameRef} />
          <InputForm title="Hex" type="text" ref={color4HexRef} />
          <InputForm title="Image Url" type="text" ref={color4ImageRef} />
          <br />
          <label>Color 5</label>
          <InputForm title="Name" type="text" ref={color5NameRef} />
          <InputForm title="Hex" type="text" ref={color5HexRef} />
          <InputForm title="Image Url" type="text" ref={color5ImageRef} />
          <br />
        </div>
        <button type="submit">Add Phone</button>
      </form>
    </div>
  );
};

export default AddPhone;
