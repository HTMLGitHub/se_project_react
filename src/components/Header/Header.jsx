import React from "react";
import "./Header.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__logo"></img>
      </Link>
      <div className="header__datelocation">
        {currentDate}, {weatherData.city}
      </div>

      <ToggleSwitch
        temperatureUnit={currentTemperatureUnit}
        handleToggle={() => setCurrentTemperatureUnit(!currentTemperatureUnit)}
      />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__user-name">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="header__user-avatar"
          ></img>
        </div>
      </Link>
    </header>
  )
}

Header.propTypes = {
  handleAddClick: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
};
