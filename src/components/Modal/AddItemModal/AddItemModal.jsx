import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import PropTypes from "prop-types";

export default function AddItemModal({
  closeActiveModal,
  activeModal,
  onAddItemModal,
  isSaving,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [weatherTypeError, setWeatherTypeError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (activeModal === "add-garment") {
      setName("");
      setImageUrl("");
      setWeatherType("");
      setNameError("");
      setImageUrlError("");
      setWeatherTypeError("");
      setIsFormValid(false);
    }
  }, [activeModal]);

  useEffect(() => {
    validateForm();
  }, [name, imageUrl, weatherType]);

  const validateForm = () => {
    let isValid = true;

    if (name.length < 3 || name.length > 30) {
      setNameError("(Name must be between 3 and 30 characters)");
      isValid = false;
    } else {
      setNameError("");
    }

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator
    );

    if (!urlPattern.test(imageUrl)) {
      setImageUrlError("(Please enter a valid URL)");
      isValid = false;
    } else {
      setImageUrlError("");
    }

    if (weatherType === "") {
      setWeatherTypeError("(No weather type selected)");
      isValid = false;
    } else {
      setWeatherTypeError("");
    }

    setIsFormValid(isValid);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Update the clothingItems array
    if (isFormValid) {
      onAddItemModal({ name, imageUrl, weatherType });
    }
  };

  return (
    <ModalWithForm
        title="New Garment"
        buttonText={isSaving ? "Saving..." : "Save"}
        activeModal={activeModal}
        modalName="add-garment"
        closeActiveModal={closeActiveModal}
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <label
          htmlFor="name"
          className={`modal__label ${nameError ? "modal__label_error" : ""}`}
        >
          Name {nameError && <span>{nameError}</span>}
          <input
            type="text"
            className="modal__input modal__input_type_name"
            id="name"
            placeholder="Name"
            required
            minLength="3"
            maxLength="30"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>

        <label
          htmlFor="imageURL"
          className={`modal__label ${
            imageUrlError ? "modal__label_error" : ""
          }`}
        >
          Image {imageUrlError && <span>{imageUrlError}</span>}
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
          <legend
            className={`modal__legend" ${
              weatherTypeError ? "modal__label_error" : ""
            }`}
          >
            Select the weather type{" "}
            {weatherTypeError && <span>{weatherTypeError}</span>}
          </legend>
          <div className="modal__radio-button">
            <label
              htmlFor="hot"
              className={`modal__label modal__label_type_radio ${
                weatherType === "hot" ? "modal__button_checked" : ""
              }`}
            >
              <input
                className="modal__input_radio_button"
                type="radio"
                name="weather"
                id="hot"
                value="hot"
                checked={weatherType === "hot"}
                onChange={handleWeatherTypeChange}
              />
              Hot
            </label>
          </div>
          <div className="modal__radio-button">
            <label
              htmlFor="warm"
              className={`modal__label modal__label_type_radio ${
                weatherType === "warm" ? "modal__button_checked" : ""
              }`}
            >
              <input
                className="modal__input_radio_button"
                type="radio"
                name="weather"
                id="warm"
                value="warm"
                checked={weatherType === "warm"}
                onChange={handleWeatherTypeChange}
              />
              Warm
            </label>
          </div>
          <div className="modal__radio-button">
            <label
              htmlFor="cold"
              className={`modal__label modal__label_type_radio ${
                weatherType === "cold" ? "modal__button_checked" : ""
              }`}
            >
              <input
                className="modal__input_radio_button"
                type="radio"
                name="weather"
                id="cold"
                value="cold"
                checked={weatherType === "cold"}
                onChange={handleWeatherTypeChange}
              />
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
  isSaving: PropTypes.bool.isRequired,
};
