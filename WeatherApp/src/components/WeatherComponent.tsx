// This component will handle weather calls
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

//FIXME Sidan kastar error när jag refreshar men inte när jag avmarkerar variabler och sparar koden i vs code
const WeatherComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [weather, setWeather]: any = useState(null);

  /* User geolocation, used in the api fetch */
  const APIKEY = import.meta.env.VITE_API_KEY_CURRENT;

  let weatherIcon = "";
  const getWeatherByGeolocation = async () => {
    const currentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}`;
    const response = await fetch(currentLocationUrl);
    const result = await response.json();
    console.log(result);
    console.log(weather);
    weatherIcon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
    setWeather(result);
    console.log(result.name);
  };

  useEffect(() => {
    getWeatherByGeolocation();
  }, [userPosition]); // every time a user position changes, the useEffect will be triggerd

  if (weather === null) {
    return null;
  }

  return (
    <>
      {/* Image container */}

      <div className="border-2 border-black w-10 h-10">
        <img
          className="w-full h-full content-center items-center"
          src={weatherIcon}
          alt={weather.weather[0].main}
        />
      </div>

      {/* Location Name container */}

      <div>
        <h2 className="w-full h-full content-center items-center">
          <strong>{weather.name}</strong> <br />{" "}
          <p>
            {weather.weather[0].main} & <br /> {weather.main.temp}
          </p>
        </h2>
      </div>

      {/* Current Temp container */}
      <div className="border-2 border-black w-10 h-10">
        <strong className="w-full h-full content-center items-center">
          30c
        </strong>
      </div>
    </>
  );
};

export default WeatherComponent;
