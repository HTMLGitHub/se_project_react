import React from "react";
import PropTypes from "prop-types";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";
import Sidebar from "./Sidebar/Sidebar";

export default function Profile({
  clothingItems,
  handleAddClick,
  onCardClick,
  onCardLike,
  onEditProfile,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
        <button onClick={onEditProfile} className="profile__edit-button">
          Change profile data
        </button>

        <button 
          className="profile__logout-button"
          onClick={onSignOut}
          type="button"
          >
            Log Out
        </button>
      </section>
      <section className="profile__clothesSection">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={() => {
            handleAddClick();
            onCardClick(null);
          }}
          onCardLike={onCardLike}
          onCardClick={onCardClick}
        />
      </section>
    </div>
  );
}

Profile.propTypes = {
  clothingItems: PropTypes.array.isRequired,
  handleAddClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
