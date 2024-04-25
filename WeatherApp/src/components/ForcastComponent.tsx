// This COMPONENT will contain the forecast for the coming days

import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useUnitStore } from "../stores/useUnitStore";
import { useState, useEffect } from "react";

// Images
import sunriseImage from "../assets/sunrise.svg";
import sunsetImage from "../assets/sunset.svg";
import ToggleUnitDataButton from "./ToggleUnitDataButton";

const ForecastComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const unitData = useUnitStore((state: any) => state.unitData);

  const [forecast, setForecast]: any = useState(null);
  const [lang, setLang]: any = useState(null);
  const [unit, setUnit]: any = useState<"metric" | "imperial">("metric");

  const APIKEY = import.meta.env.VITE_API_KEY_FORECAST;

  //TODO Session storage for unit to toggle metric : imperial and save :next on refresh
  //TODO Gör språk / lang till ett alternativ

  const changeLanguage = () => {
    setLang(forecast.city.country);
    console.log(lang);
  };

  const getWeatherForecast = async () => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unitData}&lang=${lang}`;
    console.log(forecastUrl);
    const response = await fetch(forecastUrl);
    const result = await response.json();
    setForecast(result);
    console.log(result);

    setLang(forecast.city.country);

    /* setUnitToken(unitToken); */
    if (forecast === null) {
      setUserPosition({
        latitude: result.city.coord.lat
          ? result.city.coord.lat
          : userPosition.latitude,
        longitude: result.city.coord.lon
          ? result.city.coord.lon
          : userPosition.longitude,
      });
      console.log(result);
    }
  };

  const groupForecastDataByDate = (forecastData: any) => {
    /* Grouping all the information by date */
    const groupByDate: {
      [date: string]: {
        temperature: number[];
        icon: string;
        weatherCondition: string;
      };
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
        groupByDate[formattedDate] = {
          temperature: [],
          icon: "",
          weatherCondition: "",
        };
      }

      const temperature = element.main.temp;
      const icon = element.weather[0].icon;
      const weatherCondition = element.weather[0].main;
      groupByDate[formattedDate].temperature.push(temperature);
      groupByDate[formattedDate].icon = icon;
      groupByDate[formattedDate].weatherCondition = weatherCondition;
    });

    Object.keys(groupByDate).forEach((date) => {
      const values = groupByDate[date];
      const sum = values.temperature.reduce((acc, temp) => acc + temp, 0);
      const average = sum / values.temperature.length;
      groupByDate[date].temperature = [Math.round(average * 100) / 100];
    });

    return groupByDate;
  };

  useEffect(() => {
    getWeatherForecast();
  }, [userPosition, unitData]);

  if (forecast === null) {
    return null;
  }

  const sunrise = new Date(
    (forecast.city.sunrise + forecast.city.timezone) * 1000
  );
  const sunset = new Date(
    (forecast.city.sunset + forecast.city.timezone) * 1000
  );
  const name = forecast.city.name;

  return (
    <>
      <div>
        <ToggleUnitDataButton></ToggleUnitDataButton>
        {/* Language Button */}

        <button
          className="bg-green-300 hover:bg-green-800 text-white font-bold py-2 px-3 rounded-full m-1 text-center"
          onClick={() => changeLanguage()}
        >
          Byt språk till {lang}
        </button>

        {/* TODO Set an image to sunrise and sunset */}

        {forecast && (
          <>
            <div>
              {Object.keys(groupForecastDataByDate(forecast)).map(
                (item: any) => {
                  const group = groupForecastDataByDate(forecast)[item];
                  console.log(group.weatherCondition);
                  return (
                    <>
                      <div
                        className={`weatherCards ${
                          group.weatherCondition || "default"
                        }`}
                      >
                        <div className="text-xs absolute top-0 left-0 m-2">
                          <p>{name}</p>
                        </div>
                        <div className="relative top-0 left-0">
                          <p>{}</p>
                        </div>
                        <p>{item}</p>
                        <img
                          src={`https://openweathermap.org/img/wn/${group.icon}@2x.png`}
                          alt=""
                        />
                        <p>
                          {Math.round(group.temperature[0]).toString()}{" "}
                          {unitData === "metric" ? "°C" : "°F"}
                        </p>
                        {/* Sunrise & sunset container */}
                        <div>
                          <div className="flex justify-center flex-col items-center">
                            <img
                              className="w-10 flex justify-center"
                              src={sunriseImage}
                              alt="sunrise image"
                            />
                            {("0" + sunrise.getUTCHours()).slice(-2)}:
                            {("0" + sunrise.getUTCMinutes()).slice(-2)}
                          </div>
                          <div className="flex justify-center flex-col items-center">
                            <img
                              className="w-10 flex justify-center"
                              src={sunsetImage}
                              alt="sunset image"
                            />
                            {("0" + sunset.getUTCHours()).slice(-2)}:
                            {("0" + sunset.getUTCMinutes()).slice(-2)}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ForecastComponent;
