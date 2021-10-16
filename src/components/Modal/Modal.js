/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

const Modal = forwardRef(({ children }, ref) => {
  const [modalController, setModalController] = useState(false);

  const closeModal = () => {
    setModalController(false);
  };

  const openModal = () => {
    setModalController(true);
  };

  useImperativeHandle(ref, () => {
    return { modalOpener: () => openModal(), modalCloser: () => closeModal() };
  });

  if (modalController) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-card">
            <div className="white-area-top">
              <span>Teklif Ver</span>
              <button className="close-modal" onClick={() => closeModal()}>
                &times;
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
});

export default Modal;
