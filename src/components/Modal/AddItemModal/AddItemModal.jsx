import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import PropTypes from "prop-types";
import {useFormAndValidation} from "../../../hooks/useFormAndValidation";

export default function AddItemModal({
  closeActiveModal,
  activeModal,
  onAddItemModal,
  isSaving,
}) {
  const [weatherType, setWeatherType] = useState("");
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (activeModal === "add-garment") {
      resetForm();
      setWeatherType("");
    }
  }, [activeModal]);

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Update the clothingItems array
    if (isValid && weatherType) {
      onAddItemModal({
        name: values.name,
        imageUrl: values.imageUrl,
        weatherType });
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
        isFormValid={isValid && weatherType !== ""}
      >
        <label
          htmlFor="name"
          className={`modal__label ${errors.name ? "modal__label_error" : ""}`}
        >
          Name {errors.name && <span>{errors.name}</span>}
          <input
            type="text"
            name="name"
            className="modal__input modal__input_type_name"
            id="name"
            placeholder="Name"
            required
            minLength="3"
            maxLength="30"
            onChange={handleChange}
            value={values.name || ""}
          />
        </label>

        <label
          htmlFor="imageURL"
          className={`modal__label ${
            errors.imageUrl ? "modal__label_error" : ""
          }`}
        >
          Image {errors.imageUrl && <span>{errors.imageUrl}</span>}
          <input
            type="url"
            name="imageUrl"
            className="modal__input modal__input_type_url"
            id="imageURL"
            placeholder="Image URL"
            required
            onChange={handleChange}
            value={values.imageUrl || ""}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend
            className={`modal__legend" ${
              !weatherType ? "modal__label_error" : ""
            }`}
          >
            Select the weather type{" "}
            {!weatherType && <span>(No weather type selected)</span>}
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
