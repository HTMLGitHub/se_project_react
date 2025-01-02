import { act, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

export default function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => { 
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick}/>
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>

        <label htmlFor="imageURL" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <div className="modal__radio-button">
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" name="weather" id="hot" value="Hot" />
              Hot
            </label>
          </div>
          <div className="modal__radio-button">
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" name="weather" id="warm" value="Warm" />
              Warm
            </label>
          </div>
          <div className="modal__radio-button">
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" name="weather" id="cold" value="Cold" />
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>

      <ItemModal activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal}/>
    </div>
  );
}
