import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants.js";

export default function Main({ weatherData, handleCardClick }) {
  return (
    <main className="main__content">
      <WeatherCard weatherData={weatherData}/>
      <section className="main__container">
        <p className="main__text">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
        <ul className="main__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((card) => {
              return <ItemCard key={card._id} card={card} onCardClick={handleCardClick} />;
            })}
        </ul>
      </section>
    </main>
  );
}
