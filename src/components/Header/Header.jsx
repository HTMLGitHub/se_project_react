import React, {useContext} from "react";
import "./Header.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

export default function Header({ handleAddClick, handleRegisterClick, handleLoginClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const currentUser = useContext(CurrentUserContext);

  const userIniitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "?";

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

      {currentUser && currentUser.name ? (
        <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-button">
            + Add Clothes
          </button>
          <p className="header__user-name">{currentUser.name}</p>
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="header__user-avatar"
          />
          ) : (
              <div className="header__user-avatar-placeholder">
                {userIniitial}
              </div>
          )}
        </div>
        </Link>
        ) : (
        <div className="header__user-container">
          <button
            onClick={handleRegisterClick}
            type="button"
            className="header__register-button">
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__login-button">
            Log In
          </button>
        </div>
      )}      
    </header>
  )
}

Header.propTypes = {
  handleAddClick: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
};
