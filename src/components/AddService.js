import { Fragment, useRef } from "react";
// import { realTimeDatabase } from "./firebase";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const AddService = () => {
  const brandRef = useRef("");
  const modelRef = useRef("");
  const typeRef = useRef("");
  const imageRef = useRef("");
  const screenRef = useRef();
  const backGlassRef = useRef();
  const batteryRef = useRef();
  const frontCameraRef = useRef();
  const backCameraRef = useRef();
  const speakerRef = useRef();

  let navigate = useNavigate();

  async function addPhoneHandler(service) {
    setDoc(doc(db, "service", service.model.replace(/\s/g, "-")), {
      ...service,
    });

    // const response = await fetch(
    //   `${realTimeDatabase}/service.json`,

    //   {
    //     method: "POST",
    //     body: JSON.stringify(servicePhone),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const service = {
      id: modelRef.current.value.replace(/\s/g, "-"),
      date: new Date(),
      serverDate:serverTimestamp(),
      brand: brandRef.current.value,
      model: modelRef.current.value,
      type: typeRef.current.value,
      image: imageRef.current.value,
      screen: { price: +screenRef.current.value },
      backGlass: { price: +backGlassRef.current.value },
      battery: { price: +batteryRef.current.value },
      frontCamera: { price: +frontCameraRef.current.value },
      backCamera: { price: +backCameraRef.current.value },
      speaker: { price: +speakerRef.current.value },
    };

    console.log(service, "phone");
    addPhoneHandler(service);
    navigate("/", { replace: true });
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
        <label>Type:</label>
        <select ref={typeRef}>
          <option value="Phone">Phone</option>
          <option value="Tablet">Tablet</option>
          <option value="Accessories">Accessories</option>
          <option value="Smartwatch">Smartwatch</option>
        </select>
        <div>
          <label htmlFor="image">Image</label>
          <input type="text" id="image" ref={imageRef}></input>
        </div>
        <div>
          <label htmlFor="screen">Screen</label>
          <input type="number" id="screen" ref={screenRef}></input>
          <br />
          <label htmlFor="backGlass">Back Glass</label>
          <input type="number" id="backGlass" ref={backGlassRef}></input>
          <br />
          <label htmlFor="battery">Battery</label>
          <input type="number" id="battery" ref={batteryRef}></input>
          <br />
          <label htmlFor="frontCamera">Front Camera</label>
          <input type="number" id="frontCamera" ref={frontCameraRef}></input>
          <br />
          <label htmlFor="backCamera">Back Camera</label>
          <input type="number" id="backCamera" ref={backCameraRef}></input>
          <br />
          <label htmlFor="speaker">Speaker</label>
          <input type="number" id="speaker" ref={speakerRef}></input>
          <br />
        </div>

        <button onClick={submitHandler} type="submit">
          Add Phone
        </button>
      </form>
    </Fragment>
  );
};

export default AddService;
