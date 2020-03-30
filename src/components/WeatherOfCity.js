import React from "react";
import "../styles/WeatherOfCity.css";

const WeatherOfCity = props => {
  return (
    <div className="weather-of-city">
      <h2>{props.cityName}</h2>
      <p>Temperatura: {props.temp} st. C.</p>
      <p>Ciśnienie: {props.pressure} hPa</p>
    </div>
  );
};

export default WeatherOfCity;
