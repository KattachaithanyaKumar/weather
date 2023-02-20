import React, { useState } from "react";
import "./App.css";

import sun from "./assets/weather icons/sun-cloud.png";
import mostly_sun from "./assets/weather icons/sun.png";
import cloudy from "./assets/weather icons/cloud.png";
import mostly_cloudy from "./assets/weather icons/clouds.png";
import cloudy_storm from "./assets/weather icons/showers.png";
import rain from "./assets/weather icons/rain.png";
import thunder from "./assets/weather icons/thunder.png";

import LoadingIcon from "./assets/loading.gif";

// const API_KEY = "76e2f3a6e5msha9d6055dd5051b9p1fee85jsn7d2265ba6bcb";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "76e2f3a6e5msha9d6055dd5051b9p1fee85jsn7d2265ba6bcb",
    "X-RapidAPI-Host": "aerisweather1.p.rapidapi.com",
  },
};

const icon_selection = (weather) => {
  switch (weather) {
    case "Sunny":
      return <img src={sun} alt="sun" />;
      break;

    case "Mostly Sunny":
      return <img src={mostly_sun} alt="mostly_sun" />;

    case "Partly Cloudy":
      return <img src={cloudy} alt="cloud" />;
      break;

    case "Mostly Cloudy":
      return <img src={mostly_cloudy} alt="mostly_cloudy" />;
      break;

    case "Mostly Cloudy with Isolated Storms":
      return <img src={cloudy_storm} alt="isolated_storms" />;
      break;

    case "Mostly Cloudy with Scattered Showers":
      return <img src={cloudy_storm} alt="isolated_storms" />;
      break;

    case "Mostly Cloudy with Rain and Isolated Storms":
      return <img src={cloudy_storm} alt="isolated_storms" />;
      break;

    case "rain":
      return <img src={rain} alt="rain" />;
      break;
  }
};

function App() {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState(0);
  const [feels, setFeels] = useState(0);
  const [wind, setWind] = useState(0);
  const [rain, setRain] = useState(0);
  const [uvi, setUvi] = useState(0);
  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const getForecast = async () => {
    let url = "https://aerisweather1.p.rapidapi.com/forecasts/" + city + ",in";

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        for (let i = 0; i < 7; i++) {
          console.log(response.response[0].periods[i].weather);
        }
        setCityName(city);
        setWeather(response.response[0].periods[0].weather);
        setForecast(response.response[0].periods);
        setTemp(response.response[0].periods[0].maxTempC);
        setFeels(response.response[0].periods[0].feelslikeC);
        setWind(response.response[0].periods[0].windSpeedMaxKPH);
        setRain(response.response[0].periods[0].precipIN);
        setUvi(response.response[0].periods[0].uvi);

        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    getForecast();
  };

  return (
    <div className="app">
      {loading && (
        <div className="loading">
          <img src={LoadingIcon} alt="" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      <div className="container">
        <div className="left">
          <div className="today">
            <div className="today-left">
              <h2>{cityName}</h2>
              <h1>{temp}°C</h1>
            </div>
            <div className="today-right">{icon_selection(weather)}</div>
          </div>
          <div className="air">
            <div className="feel">
              <p>Feels Like</p>
              <h2>{feels}°</h2>
            </div>
            <div className="wind">
              <p>Wind</p>
              <h2>{wind} Km/h</h2>
            </div>
            <div className="rain">
              <p>Chance of rain</p>
              <h2>{rain} %</h2>
            </div>
            <div className="uv">
              <p>UV index</p>
              <h2>{uvi}</h2>
            </div>
          </div>
        </div>
        <div className="right">
          {/* <p>7-DAY FORECAST</p> */}
          <div className="forecast">
            {forecast.map((item) => {
              return (
                <div className="dayCell" key={item.dateTimeISO}>
                  <h4>{new Date(item.dateTimeISO).toLocaleDateString()}</h4>
                  <p>
                    {item.maxTempC}°C / {item.minTempC}°C
                  </p>
                  {icon_selection(item.weather)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
