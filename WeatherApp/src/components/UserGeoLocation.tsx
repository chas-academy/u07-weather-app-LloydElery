import { useUserLocationStore } from "../stores/storeUserLocation";

const UserGeoLocation = () => {
  const userLocation = useUserLocationStore((state) => {
    state.latitude, state.longitude;
  });

  return;
};
