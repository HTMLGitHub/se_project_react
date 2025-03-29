import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import CurrentUserContext from "../../../context/CurrentUserContext";
import React from "react";
import PropTypes from 'prop-types';

export default function ClothesSection({clothingItems, handleAddClick, onCardClick}) {
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

      <ul className="clothesSection__list">
        {userItems.map((card) => {
          return (
            <ItemCard
              key={card._id}
              card={card}
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
)};

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
