import './Main.css';
import WeatherCard from './WeatherCard/WeatherCard';
import ItemCard from './ItemCard/ItemCard';

export default function Main() {
    return (
        <main className="main__content">
            <WeatherCard/> 
            <ItemCard/>
        </main>
    );
}