import React from "react";
import PropTypes from "prop-types";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";
import Sidebar from "./Sidebar/Sidebar";

export default function Profile({
  clothingItems,
  handleAddClick,
  onCardClick,
  onEditProfile,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
        <button onClick={onEditProfile} className="profile__edit-button">
          Edit Profile
        </button>
      </section>
      <section className="profile__clothesSection">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={() => {
            handleAddClick();
            onCardClick(null);
          }}
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
  onEditProfile: PropTypes.func.isRequired,
};
