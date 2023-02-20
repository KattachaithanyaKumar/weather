import React, { useState } from "react";
import "./App.css";

import sun from "./assets/weather icons/sun.png";

const API_KEY = "76e2f3a6e5msha9d6055dd5051b9p1fee85jsn7d2265ba6bcb";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "76e2f3a6e5msha9d6055dd5051b9p1fee85jsn7d2265ba6bcb",
    "X-RapidAPI-Host": "aerisweather1.p.rapidapi.com",
  },
};

function App() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const getForecast = async () => {
    let url = "https://aerisweather1.p.rapidapi.com/forecasts/" + city + ",in";

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.response[0].periods);
        setForecast(response.response[0].periods);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getForecast();
  };

  return (
    <div className="app">
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
              <h2>Delhi</h2>
              <h1>31°C</h1>
            </div>
            <div className="today-right">
              <img src={sun} alt="sun" />
            </div>
          </div>
          <div className="air">
            <div className="feel">
              <p>Feels Like</p>
              <h2>30°</h2>
            </div>
            <div className="wind">
              <p>Wind</p>
              <h2>0.2 Km/h</h2>
            </div>
            <div className="rain">
              <p>Chance of rain</p>
              <h2>0%</h2>
            </div>
            <div className="uv">
              <p>UV index</p>
              <h2>3</h2>
            </div>
          </div>
        </div>
        <div className="right">
          <p>7-DAY FORECAST</p>
          <div className="forecast"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
