// This COMPONENT will hold information about the current geolocation and current weather

import UserLocationComponent from "./UserLocationComponent";
import TemperatureComponent from "./TemperatureComponent";
import WeatherDisplayComponent from "./WeatherDisplayComponent";

const CurrentWeatherComponent = () => {
  return (
    <>
      {/* Gets user device geolocation */}
      <UserLocationComponent></UserLocationComponent>

      {/* Gets temperature for the location or geolocation */}
      <TemperatureComponent></TemperatureComponent>

      {/* Images, backgrounds and animations based on the weather and season */}
      {/* <WeatherDisplayComponent></WeatherDisplayComponent> */}
    </>
  );
};

export default CurrentWeatherComponent;
