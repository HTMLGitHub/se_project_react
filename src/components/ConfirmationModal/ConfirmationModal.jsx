import "./ConfirmationModal.css";
import React from "react";
import PropTypes from "prop-types";
import closeIcon from "../../assets/close.png";

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (isOpen) {
    return (
      <div className="modal__container_confirmation">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeIcon} alt="close" className="modal__close-icon" />
          </button>
          <p className="modal__confirmation_caption">
            Are you sure you want to delete this item?
            <br />
            (This action is irreversible!)
          </p>
          <button
            type="button"
            className="modal__confirmation_delete"
            onClick={onConfirm}>
            Yes, Delete Item
          </button>
          <button
            type="button"
            className="modal__confirmation_cancel"
            onClick={onClose}>
            Cancel
          </button>
        </div>
    );
  }
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
