// This component will handle weather calls
import { useEffect } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

const WeatherComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  let weatherIcon = "";
  if (userPosition.weather) {
    weatherIcon = `https://openweathermap.org/img/wn/${userPosition.weather[0].icon}@2x.png`;
  }

  //TODO Hämta url som en prop
  const myWeather = async () => {
    // Updates the user geolocation
    const setUserPosition = useUserLocationStore(
      (state: any) => state.updateUserLocation
    );
    const APIKEY = import.meta.env.VITE_API_KEY_CURRENT;
    const currentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition?.latitude}&lon=${userPosition?.longitude}&appid=${APIKEY}`;
    const response = await fetch(currentLocationUrl);
    const result = await response.json();
    setUserPosition(result);

    console.log(result);
    console.log(result.weather);
    console.log(result.weather[0].main); // Group of weather parameters (Rain, Snow, Clouds etc.)
    console.log(result.weather[0].description); // Weather condition within the group.
    console.log(result.main.temp);
  };

  useEffect(() => {
    myWeather();
  }, []);

  // Checking if the .... does not exict
  if (!userPosition.weather) {
    return null;
  }

  return (
    <>
      {/* Header container */}
      <div className="border-2 m-2 w-auto border-black flex min-h-96 text-lg justify-evenly content-center items-center">
        {/* Image container */}
        <div className="border-2 border-black w-10 h-10">
          <img
            className="w-full h-full content-center items-center"
            src={weatherIcon}
            alt={userPosition.weather[0].main}
          />
        </div>
        {/* Location Name container */}
        <div>
          <h2 className="w-full h-full content-center items-center">
            <strong>{userPosition.name}</strong> <br />{" "}
            <p>
              {userPosition.weather[0].main} & <br /> {userPosition.main.temp}
            </p>
          </h2>
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
