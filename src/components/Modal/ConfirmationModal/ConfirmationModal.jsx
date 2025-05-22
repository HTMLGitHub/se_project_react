import "./ConfirmationModal.css";
import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";

export default function ConfirmationModal({ name, onClose, onConfirm }) {
 return (
    <Modal name={name} onClose={onClose}>
      <p className="modal__confirmation_caption">
        Are you sure you want to delete this item?
        <br />
        (This action is irreversible!)
      </p>
      <button
        type="button"
        className="modal__confirmation_delete"
        onClick={onConfirm}
      >
        Yes, Delete Item
      </button>
      <button
        type="button"
        className="modal__confirmation_cancel"
        onClick={onClose}
      >
        Cancel
      </button>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
