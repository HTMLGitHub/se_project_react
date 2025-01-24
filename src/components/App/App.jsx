import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import { coordinates, apiKey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

export default function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    description: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevTemp) => (prevTemp === "F" ? "C" : "F"));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </CurrentTemperatureUnitContext.Provider>

        <Footer />
      </div>
      <AddItemModal
        closeActiveModal={closeActiveModal}
        activeModal={activeModal}
      />

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
    </div>
  );
}
