import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { v4 } from 'uuid';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { coordinates, apiKey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../Modal/AddItemModal/AddItemModal";
import ItemModal from "../Modal/ItemModal/ItemModal";
import { addItem, deleteItem, getItems } from "../../utils/api";
import * as auth from "../../utils/auth";

export default function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    description: "",
    condition: "",
    isDay: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleAddItemModal = ({ name, imageUrl, weatherType }) => {
    setIsSaving(true);

    const newID = v4();

    addItem({ _id: newID, name, weather: weatherType, imageUrl})
      .then(() => {
        setClothingItems((oldClothes) => [
          { _id: newID, name: name, weather: weatherType, imageUrl: imageUrl },
          ...oldClothes
        ]);
        setIsSaving(false);
        // close the modal
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    if(!card)return;
    
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevTemp) => (prevTemp === "F" ? "C" : "F"));
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((oldClothes) =>
          oldClothes.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData({
          ...filteredData,
          temp: {
            F: Number(filteredData.temp.F),
            C: Number(filteredData.temp.C),
          },
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  onCardClick={handleCardClick}
                />
              }
            />
          </Routes>
        </CurrentTemperatureUnitContext.Provider>

        <Footer />
      </div>
      <AddItemModal
        closeActiveModal={closeActiveModal}
        activeModal={activeModal}
        onAddItemModal={handleAddItemModal}
        isSaving={isSaving}
      />

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}
