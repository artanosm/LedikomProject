import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddPhone = () => {
  const brandRef = useRef("");
  const modelRef = useRef("");
  const typeRef = useRef("");
  const imageRef = useRef("");

  const storageRef64GB = useRef("");
  const storageRef128GB = useRef("");
  const storageRef256GB = useRef("");
  const storageRef512GB = useRef("");
  const storageRef1TB = useRef("");

  const ramRef = useRef("");

  const price64GBRef = useRef("");
  const price128GBRef = useRef("");
  const price256GBRef = useRef("");
  const price512GBRef = useRef("");
  const price1TBRef = useRef("");

  const colorBlackRef = useRef("");
  const colorWhiteRef = useRef("");
  const colorRedRef = useRef("");
  const colorBlueRef = useRef("");
  const colorGreenRef = useRef("");
  const colorGoldRef = useRef("");
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
      image: imageRef.current.value,
      storage: {
        storage64GB: storageRef64GB.current.value,
        storage128GB: storageRef128GB.current.value,
        storage256GB: storageRef256GB.current.value,
        storage512GB: storageRef512GB.current.value,
        storage1TB: storageRef1TB.current.value,
      },
      ram: ramRef.current.value,
      price: {
        price64GB: price64GBRef.current.value,
        price128GB: price128GBRef.current.value,
        price256GB: price256GBRef.current.value,
        price512GB: price512GBRef.current.value,
        price1TB: price1TBRef.current.value,
      },
      colors: {
        black: colorBlackRef.current.value,
        white: colorWhiteRef.current.value,
        red: colorRedRef.current.value,
        blue: colorBlueRef.current.value,
        green: colorGreenRef.current.value,
        gold: colorGoldRef.current.value,
      },
    };

    console.log(phone, "phone");
    addPhoneHandler(phone);
    navigate("/phones", { replace: true });
  };

  return (
    <Fragment>
      <h1>Add Phone</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="brand">Brand</label>
          <input type="text" id="brand" ref={brandRef} />
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input type="text" id="model" ref={modelRef}></input>
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input type="text" id="type" ref={typeRef}></input>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="text" id="image" ref={imageRef}></input>
        </div>
        <div>
          <label htmlFor="storage">Storage</label>
          <input type="text" id="storage" ref={storageRef64GB} />
          <span>64GB</span>
          <input type="text" id="storage" ref={storageRef128GB} />
          <span>128GB</span>
          <input type="text" id="storage" ref={storageRef256GB} />
          <span>256GB</span>
          <input type="text" id="storage" ref={storageRef512GB} />
          <span>512GB</span>
          <input type="text" id="storage" ref={storageRef1TB} />
          <span>1TB</span>
        </div>
        <div>
          <label htmlFor="ram">Ram</label>
          <input type="text" id="ram" ref={ramRef} />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" ref={price64GBRef} />
          <span>64 GB</span>
          <input type="number" id="price" ref={price128GBRef} />
          <span>128 GB</span>
          <input type="number" id="price" ref={price256GBRef} />
          <span>256 GB</span>
          <input type="number" id="price" ref={price512GBRef} />
          <span>512 GB</span>
          <input type="number" id="price" ref={price1TBRef} />
          <span>1 TB</span>
        </div>
        <div>
          <label>Colors</label>
          <input type="text" ref={colorBlackRef} />
          <span>Black</span>
          <input type="text" ref={colorWhiteRef} />
          <span>White</span>
          <input type="text" ref={colorRedRef} />
          <span>Red</span>
          <input type="text" ref={colorBlueRef} />
          <span>Blue</span>
          <input type="text" ref={colorGreenRef} />
          <span>Green</span>
          <input type="text" ref={colorGoldRef} />
          <span>Gold</span>
        </div>
        <button type="submit">Add Phone</button>
      </form>
    </Fragment>
  );
};

export default AddPhone;
