import React from 'react';
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.png";
import PropTypes from 'prop-types';

export default function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  modalName,
  closeActiveModal,
  onSubmit,
}) {
  
  return (
    <div className={`modal ${activeModal === modalName ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="close" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

ModalWithForm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  activeModal: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  closeActiveModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

