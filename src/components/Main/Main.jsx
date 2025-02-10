import React from "react";
import PropTypes from "prop-types";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import { useContext } from "react";
import ItemCard from "./ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext.js";

export default function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main__content">
      <WeatherCard weatherData={weatherData} />
      <section className="main__container">
        <p className="main__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="main__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((card) => {
              return (
                <ItemCard
                  key={card._id}
                  card={card}
                  onCardClick={() => {
                    onCardClick(card);
                  }}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  weatherData: PropTypes.shape({
    temp: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      weather: PropTypes.string.isRequired,
    })
  ).isRequired,
};
