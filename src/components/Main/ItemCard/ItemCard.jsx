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
        src={card.imageUrl}
        alt={card.name}
      />
    </li>
  )
}

ItemCard.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  onCardClick: PropTypes.func.isRequired,
};
