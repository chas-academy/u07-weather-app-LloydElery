// This component will handle weather calls
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useUnitStore } from "../stores/useUnitStore";
import TodaysHourlyForecast from "./HourlyForecastComponent";
import ToggleUnitDataButton from "./ToggleUnitDataButton";

// Images
import humidityImg from "../assets/humidity.svg";
import windImg from "../assets/cloudy-windy.svg";
import maxTempImg from "../assets/temperature-max.svg";
import minTempImg from "../assets/temperature-min.svg";
import sunriseImg from "../assets/sunrise.svg";
import sunsetImg from "../assets/sunset.svg";

const WeatherComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const unitData = useUnitStore((state: any) => state.unitData);
  const [weather, setWeather]: any = useState(null);
  const [weatherIcon, setWeatherIcon]: any = useState(null);

  /* User geolocation, used in the api fetch */
  const APIKEY = import.meta.env.VITE_API_KEY_CURRENT;

  const getWeatherByGeolocation = async () => {
    const currentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unitData}`;
    const response = await fetch(currentLocationUrl);
    const result = await response.json();
    let weatherIcon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
    setWeatherIcon(weatherIcon);
    setWeather(result);
    return weatherIcon;
  };

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    getWeatherByGeolocation();
  }, [userPosition, unitData]); // every time a user position changes, the useEffect will be triggerd

  // Checks if weather location is set or not to avoid errors
  if (weather === null) {
    return null;
  }

  const dayFormatter = new Intl.DateTimeFormat("se", {
    weekday: "long",
  });
  const day = dayFormatter.format(weather.dt);
  const timeFormatter = new Intl.DateTimeFormat("se", {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(weather);
  const date = new Date((weather.dt + weather.timezone) * 1000);
  const time = timeFormatter.format(date);
  const sunrise = new Date((weather.sys.sunrise + weather.timezone) * 1000);
  const sunset = new Date((weather.sys.sunset + weather.timezone) * 1000);

  /* WEATHER CONTAINER */
  return (
    <>
      {/* Weather image */}
      <div className=" absolute top-4 left-0 m-1 w-20">
        <img
          className="w-full h-full content-center items-center"
          src={weatherIcon}
          alt={weather.weather[0].main}
        />
      </div>

      {/* Location Name */}
      <div className=" absolute top-9 left-20 ">
        <p className="text-sm">{weather.name}</p>
      </div>

      {/* Weather description */}
      <div className="absolute top-12 left-20">
        <h2 className="w-full h-full content-center items-center">
          <strong>{capitalize(weather.weather[0].description)}</strong> <br />{" "}
        </h2>
      </div>

      {/* Current day information */}
      <section className=" grid grid-cols-1 grid-rows-3 w-fit absolute top-20 left-20 h-fit">
        {/* Day & Time*/}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            {capitalize(day)}: {""}
            {time}
          </p>
        </div>

        {/* Sunrise */}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Soluppgång: {""}
            {("0" + sunrise.getUTCHours()).slice(-2)}:
            {("0" + sunrise.getUTCMinutes()).slice(-2)}{" "}
          </p>
        </div>

        {/* Sunsety*/}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Soluppgång: {""}
            {("0" + sunset.getUTCHours()).slice(-2)}:
            {("0" + sunset.getUTCMinutes()).slice(-2)}{" "}
          </p>
        </div>
      </section>

      {/* Current Temperature */}
      <div className="  grid grid-cols-2 justify-items-end space-x-0 absolute top-6 right-12 m-5 text-2xl w-fit">
        {Math.round(weather.main.temp)}
        <ToggleUnitDataButton></ToggleUnitDataButton>
      </div>

      {/* Weather conditions */}
      <section className=" grid grid-cols-1 grid-rows-3 w-fit absolute top-20 right-5  h-fit">
        {/* Rain */}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Temperatur: {""}
            <p className="right-8 top-0 absolute">
              {Math.round(weather.main.temp_min)}/
            </p>
            <p className="right-4 top-0 absolute">
              {Math.round(weather.main.temp_max)}{" "}
            </p>
            <p className="right-0 top-0 absolute">
              {unitData === "metric" ? "C°" : "F°"}
            </p>
          </p>
        </div>

        {/* Wind */}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Vinhastighet: {""}
            {Math.round(weather.wind.speed)} m/s
          </p>
        </div>

        {/* Humidity */}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Luftfuktighet: {""}
            {weather.main.humidity} %
          </p>
        </div>
      </section>

      <TodaysHourlyForecast></TodaysHourlyForecast>
      {/* Sunset and Sunrise */}
    </>
  );
};

export default WeatherComponent;
