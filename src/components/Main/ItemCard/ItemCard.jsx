import React from "react";
import PropTypes from "prop-types";
import "./ItemCard.css";

export default function ItemCard({ card, onCardClick }) {
  return (
    <li className="itemcard__container">
      <h2 className="itemcard__name">{card.name}</h2>
      <img
        onClick={() => {
          onCardClick(card);
        }}
        className="itemcard__image"
        src={card.link}
        alt={card.name}
      />
    </li>
  )
}

ItemCard.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};
