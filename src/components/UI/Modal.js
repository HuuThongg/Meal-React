import React from "react";
import  ReactDOM  from "react-dom";

import classes from './Modal.module.css'

const Backdrop = props =>{
  return <div className={classes.backdrop}></div>
}
const ModalOverlay = props =>{
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays')
const Modal = props =>{

  return (
    <>
      {/* <Backdrop></Backdrop>
      <ModalOverlay>{props.children}</ModalOverlay> */}
      {ReactDOM.createPortal(<Backdrop></Backdrop>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  )
  
}
export default Modal;