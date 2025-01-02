import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

export default function Header({ handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo"></img>
      <div className="header__datelocation-container">
        <div className="header__date">{currentDate}</div>
        <div className="header__location">, London, UK</div>
      </div>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__user-name">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne"
          className="header__user-avatar"
        ></img>
      </div>
    </header>
  );
}
