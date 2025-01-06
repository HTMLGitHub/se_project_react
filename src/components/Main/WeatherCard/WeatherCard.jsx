import "./WeatherCard.css";
import { weatherConditions } from "../../../utils/constants";

export default function WeatherCard({ weatherData }) {
  const weatherCondition = weatherConditions.filter((condition) => {
            return (
            condition.condition === weatherData.condition &&
            condition.day === weatherData.isDay
            );
        }
    );

   return (
    <div className="weathercard__container">
      <p className="weathercard__tempature">{weatherData.temp.F}&deg;&nbsp;F</p>{" "}
      <img src={weatherCondition[0]?.url} alt={weatherData.condition} className="weathercard__image" />
    </div>
  );
}