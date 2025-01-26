import React, { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import PropTypes from "prop-types";

export default function AddItemModal({ closeActiveModal, activeModal, onAddItemModal }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  useEffect(()=> {
    if(activeModal==="add-garment") {
      setName("");
      imageUrl("");
      weatherType("");
    }
  },[activeModal]);

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Update the clothingItems array
    onAddItemModal({name, imageUrl, weatherType});

    // clear the inputs (reset them)
    setName("");
    setImageUrl("");
    setWeatherType("");
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      activeModal={activeModal}
      modalName="add-garment"
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input modal__input_type_name"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </label>

      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input modal__input_type_url"
          id="imageURL"
          placeholder="Image URL"
          required
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <div className="modal__radio-button">
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input 
              type="radio" 
              name="weather" 
              id="hot" 
              value="hot" 
              checked = {weatherType === "hot"}
              onChange={handleWeatherTypeChange}/>
            Hot
          </label>
        </div>
        <div className="modal__radio-button">
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" name="weather" id="warm" value="warm" checked = {weatherType === "warm"} onChange={handleWeatherTypeChange}/>
            Warm
          </label>
        </div>
        <div className="modal__radio-button">
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" name="weather" id="cold" value="cold" checked = {weatherType === "cold"} onChange={handleWeatherTypeChange}/>
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

AddItemModal.propTypes = {
  closeActiveModal: PropTypes.func.isRequired,
  activeModal: PropTypes.string.isRequired,
  onAddItemModal: PropTypes.func.isRequired,
};
