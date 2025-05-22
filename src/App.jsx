import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;

  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("Karachi");
  const [backgroundClass, setBackgroundClass] = useState("daytime");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`
      );
      setWeatherData(res.data);
      const currentTime = res.data.dt;
      const sunrise = res.data.sys.sunrise;
      const sunset = res.data.sys.sunset;

      if (currentTime >= sunrise && currentTime < sunset) {
        setBackgroundClass("daytime");
      } else {
        setBackgroundClass("nighttime");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div className="container-heading">Weather App</div>
      <div className={`card ${backgroundClass}`}>
        <div className="card-header">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchData();
              setCityName("");
            }}
          >
            <input
              type="text"
              className="input"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name"
            />
          </form>
          <h1 className="c-name">
            {weatherData.name} - {new Date().toDateString()}
          </h1>
          <h2 className="c-tem">{weatherData.main?.temp}°C</h2>
          <span>
            <img
              className="icon"
              src={`http://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}.png`}
              alt={weatherData.weather?.[0]?.description}
            />
          </span>
        </div>
        <div className="card-body">
          <p className="c-feel">Feels like: {weatherData.main?.feels_like}°C</p>
          <p className="c-humadity">Humidity: {weatherData.main?.humidity}%</p>
          <p className="c-wind">Wind Speed: {weatherData.wind?.speed} m/s</p>
          <p className="c-desp">
            Description: {weatherData.weather?.[0]?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
