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
    sessionStorage.setItem(unit, unit);
    const storeUnit = sessionStorage.getItem(unit);
    return storeUnit;
  };

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getWeatherForecast = async () => {
    setUnit(unit);
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unit}&lang=${lang}`;
    console.log(forecastUrl);
    const response = await fetch(forecastUrl);
    const result = await response.json();
    setForecast(result);
    if (forecast === null) {
      return null;
    } else {
      setLang(forecast.city.country);
    }
    setUnitToken(unitToken);
    console.log(result);
  };

  const groupForecastDataByDate = (forecastData: any) => {
    /* Grouping all the information by date */
    const groupByDate: {
      [date: string]: { temperature: number[]; icon: string };
    } = {};
    forecastData.list.map((element: any) => {
      const date = new Date((element.dt + forecast.city.timezone) * 1000); // Formatting milleseconds to seconds based on the current timezone
      const dayFormatter = new Intl.DateTimeFormat("en", {
        weekday: "short",
      }); // ...formatter for day display
      const day = dayFormatter.format(date); // ...displays weekday
      const dayByNumber = date.getDate(); // ...display date by number (1-31)
      const month = date.getMonth() + 1; // ...display month by calendar year
      const formattedDate = `${dayByNumber}/${month} | ${day}`; // ...combines and formatt date
      if (!groupByDate[formattedDate]) {
        groupByDate[formattedDate] = { temperature: [], icon: "" };
      }

      const temperature = element.main.temp;
      const icon = element.weather[0].icon;
      groupByDate[formattedDate].temperature.push(temperature);
      groupByDate[formattedDate].icon = icon;
    });

    Object.keys(groupByDate).forEach((date) => {
      const values = groupByDate[date];
      const sum = values.temperature.reduce((acc, temp) => acc + temp, 0);
      const average = sum / values.temperature.length;
      groupByDate[date].temperature = [Math.round(average * 100) / 100];
    });

    console.log(groupByDate);
    return groupByDate;
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
        {/* Sunset Card */}
        <section className="border-2 m-2 w-auto border-black flex min-h-28 text-lg justify-evenly content-center items-center">
          {/* Sunrise and Sunset */}
          <div>
            <p>Sunrise: {forecast.city.sunrise}</p>
            <p>Sunset: {forecast.city.sunset}</p>
          </div>

          {/* Location Name */}
          <div className="flex justify-center font-normal text-xl">
            <h2>{forecast.city.name}</h2>
          </div>
        </section>
        {forecast && (
          <>
            <div>
              {Object.keys(groupForecastDataByDate(forecast)).map(
                (item: any) => {
                  return (
                    <>
                      <div className="border-2 m-2 w-auto border-black flex min-h-28 text-lg justify-evenly content-center items-center">
                        <p>{item}</p>
                        <img
                          src={`https://openweathermap.org/img/wn/${
                            groupForecastDataByDate(forecast)[item].icon
                          }@2x.png`}
                          alt=""
                        />
                        <p>
                          {Math.round(
                            groupForecastDataByDate(forecast)[item]
                              .temperature[0]
                          ).toString()}{" "}
                          {unitToken}
                        </p>
                      </div>
                    </>
                  );
                }
              )}
            </div>
          </>
        )}
      </div>

      {/* Forecast */}
      {/* {forecast.list.map((element: any) => {
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
      })} */}
    </>
  );
};

export default ForecastComponent;
