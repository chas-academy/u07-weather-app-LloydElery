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
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unit}&lang=${lang}`;
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

  const getFiveDayForecast = () => {};

  const weak = [
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    getWeatherForecast();
  }, [userPosition, unit, unitToken]);

  /*   const forecastDateGroup = (forecastData: any) => {
    const dateGroup: {
      [date: string]: { temperature: number[]; icon: string };
    } = {};
    forecastData.list.forEach((element: any) => {
      const date = new Date((element.dt + weather.city.timezone) * 1000);
      const dayFormatter = new Intl.DateTimeFormat("en", { weekday: "short" });
      const day = dayFormatter.format(date);
      const dayOfMonth = date.getDate();
      const month = date.getMonth() + 1;
      const formattedDate = `${day}\n${dayOfMonth}/${month}`;
      if (!dateGroup[formattedDate]) {
        dateGroup[formattedDate] = { temperature: [], icon: "" };
      }

      const temperature = element.main.temp;
      const icon = element.weather[0].icon;
      dateGroup[formattedDate].temperature.push(temperature);
      dateGroup[formattedDate].icon = icon;
    });

    Object.keys(dateGroup).forEach((date) => {
      const values = dateGroup[date];
      const sum = values.temperature.reduce((acc, temp) => acc + temp, 0);
      const average = sum / values.temperature.length;
      dateGroup[date].temperature = [parseFloat(average.toFixed(2))];
    });
    console.log(dateGroup);
    return dateGroup;
  }; */

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

      {/* 3 hour forecast */}
      {forecast.list.map((element: any) => {
        const date = new Date((element.dt + forecast.city.timezone) * 1000); // Omvandlar millisekunder till sekunder samt sätter den korrekta tidszoonen
        return (
          <p>
            {/* Omvandlar dt till UTC standard att skriva datum */}
            Date: {date.toUTCString()}
            <br></br>
            Temp: {Math.round(element.main.temp)}
            {unitToken}
            <br></br>
            {capitalize(element.weather[0].description)}
          </p>
        );
      })}
      <div>
        {weak.map((day: string) => (
          <>
            {/* Tomorrow container */}
            <div className="border-2 m-2 w-auto border-black flex h-28 text-lg justify-evenly content-center items-center">
              {" "}
              <div>
                <h3 key={day}>{day}</h3>
              </div>
              <WeatherComponent></WeatherComponent>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ForecastComponent;
