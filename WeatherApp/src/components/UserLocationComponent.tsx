// This component will handle user location
import WeatherComponent from "./WeatherComponent";
import { useUserLocationStore } from "../stores/useUserLocationStore";
import geoPinImage from "../assets/location-outline.svg";
import { useEffect } from "react";
import ToggleUnitDataButton from "./ToggleUnitDataButton";

const UserLocationComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  // Updates the user geolocation
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const getUserPosition = async () => {
    // Success -> get current device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching geolocation", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  /* If device location is not set, ask to set it on refresh */
  if (userPosition.latitude == 59.334591) {
    getUserPosition();
    console.log("Running getUserPosition");
  }

  useEffect(() => {}, []);

  //TODO Om searchterm = '' eller null så inaktivera 'search' knappen
  return (
    <>
      <div className="absolute top-0 left-0 m-2 ">
        <button onClick={() => getUserPosition()} className="w-9 hover:w-10 ">
          <img src={geoPinImage} alt="" />
        </button>
      </div>

      {/* Unit button */}
      <div className=" absolute right-0 top-0 m-2">
        <ToggleUnitDataButton></ToggleUnitDataButton>
      </div>

      {/* Current weather container */}
      <div className=" weatherCards bg-orange-200 justify-center flex-col min-h-96 relative">
        {/* Gets weather based on search or geolocation */}
        <WeatherComponent></WeatherComponent>
      </div>
    </>
  );
};

export default UserLocationComponent;
