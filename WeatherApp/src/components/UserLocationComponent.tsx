// This component will handle user location

import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useState } from "react";

const UserLocationComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  console.log(userPosition);
  // Updates the user geolocation
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const getUserPosition = () => {
    // Success -> get current device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserPosition({ latitude, longitude });
          console.log(position.coords.latitude);
        },
        (error) => {
          console.error("Error fetching geolocation", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  //TODO Hämta url som en prop
  const myLocation = async () => {
    getUserPosition();
    const APIKEY = import.meta.env.VITE_API_KEY_CURRENT;
    console.log(APIKEY);
    const currentLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition?.latitude}&lon=${userPosition?.longitude}&appid=${APIKEY}`;
    const response = await fetch(currentLocationUrl);
    const result = await response.json();

    console.log(result);
    console.log(result.weather);
    console.log(result.weather[0].main); // Group of weather parameters (Rain, Snow, Clouds etc.)
    console.log(result.weather[0].description); // Weather condition within the group.
    console.log(result.main.temp);
  };

  return (
    <>
      <div>
        <button onClick={() => myLocation()}>Set your location</button>
      </div>
    </>
  );
};

export default UserLocationComponent;
