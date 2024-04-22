// This component will handle user location

import { useUserLocationStore } from "../stores/useUserLocationStore";

const UserLocationComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);

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

  if (userPosition.latitude == 0) {
    getUserPosition();
  }

  // FIXME Set the location first to read the component return
  return <></>;
};

export default UserLocationComponent;
