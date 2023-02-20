<div>
  <h1>7-Day Weather Forecast</h1>
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name"
    />
    <button type="submit">Search</button>
  </form>
  <div style={{ display: "flex" }}>
    {forecast.map((item) => (
      <div>
        <img src={`https://openweathermap.org/img/wn/${item.icon}`} alt="" />
        <h3>{new Date(item.dateTimeISO).toLocaleDateString()}</h3>
        <p>
          Temperature: {item.maxTempC}°C - {item.minTempC}°C
        </p>
        {/* <p>Description: {item.weather.replace("Mostly", "")}</p> */}
        <p>Description: {item.weather}</p>
      </div>
    ))}
  </div>
</div>;
