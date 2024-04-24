// This component will handle weather calls
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

const WeatherComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [weather, setWeather]: any = useState(null);
  const [weatherIcon, setWeatherIcon]: any = useState(null);

  /* User geolocation, used in the api fetch */
  const APIKEY = import.meta.env.VITE_API_KEY_CURRENT;

  const getWeatherByGeolocation = async () => {
    const currentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=metric`;
    const response = await fetch(currentLocationUrl);
    const result = await response.json();
    let weatherIcon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
    setWeatherIcon(weatherIcon);
    setWeather(result);
    console.log(weather);
    return weatherIcon;
  };

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    getWeatherByGeolocation();
  }, [userPosition]); // every time a user position changes, the useEffect will be triggerd

  // Checks if weather location is set or not to avoid errors
  if (weather === null) {
    return null;
  }

  return (
    <>
      {/* Weather Icon container */}
      <div className=" w-10 h-10">
        <img
          className="w-full h-full content-center items-center"
          src={weatherIcon}
          alt={weather.weather[0].main}
        />
      </div>

      {/* Location Name container */}
      <div>
        <h2 className="w-full h-full content-center items-center">
          <strong>{capitalize(weather.weather[0].description)}</strong> <br />{" "}
        </h2>
      </div>

      {/* Current Temp container */}
      <div className=" w-10 h-10 ">
        <strong className="w-full h-full content-center items-center  block">
          <p>{Math.round(weather.main.temp)}&#8451;</p>
        </strong>
      </div>

      {/* Sunset and Sunrise */}
    </>
  );
};

export default WeatherComponent;
