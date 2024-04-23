// This component will handle user location
import WeatherComponent from "./WeatherComponent";

import { useUserLocationStore } from "../stores/useUserLocationStore";

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
          console.log(position.coords);
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

  return (
    <>
      {/* Gets weather based on search or geolocation */}
      <WeatherComponent></WeatherComponent>
    </>
  );
};

export default UserLocationComponent;
