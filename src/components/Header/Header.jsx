import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import Switch from "../Switch/Switch";

export default function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo"></img>
      </Link>
      <div className="header__datelocation">
        {currentDate}, {weatherData.city}
      </div>

      <Switch
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
      <div className="header__user-container">
        <Link to="/profile">
          <p className="header__user-name">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="header__user-avatar"
          ></img>
        </Link>
      </div>
    </header>
  );
}
