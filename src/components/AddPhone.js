import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "./addPhone/InputForm";

const AddPhone = () => {
  const brandRef = useRef("");
  const modelRef = useRef("");
  const typeRef = useRef("");
  const ramRef = useRef("");
  const warantyRef = useRef("");
  const storageOrCaseRef = useRef("");

  const storageRef64GB = useRef("");
  const storageRef128GB = useRef("");
  const storageRef256GB = useRef("");
  const storageRef512GB = useRef("");
  const storageRef1TB = useRef("");

  const price64GBRef = useRef("");
  const price128GBRef = useRef("");
  const price256GBRef = useRef("");
  const price512GBRef = useRef("");
  const price1TBRef = useRef("");

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

  let navigate = useNavigate();

  async function addPhoneHandler(phon) {
    const response = await fetch(
      "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/phones.json",
      {
        method: "POST",
        body: JSON.stringify(phon),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const phone = {
      date: new Date(),
      brand: brandRef.current.value,
      model: modelRef.current.value,
      type: typeRef.current.value,
      ram: ramRef.current.value,
      waranty: warantyRef.current.value,
      storageOrCase: storageOrCaseRef.current.value,
      storage: {
        storage64GB: storageRef64GB.current.value,
        storage128GB: storageRef128GB.current.value,
        storage256GB: storageRef256GB.current.value,
        storage512GB: storageRef512GB.current.value,
        storage1TB: storageRef1TB.current.value,
      },
      price: {
        price64GB: price64GBRef.current.value,
        price128GB: price128GBRef.current.value,
        price256GB: price256GBRef.current.value,
        price512GB: price512GBRef.current.value,
        price1TB: price1TBRef.current.value,
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
          <InputForm title="Storage 1" type="text" ref={storageRef64GB} />
          <InputForm title="Storage 2" type="text" ref={storageRef128GB} />
          <InputForm title="Storage 3" type="text" ref={storageRef256GB} />
          <InputForm title="Storage 4" type="text" ref={storageRef512GB} />
          <InputForm title="Storage 5" type="text" ref={storageRef1TB} />
        </div>
        <br />
        <div>
          <InputForm title="Price 1" type="number" ref={price64GBRef} />
          <InputForm title="Price 2" type="number" ref={price128GBRef} />
          <InputForm title="Price 3" type="number" ref={price256GBRef} />
          <InputForm title="Price 4" type="number" ref={price512GBRef} />
          <InputForm title="Price 5" type="number" ref={price1TBRef} />
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
