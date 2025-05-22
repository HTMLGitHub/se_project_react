import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import CurrentUserContext from "../../../Contexts/CurrentUserContext.js";
import React from "react";
import PropTypes from 'prop-types';

export default function ClothesSection({clothingItems, handleAddClick, onCardClick, onCardLike}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = currentUser._id ?
    clothingItems.filter((item) => item.owner === currentUser._id) :
    [];

  return (
    <div className="clothesSection">
      <div className="clothesSection__topper">
        <p className="topper__text">Your Items</p>
        <button className="topper__button" onClick={handleAddClick}>+ Add New</button>
      </div>

      {userItems.length > 0 ? (
        <ul className="clothesSection__list">
        {userItems.map((card) => (
          <ItemCard
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
        </ul>
      ) : (
        <div className="clothesSection__empty">
          <p className="empty__text">You have no items yet</p>
        </div>
      )}
    </div>
)};

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};
