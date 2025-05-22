import React, {useContext} from "react";
import PropTypes from "prop-types";
import "./ItemModal.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Modal from "../Modal";
import CurrentUserContext from "../../../Contexts/CurrentUserContext";
export default function ItemModal({
  activeModal,
  card,
  closeActiveModal,
  onDeleteItem,
}) {
  const [confirmationModalName, setConfirmationModalName] = React.useState("");

  const handleDeleteClick = () => {
    setConfirmationModalName("confirmation");
  };

  const handleDeleteItem = () => {
    onDeleteItem(card._id);
    setConfirmationModalName("");
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalName("");
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;

  return activeModal==="preview" ? (
    <Modal name={activeModal} onClose={closeActiveModal}>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
      {isOwner && (
        <button
          type="button"
          className="modal__delete-button"
          onClick={handleDeleteClick}
        >
          Delete Item
        </button>
      )}
      {confirmationModalName !== "" && (
        <ConfirmationModal
          name={confirmationModalName}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleDeleteItem}
        />
      )}
    </Modal>
  ) : null;
}

ItemModal.propTypes = {
  activeModal: PropTypes.string.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    weather: PropTypes.string,
  }),
  closeActiveModal: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};
