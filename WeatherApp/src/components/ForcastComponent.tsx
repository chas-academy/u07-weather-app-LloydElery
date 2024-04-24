// This COMPONENT will contain the forecast for the coming days

import SeasonComponent from "./SeasonComponent";
import DateComponent from "./DateComponent";
import WeatherComponent from "./WeatherComponent";
import TemperatureComponent from "./TemperatureComponent";
import WeatherDisplayComponent from "./WeatherDisplayComponent";
import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useState, useEffect } from "react";

const ForecastComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [forecast, setForecast]: any = useState(null);
  const [lang, setLang]: any = useState(null);
  const [unit, setUnit]: any = useState<"metric" | "imperial">("metric");
  const [unitToken, setUnitToken]: any = useState<"ºC" | "ºF">("ºC");

  const APIKEY = import.meta.env.VITE_API_KEY_FORECAST;

  //TODO Session storage for unit to toggle metric : imperial and save :next on refresh
  //TODO Gör språk / lang till ett alternativ

  const changeUnit = () => {
    if (unit === "metric" || unitToken === "ºC") {
      setUnit("imperial");
      setUnitToken("ºF");
    } else {
      setUnit("metric");
      setUnitToken("ºC");
    }
    sessionStorage.setItem(unitToken, unitToken);
    const storeUnitToken = sessionStorage.getItem(unitToken);
    console.log(storeUnitToken);
    sessionStorage.setItem(unit, unit);
    const storeUnit = sessionStorage.getItem(unit);
    console.log(storeUnit);
    return storeUnit;
  };

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getWeatherForecast = async () => {
    setUnit(unit);
    console.log(unit);
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&cnt=10&appid=${APIKEY}&units=${unit}&lang=${lang}`;
    console.log(forecastUrl);
    const response = await fetch(forecastUrl);
    const result = await response.json();
    setForecast(result);
    if (forecast === null) {
      return null;
    } else {
      setLang(forecast.city.country);
      console.log(lang);
    }
    setUnitToken(unitToken);
    console.log(result);
    /* let weatherIcon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
    setWeatherIcon(weatherIcon);
    setWeather(result);
    return weatherIcon; */
  };

  useEffect(() => {
    getWeatherForecast();
  }, [userPosition, unit, unitToken]);

  if (forecast === null) {
    return null;
  }

  return (
    <>
      <div>
        <button
          onClick={() => changeUnit()}
          className="bg-green-300 hover:bg-green-800 text-white font-bold py-2 px-3 rounded-full m-1 text-center"
        >
          {unitToken}
        </button>
      </div>
      {/* Sunrise and Sunset */}
      <div>
        <p>Sunrise: {forecast.city.sunrise}</p>
        <p>Sunset: {forecast.city.sunset}</p>
      </div>

      {/* Location */}
      <div>
        <strong>{forecast.city.name}</strong>
      </div>

      {/* Forecast */}
      {forecast.list.map((element: any) => {
        const date = new Date((element.dt + forecast.city.timezone) * 1000); // Formatting milleseconds to seconds based on the current timezone
        const dayFormatter = new Intl.DateTimeFormat("en", {
          weekday: "short",
        }); // ...formatter for day display
        const day = dayFormatter.format(date); // ...displays weekday
        const dayByNumber = date.getDate(); // ...display date by number (1-31)
        const month = date.getMonth() + 1; // ...display month by calendar year
        const formattedDate = `${dayByNumber}/${month} | ${day}`; // ...combines and formatt date
        return (
          <>
            <div className="border-2 m-2 w-auto border-black flex min-h-28 text-lg justify-evenly content-center items-center">
              <p key={element.dt}>
                {formattedDate}
                <br />
              </p>
              <WeatherComponent></WeatherComponent>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ForecastComponent;
