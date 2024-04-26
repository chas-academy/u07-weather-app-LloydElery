// This component will handle weather calls
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useUnitStore } from "../stores/useUnitStore";
import TodaysHourlyForecast from "./HourlyForecastComponent";

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
    console.log(weather);
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

  //TODO Gör C | F klickbara för att ändra unit
  //TODO Lägg till små iconer

  const dayFormatter = new Intl.DateTimeFormat("se", {
    weekday: "long",
  });
  const day = dayFormatter.format(weather.dt);
  const timeFormatter = new Intl.DateTimeFormat("se", {
    hour: "2-digit",
    minute: "2-digit",
  });
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

        {/* Soluppgång */}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Soluppgång: {""}
            {("0" + sunrise.getUTCHours()).slice(-2)}:
            {("0" + sunrise.getUTCMinutes()).slice(-2)}{" "}
          </p>
        </div>

        {/* Solnedgång*/}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Soluppgång: {""}
            {("0" + sunset.getUTCHours()).slice(-2)}:
            {("0" + sunset.getUTCMinutes()).slice(-2)}{" "}
          </p>
        </div>
      </section>

      {/* Current Temperature */}
      <div className=" grid grid-cols-2 justify-center space-x-0 absolute top-6 right-5 m-5 text-2xl w-fit">
        <p className=" w-fit text-center">
          {Math.round(weather.main.temp)}
          {unitData === "metric" ? "°C" : "°F"}
        </p>
        <p className=" text-gray-600">
          |{unitData === "imperial" ? "°C" : "°F"}
        </p>
      </div>

      {/* Weather conditions */}
      <section className=" grid grid-cols-1 grid-rows-3 w-fit absolute top-20 right-5  h-fit">
        {/* Rain */}
        <div className=" grid grid-cols-1 justify-center">
          <p className="text-xs w-fit  ">
            Nederbörd: {""}
            {weather.main.humidity} %
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

      {/* Sunset & Sunrise */}

      {/* Weather Conditions Container */}
      {/* <section className="grid grid-cols-6 w-full top-0 absolute"> */}
      {/* Sunrise */}
      {/* <div className="conditionContainer">
          <div className="conditionImgContainer">
            <img className="w-full " src={sunriseImg} alt="sunrise" />
          </div>
          <div className="conditionInformation">
            <p className="text-sm p-0">Sunrise:</p>
            <p className="text-sm p-0">
              {("0" + sunrise.getUTCHours()).slice(-2)}:
              {("0" + sunrise.getUTCMinutes()).slice(-2)}{" "}
            </p>
          </div>
        </div> */}

      {/* Min Temp */}
      {/* <div className="conditionContainer">
          <div className="conditionImgContainer">
            <img
              className="w-full"
              src={minTempImg}
              alt="minimum temperature"
            />
          </div>
          <div className="conditionInformation">
            <p className="text-sm p-0">Min Temp:</p>
            <p className="text-sm p-0">
              {Math.round(weather.main.temp_min)}
              {unitData === "metric" ? "°C" : "°F"}
            </p>
          </div>
        </div> */}

      {/* Humidity */}
      {/* <div className="conditionContainer">
          <div className="conditionImgContainer ">
            <img className="w-full " src={humidityImg} alt="humidity" />
          </div>
          <div className="conditionInformation">
            <p className="text-sm p-0 ">Humidity:</p>
            <p className="text-sm p-0">{weather.main.humidity}%</p>
          </div>
        </div> */}

      {/* Windspeed */}
      {/* <div className="conditionContainer">
          <div className="conditionImgContainer">
            <img className="w-full " src={windImg} alt="windspeed" />
          </div>
          <div className="conditionInformation">
            <p className="text-sm p-0">Winds:</p>
            <p className="text-sm p-0">{weather.wind.speed} m/s</p>
          </div>
        </div> */}

      {/* Max Temp */}
      {/* <div className="conditionContainer">
          <div className="conditionImgContainer">
            <img
              className="w-full top-0 left-0"
              src={maxTempImg}
              alt="sunset"
            />
          </div>
          <div className="conditionInformation">
            <p className="text-sm p-0">Max Temp:</p>
            <p className="text-sm p-0">
              {Math.round(weather.main.temp_max)}
              {unitData === "metric" ? "°C" : "°F"}
            </p>
          </div>
        </div> */}

      {/* Sunset */}
      {/* <div className="conditionContainer">
          <div className="conditionImgContainer">
            <img className="w-full" src={sunsetImg} alt="sunset" />
          </div>
          <div className="conditionInformation">
            <p className="text-sm p-0">Sunset:</p>
            <p className="text-sm p-0">
              {("0" + sunset.getUTCHours()).slice(-2)}:
              {("0" + sunset.getUTCMinutes()).slice(-2)}
            </p>
          </div>
        </div>
      </section> */}

      <TodaysHourlyForecast></TodaysHourlyForecast>
      {/* Sunset and Sunrise */}
    </>
  );
};

export default WeatherComponent;
