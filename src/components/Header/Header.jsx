import React, {useContext} from "react";
import "./Header.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import UserIdentity from "../UserIdentity/UserIdentity";

export default function Header({ handleAddClick, handleRegisterClick, handleLoginClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__logo"></img>
      </Link>
      <div className="header__datelocation">
        {currentDate}, {weatherData.city}
      </div>

      <div className="header__left">
        <ToggleSwitch
          temperatureUnit={currentTemperatureUnit}
          handleToggle={() => setCurrentTemperatureUnit(!currentTemperatureUnit)}
        />

        {currentUser && currentUser.name && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-button">
            + Add Clothes
        </button>
        )}
      </div>

      <div className="header__right">
        {currentUser && currentUser.name ? (
          <Link to="/profile" className="header__link">
            <UserIdentity size={40} containerClass="user-identity__header"/>
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
      </div> 
    </header>
  )
}

Header.propTypes = {
  handleAddClick: PropTypes.func.isRequired,
  handleRegisterClick: PropTypes.func.isRequired,
  handleLoginClick: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
};
