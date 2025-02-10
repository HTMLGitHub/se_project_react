import React from "react";
import "./ModalWithForm.css";
import PropTypes from "prop-types";
import Modal from "../Modal";

export default function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  closeActiveModal,
  onSubmit,
  isFormValid,
}) {
  return activeModal === "add-garment" ? (
    <Modal name={activeModal} onClose={closeActiveModal}>
      <h2 className="modal__title">{title}</h2>
          <form onSubmit={onSubmit} className="modal__form">
            {children}
            <button
              type="submit"
              className="modal__submit"
              disabled={!isFormValid}
            >
              {buttonText}
            </button>
          </form>
    </Modal>
  ) : null;
}

ModalWithForm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  activeModal: PropTypes.string.isRequired,
  closeActiveModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
};
