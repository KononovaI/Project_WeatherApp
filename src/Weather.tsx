interface WeatherProps {
	place?: string;
	temp: number;
	description: string;
}

const Weather = ({ place, temp, description }:WeatherProps) => {
	return (
			<div className="weather">
					<p>Name of the city: {place}</p>
					<p>Temperature: {temp} °C</p>
					<p>Weather: {description}</p>
			</div>
	);
};

export default Weather;