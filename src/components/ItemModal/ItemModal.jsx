import React from "react";
import PropTypes from "prop-types";
import "./ItemModal.css";
import closeIcon from "../../assets/close.png";

export default function ItemModal({ activeModal, card, closeActiveModal }) {
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

        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  )
}

ItemModal.propTypes = {
  activeModal: PropTypes.string.isRequired,
  card: PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
  }).isRequired,
  closeActiveModal: PropTypes.func.isRequired,
};
