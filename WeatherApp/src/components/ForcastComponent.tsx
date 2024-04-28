// This COMPONENT will contain the forecast for the coming days

import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useUnitStore } from "../stores/useUnitStore";
import { useState, useEffect } from "react";
import UserLocationComponent from "./UserLocationComponent";

// Images
import sunriseImage from "../assets/sunrise.svg";
import sunsetImage from "../assets/sunset.svg";
import minTempImage from "../assets/temperature-min.svg";
import maxTempImage from "../assets/temperature-max.svg";
import windImage from "../assets/cloudy-windy.svg";
import cloudImage from "../assets/cloudstatus.svg";
import clearDayImage from "../assets/day-clear.svg";
import clearNightImage from "../assets/night-clear.svg";

const ForecastComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const unitData = useUnitStore((state: any) => state.unitData);

  const [forecast, setForecast]: any = useState(null);
  const [lang, setLang]: any = useState(null);

  const APIKEY = import.meta.env.VITE_API_KEY_FORECAST;

  //TODO Gör språk / lang till ett alternativ

  const changeLanguage = () => {
    setLang(forecast.city.country);
  };

  const getWeatherForecast = async () => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unitData}&lang=${lang}`;
    const response = await fetch(forecastUrl);
    const result = await response.json();
    setForecast(result);

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
    }
  };

  const groupForecastDataByDate = (forecastData: any) => {
    /* Grouping all the information by date */
    const groupByDate: {
      [date: string]: {
        temperature: number[];
        minTemperature: number;
        maxTemperature: number;
        icon: string;
        weatherCondition: string;
        humidity: number[];
        windSpeed: number[];
        windDirection: number[];
        cloudiness: number[];
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
          minTemperature: Infinity,
          maxTemperature: -Infinity,
          icon: "",
          weatherCondition: "",
          humidity: [],
          windSpeed: [],
          windDirection: [],
          cloudiness: [],
        };
      }

      const temperature = element.main.temp;
      const icon = element.weather[0].icon;
      const weatherCondition = element.weather[0].main;
      const humidity = element.main.humidity;
      const windSpeed = element.wind.speed;
      const windDirection = element.wind.deg;
      const cloudiness = element.clouds.all;

      groupByDate[formattedDate].temperature.push(temperature);
      groupByDate[formattedDate].icon = icon;
      groupByDate[formattedDate].weatherCondition = weatherCondition;
      groupByDate[formattedDate].humidity.push(humidity);
      groupByDate[formattedDate].windSpeed.push(windSpeed);
      groupByDate[formattedDate].windDirection.push(windDirection);
      groupByDate[formattedDate].cloudiness.push(cloudiness);

      if (temperature < groupByDate[formattedDate].minTemperature) {
        groupByDate[formattedDate].minTemperature = temperature;
      }
      if (temperature > groupByDate[formattedDate].maxTemperature) {
        groupByDate[formattedDate].maxTemperature = temperature;
      }
    });

    /* Average & Max/Min Temperature / Day */
    Object.keys(groupByDate).forEach((date) => {
      const values = groupByDate[date];
      const sum = values.temperature.reduce((acc, temp) => acc + temp, 0);
      const average = sum / values.temperature.length;
      const findMin = values.minTemperature;
      groupByDate[date].temperature = [Math.round(average * 100) / 100];
      groupByDate[date].minTemperature = Math.min(findMin);
    });

    /* Average Humidity / Day */
    Object.keys(groupByDate).forEach((date) => {
      const values = groupByDate[date];
      const sum = values.humidity.reduce((acc, humidity) => acc + humidity, 0);
      const average = sum / values.humidity.length;
      groupByDate[date].humidity = [Math.round(average)];
    });

    /* Average Windspeed/direction */
    Object.keys(groupByDate).forEach((date) => {
      const values = groupByDate[date];
      const sumSpeed = values.windSpeed.reduce(
        (acc, humidity) => acc + humidity,
        0
      );
      const sumDirection = values.windDirection.reduce(
        (acc, windDirection) => acc + windDirection,
        0
      );
      const averageSpeed = sumSpeed / values.windSpeed.length;
      const averageDirection = sumDirection / values.windDirection.length;

      groupByDate[date].windDirection = [Math.round(averageDirection)];
      groupByDate[date].windSpeed = [Math.round(averageSpeed)];
    });

    /* Average Cloudiness / Day */
    Object.keys(groupByDate).forEach((date) => {
      const values = groupByDate[date];
      const sum = values.cloudiness.reduce(
        (acc, cloudiness) => acc + cloudiness,
        0
      );
      const average = sum / values.cloudiness.length;
      groupByDate[date].cloudiness = [Math.round(average)];
    });

    return groupByDate;
  };

  function getWindDirection(deg: any) {
    const directions = [
      "↓ N",
      "↙ NE",
      "← E",
      "↖ SE",
      "↑ S",
      "↗ SW",
      "→ W",
      "↘ NW",
    ];
    return directions[Math.round(deg / 45) % 8];
  }

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
  const cloud = forecast.list[0].clouds.all;
  const date = new Date((forecast.list[0].dt + forecast.city.timezone) * 1000);
  const timeFormatter = new Intl.DateTimeFormat("se", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const time = timeFormatter.format(date);
  const daytime = time < "18:01" && time > "06:00";

  return (
    <>
      <div>
        {forecast && (
          <div className="flex flex-col justify-center content-center flex-wrap relative top-1">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-white from-sky-400 ">
                {forecast.city.name}
              </span>
            </h1>
          </div>
        )}
      </div>
      <UserLocationComponent></UserLocationComponent>
      <div>
        <div className="grid grid-cols-3 place-items-center space-x-0 w-full h-fit">
          {/* Today Information */}
          {/* Sunrise/Sunset container 1/3 */}
          <div
            className="
          border
          border-white border-opacity-25 
          bg-[#c9cebd]
          bg-opacity-50
          mb-2 
          relative
          rounded-xl 
          shadow-md 
          text-lg 
          min-h-14
          w-full"
          >
            {/* Container Grid 2 */}
            <div className="grid grid-cols-2">
              {/* Sunrise */}
              <div className="justify-self-center">
                <img className="w-12" src={sunriseImage} alt="sunrise image" />
                <div className="absolute bottom-0">
                  {("0" + sunrise.getUTCHours()).slice(-2)}:
                  {("0" + sunrise.getUTCMinutes()).slice(-2)}
                </div>
              </div>
              {/* Sunset */}
              <div className="justify-self-center">
                <img className="w-12" src={sunsetImage} alt="sunset image" />
                <div className="absolute bottom-0">
                  {("0" + sunset.getUTCHours()).slice(-2)}:
                  {("0" + sunset.getUTCMinutes()).slice(-2)}
                </div>
              </div>
            </div>
          </div>

          {/* Cloudiness 2/3 */}

          <div
            className="
          mb-2 
          relative
          rounded-xl 
          text-lg 
          min-h-14
          w-2/3
          grid grid-cols-1
          justify-item-center
          "
          >
            <div className=" grid grid-cols-1 place-items-center place-content-center">
              <p className="text-xs">
                {cloud === 0 && daytime
                  ? "Clear Day"
                  : cloud === 0
                  ? "Clear Night"
                  : "Cloudyness"}{" "}
              </p>
              <img
                className="w-14 "
                src={
                  cloud === 0 && daytime
                    ? clearDayImage
                    : cloud === 0
                    ? clearNightImage
                    : cloudImage
                }
                alt="cloud image"
              />
              <p className="text-black text-xl absolute top-9">
                {cloud === 0 ? "" : cloud + "%"}
              </p>
            </div>
          </div>

          {/* Min/Max temp container (3/3)*/}
          <div
            className="
            border
            border-white border-opacity-25 
            bg-[#c9cebd]
          bg-opacity-50
            mb-2 
            relative
            rounded-xl 
            shadow-md 
            text-lg 
            min-h-14
            w-full"
          >
            {/* Container Grid 2 */}
            <div className="grid grid-cols-4 place-items-center">
              {/* Min temperature */}
              <div className="grid grid-cols-2">
                <p className="absolute top-3 left-2">
                  {Math.round(forecast.list[0].main.temp_min)}{" "}
                </p>
                <p className="absolute left-7 top-4 text-sm">
                  {unitData === "metric" ? "°C" : "°F"}
                </p>
              </div>
              <div className="absolute top-4 left-11">
                <img
                  className="w-6 "
                  src={minTempImage}
                  alt="minimum temperature image"
                />
              </div>
              {/* Max Temperature */}
              <div className="absolute top-4 right-11">
                <img
                  className="w-6"
                  src={maxTempImage}
                  alt="minimum temperature image"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="absolute top-3 right-6">
                  {Math.round(forecast.list[0].main.temp_max)}{" "}
                </p>
                <p className="absolute right-2 top-4 text-sm">
                  {unitData === "metric" ? "°C" : "°F"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {forecast && (
          <>
            <div>
              {Object.keys(groupForecastDataByDate(forecast)).map(
                (item: any) => {
                  const group = groupForecastDataByDate(forecast)[item];
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

                        {/* Min/Max Temperature */}
                        <div>
                          <p className="text-gray-400">
                            {Math.round(group.maxTemperature)}{" "}
                          </p>
                          <p>
                            {Math.round(group.temperature[0]).toString()}{" "}
                            {unitData === "metric" ? "°C" : "°F"}
                          </p>
                          <p className="text-gray-400 ">
                            {Math.round(group.minTemperature)}{" "}
                          </p>
                        </div>

                        {/* Wind container */}
                        <div>
                          <div className="gap-1 flex justify-center flex-col items-center">
                            <p>{group.windSpeed}m/s</p>
                            <img
                              className="w-10 flex justify-center"
                              src={windImage}
                              alt="sunrise image"
                            />
                            <p>{getWindDirection(group.windDirection)}</p>
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
