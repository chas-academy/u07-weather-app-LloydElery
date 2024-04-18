// This COMPONENT will hold information about the current geolocation and current weather

import WeatherComponent from "./WeatherComponent";
import UserLocationComponent from "./UserLocationComponent";
import TemperatureComponent from "./TemperatureComponent";
import WeatherDisplayComponent from "./WeatherDisplayComponent";
import { useState } from "react";

const CurrentWeatherComponent = () => {
  return (
    <>
      <UserLocationComponent></UserLocationComponent>
    </>
  );
};

export default CurrentWeatherComponent;
