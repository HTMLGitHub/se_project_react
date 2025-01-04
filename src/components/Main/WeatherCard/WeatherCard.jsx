import "./WeatherCard.css";
import sunnyClear from "../../../assets/weather/daytime-clear.png";
import sunnyCloudy from "../../../assets/weather/daytime-cloudy.png";
import sunnyRain from "../../../assets/weather/daytime-raining.png";
import sunnySnow from "../../../assets/weather/daytime-snowing.png";
import sunnyThunderstorm from "../../../assets/weather/daytime-lightning.png";

import nightClear from "../../../assets/weather/dark-clear.png";
import nightCloudy from "../../../assets/weather/dark-cloudy.png";
import nightRain from "../../../assets/weather/dark-raining.png";
import nightSnow from "../../../assets/weather/dark-snowing.png";
import nightThunderstorm from "../../../assets/weather/dark-lightning.png";


export default function WeatherCard({ weatherData }) {
  return (
    <div className="weathercard__container">
      <p className="weathercard__tempature">{weatherData.temp.F}&deg;&nbsp;F</p>{" "}
      <img src={WeatherImage(weatherData)} alt="sunshine" className="weathercard__image" />
    </div>
  );
}


const WeatherImage = ({ weatherData }) => {
    if(weatherData.isDay) {

    }
}