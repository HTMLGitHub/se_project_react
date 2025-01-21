import "./ClothesSection.css";
import { defaultClothingItems } from "../../../utils/constants";
import ItemCard from "../../Main/ItemCard/ItemCard";

import React from "react";

export default function ClothesSection() {
  return (
    <div className="clothesSection">
      <div className="clothesSection__topper">
        <p className="topper__text">Your Items</p>
        <button className="topper__button">+ Add New</button>
      </div>

      <ul className="clothesSection__list">
        {defaultClothingItems.map((card) => {
          return (
            <ItemCard
              key={card._id}
              card={card}

              //onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
