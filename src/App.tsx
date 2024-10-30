import React, {useState} from 'react';
import './App.css';
import Weather from "./Weather";

function App() {

    const[city,setCity]=useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<{ place?: string, temp: number, description: string } | null>(null);

    const fetchWeather = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const APIkey: string = '8cc2056e4d936293742a9bf4c38cdad2'
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                setError('City not found');
                setWeather(null);
            } else {
                setWeather({
                    place: json.name,
                    temp: Math.round(json.main.temp),
                    description: json.weather[0].description
                });
                setError(null);
            }
            setCity('');
        })
        .catch(error => {
            console.error('Error:', error);
            setError('An error occurred');
            setWeather(null);
            setCity('');
        });
    }

    return (
        <div className="App">
            <h1>Weather App</h1>
            <form onSubmit={fetchWeather}>
                <input type="text" value={city} onChange={(e) => setCity(e.currentTarget.value) } placeholder="Enter city name" /> 
                <button type="submit">Get weather</button>
            </form>
            {error &&<div style={{ color: 'red' }}>{error}</div>}
            {weather &&<Weather place={weather.place} temp={weather.temp} description={weather.description}/>}
        </div>
    );
}

export default App;