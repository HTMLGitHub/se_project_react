import React from "react";
import PropTypes from "prop-types";
import "./ItemModal.css";
import closeIcon from "../../assets/close.png";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function ItemModal({ activeModal, card, closeActiveModal, onDeleteItem }) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false);

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  }
  
  const handleDeleteItem = () => {
    onDeleteItem(card._id);
    setIsConfirmationModalOpen(false);
  }

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  }

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_preview">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="close" className="modal__close-icon" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button type="button" className="modal__delete_button" onClick={handleDeleteClick}>Delete Item</button>
      </div>
      {isConfirmationModalOpen && (<div className="modal__wrapper">
      <ConfirmationModal 
      isOpen={isConfirmationModalOpen} 
      onClose={handleCloseConfirmationModal} 
      onConfirm={handleDeleteItem} />
      </div>
      )}
    </div>
  );
}

ItemModal.propTypes = {
  activeModal: PropTypes.string.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    weather: PropTypes.string,
  }),
  closeActiveModal: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};
