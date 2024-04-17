// This component will handle user location

import { useUserLocationStore } from "../stores/storeUserLocation";

const UserLocationComponent = () => {
  const currentLocationUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
  const userLocation = useUserLocationStore((state) => {
    state.latitude, state.longitude;
  });

  return;
};

export default UserLocationComponent;
