import "./Switch.css";
import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

export default function Switch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <div className="switch">
      <input
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
        className="switch__checkbox"
        id={`switch__new`}
        type="checkbox"
      />
      <label className="switch__label" htmlFor={`switch__new`}>
        <div className={`switch__button`}>
          <span className="switch__button__text">
            {currentTemperatureUnit === "C" ? "C" : "F"}
          </span>
        </div>
        <span className={`switch__text ${currentTemperatureUnit==="C" ? "switch__text-inactive" : ""}`}>F</span>
        <span className={`switch__text ${currentTemperatureUnit==="F" ? "switch__text-inactive" : ""}`}>C</span>
      </label>
    </div>
  );
}
