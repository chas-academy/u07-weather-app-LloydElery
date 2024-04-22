// This component will handle weather calls
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

const WeatherComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [weather, setWeather]: any = useState(userPosition);

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
  /* 
  //TODO Hämta url som en prop
  const myWeather = async () => {
    // Updates the user geolocation
    const setUserPosition = useUserLocationStore(
      (state: any) => state.updateUserLocation
    );
    const response = await fetch(currentLocationUrl);
    const result = await response.json();
    setUserPosition(result);

    console.log(result);
    console.log(result.weather);
    console.log(result.weather[0].main); // Group of weather parameters (Rain, Snow, Clouds etc.)
    console.log(result.weather[0].description); // Weather condition within the group.
    console.log(result.main.temp);
  }; */

  useEffect(() => {
    getWeatherByGeolocation();
  }, []);
  return (
    <>
      <h1>Weather component</h1>
      <h1>{weather.name}</h1>
      {/* Header container */}
      <div className="border-2 m-2 w-auto border-black flex min-h-96 text-lg justify-evenly content-center items-center">
        {/* Image container */}
        <div className="border-2 border-black w-10 h-10">
          {/* <img
            className="w-full h-full content-center items-center"
            src={weatherIcon}
            alt={weather.weather[0].main}
          /> */}
        </div>
        {/* Location Name container */}
        <div>
          {/* <h2 className="w-full h-full content-center items-center">
            <strong>{weather.name}</strong> <br />{" "}
            <p>
              {weather.weather[0].main} & <br /> {weather.main.temp}
            </p>
          </h2> */}
        </div>
        {/* Current Temp container */}
        <div className="border-2 border-black w-10 h-10">
          <strong className="w-full h-full content-center items-center">
            30c
          </strong>
        </div>
      </div>
    </>
  );
};

export default WeatherComponent;
