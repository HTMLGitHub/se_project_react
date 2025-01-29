import React from 'react';
import PropTypes from 'prop-types';
import ClothesSection from './ClothesSection/ClothesSection';
import './Profile.css';
import Sidebar from './Sidebar/Sidebar';

export default function Profile ({clothingItems, handleAddClick}) {
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <Sidebar/>
            </section>
            <section className="profile__clothesSection">
                <ClothesSection clothingItems={clothingItems} handleAddClick={handleAddClick}/>
            </section>
        </div>
    );
};

Profile.propTypes = {
    clothingItems: PropTypes.array.isRequired,
    handleAddClick: PropTypes.func.isRequired,
};