// This COMPONENT will hold information about the current geolocation and current weather

import WeatherComponent from "./WeatherComponent";
import UserLocationComponent from "./UserLocationComponent";
import TemperatureComponent from "./TemperatureComponent";
import WeatherDisplayComponent from "./WeatherDisplayComponent";

const CurrentWeatherComponent = () => {
  return (
    <>
      {/* Gets user device geolocation */}
      <UserLocationComponent></UserLocationComponent>

      {/* Gets weather based on search or geolocation */}
      <WeatherComponent></WeatherComponent>

      {/* Gets temperature for the location or geolocation */}
      <TemperatureComponent></TemperatureComponent>

      {/* Images, backgrounds and animations based on the weather and season */}
      {/* <WeatherDisplayComponent></WeatherDisplayComponent> */}
    </>
  );
};

export default CurrentWeatherComponent;
