import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";





const AddPhone = () => {
  const brandRef = useRef("");
  const modelRef = useRef("");
  const typeRef = useRef("");
  const imageRef = useRef("");
  const ramRef = useRef("");
  const warantyRef =useRef('')

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
      image: imageRef.current.value,
      ram: ramRef.current.value,
      waranty: warantyRef.current.value,
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
          <label htmlFor="ram">Ram</label>
          <input type="text" id="ram" ref={ramRef} />
        </div>
        <div>
          <label htmlFor="waranty">Waranty</label>
          <input type="text" id="waranty" ref={warantyRef} />
        </div>
        <div>
          <label htmlFor="storage">Storage:</label>
          <br/>
          <span>Storage 1</span>
          <input type="text" id="storage" ref={storageRef64GB} />
          <span>Storage 2</span>
          <input type="text" id="storage" ref={storageRef128GB} />
          <span>Storage 3</span>
          <input type="text" id="storage" ref={storageRef256GB} />
          <span>Storage 4</span>
          <input type="text" id="storage" ref={storageRef512GB} />
          <span>Storage 5</span>
          <input type="text" id="storage" ref={storageRef1TB} />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" ref={price64GBRef} />
          <span>Price 1</span>
          <input type="number" id="price" ref={price128GBRef} />
          <span>Price 2</span>
          <input type="number" id="price" ref={price256GBRef} />
          <span>Price 3</span>
          <input type="number" id="price" ref={price512GBRef} />
          <span>Price 4</span>
          <input type="number" id="price" ref={price1TBRef} />
          <span>Price 5</span>
        </div>
        <br />
        <div>
          <label>Colors</label>
          <br />
          <label>Color 1</label>
          <label>Name</label>
          <input type="text" ref={color1NameRef} />
          <label>Hex</label>
          <input type="text" ref={color1HexRef} />
          <label>Image Url</label>
          <input type="text" ref={color1ImageRef} />
          <br />
          <label>Color 2</label>
          <label>Name</label>
          <input type="text" ref={color2NameRef} />
          <label>Hex</label>
          <input type="text" ref={color2HexRef} />
          <label>Image Url</label>
          <input type="text" ref={color2ImageRef} />
          <br />
          <label>Color 3</label>
          <label>Name</label>
          <input type="text" ref={color3NameRef} />
          <label>Hex</label>
          <input type="text" ref={color3HexRef} />
          <label>Image Url</label>
          <input type="text" ref={color3ImageRef} />
          <br />
          <label>Color 4</label>
          <label>Name</label>
          <input type="text" ref={color4NameRef} />
          <label>Hex</label>
          <input type="text" ref={color4HexRef} />
          <label>Image Url</label>
          <input type="text" ref={color4ImageRef} />
          <br />
          <label>Color 5</label>
          <label>Name</label>
          <input type="text" ref={color5NameRef} />
          <label>Hex</label>
          <input type="text" ref={color5HexRef} />
          <label>Image Url</label>
          <input type="text" ref={color5ImageRef} />
        </div>
        <button type="submit">Add Phone</button>
      </form>
    </Fragment>
  );
};

export default AddPhone;

