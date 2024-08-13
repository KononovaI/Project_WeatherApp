import React, {useState} from 'react';
import './App.css';
import Weather from "./Weather";

function App() {

    const[city,setCity]=useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<{ temp: number, description: string } | null>(null);

          const fetchWeather = () => {
            //const city: string = 'London'
            const APIkey: string = '8cc2056e4d936293742a9bf4c38cdad2'
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found');
                    setWeather(null);
                } else {
                    setWeather({
                        temp: json.main.temp,
                        description: json.weather[0].description
                    });
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('An error occurred');
                setWeather(null);
            });
      }

    return (
        <div className="App">
            <h1>Weather App</h1>
            <input type="text" onChange={(e) => setCity(e.currentTarget.value)}/> 
            <button onClick={fetchWeather}>Get weather</button>
            {error &&<div style={{ color: 'red' }}>{error}</div>}
            {weather &&<Weather temp={weather.temp} description={weather.description}/>}
        </div>
    );
}

export default App;