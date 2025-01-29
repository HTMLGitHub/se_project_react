import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";

import React from "react";
import PropTypes from 'prop-types';

export default function ClothesSection({clothingItems, handleAddClick}) {
  return (
    <div className="clothesSection">
      <div className="clothesSection__topper">
        <p className="topper__text">Your Items</p>
        <button className="topper__button" onClick={handleAddClick}>+ Add New</button>
      </div>

      <ul className="clothesSection__list">
        {clothingItems.map((card) => {
          return (
            <ItemCard
              key={card._id}
              card={card}
            />
          );
        })}
      </ul>
    </div>
)};

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ClothesSection.propTypes = {
  clothingItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddClick: PropTypes.func.isRequired,
};
