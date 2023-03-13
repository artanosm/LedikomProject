import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
   
      <div
        className={classes.backdrop}
        onClick={props.onClose}
      ></div>
  );
};
const ModalOverlay = (props) => {
  const sum = window.pageYOffset + 50;
  const marginTop = sum.toString().concat("px");

  return (
<div
  
        style={{ top: marginTop }}
        className={classes.modal}
      >
        <div className={classes.content}>{props.children}</div>
    </div>

  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  // props.cartIsShown && (window.document.body.style.overflow = "hidden");

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
