import React from "react";
import "./WeatherCard.css";
import { useContext } from "react";
import PropTypes from "prop-types";
import { weatherConditions } from "../../../utils/constants";
import CurrentTemperatureUnitContext from "../../../Contexts/CurrentTemperatureUnitContext";

export default function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherCondition = weatherConditions.filter((condition) => {
    return (
      condition.condition.includes(weatherData.condition) &&
      condition.day === weatherData.isDay
    );
  });

  WeatherCard.propTypes = {
    weatherData: PropTypes.shape({
      condition: PropTypes.string.isRequired,
      isDay: PropTypes.bool.isRequired,
      temp: PropTypes.objectOf(PropTypes.number).isRequired,
    }).isRequired,
  };

   return (
    <div className="weathercard__container">
      <p className="weathercard__tempature">{weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}</p>{" "}
      <img src={weatherCondition[0]?.url} alt={weatherData.condition} className="weathercard__image" />
    </div>
  );
}