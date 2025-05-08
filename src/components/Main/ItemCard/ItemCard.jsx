import React from "react";
import PropTypes from "prop-types";
import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../Contexts/CurrentUserContext.js";

export default function ItemCard({ card, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.includes(currentUser._id);
  const cardLikeButton = `itemcard__like-button ${
    isLiked ? "itemcard__like-button_active" : ""
  }`;

  function handleLike() {
    onCardLike({_id: card._id, isLiked});
  }

  return (
    <li className="itemcard__container">
      <div className="itemcard__header">
        <h2 className="itemcard__name">{card.name}</h2>
        {currentUser._id && (
          <button
            className={cardLikeButton}
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          ></button>
        )}
      </div>
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
  onCardLike: PropTypes.func.isRequired,
};
