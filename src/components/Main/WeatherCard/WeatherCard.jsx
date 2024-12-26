import './WeatherCard.css';
import sunny from '../../../assets/weather/daytime-clear.png';


export default function WeatherCard() {
return (
    <div className="weathercard__container">
        <p className="weathercard__tempature">39&deg;&nbsp;F</p>
        <img src={sunny} alt="sunshine" className="weathercard__image" />
    </div>
);}