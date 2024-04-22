// This component will handle user location

import { useUserLocationStore } from "../stores/useUserLocationStore";

const UserLocationComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);

  // Updates the user geolocation
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  console.log(userPosition);

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

  //TODO Hämta url som en prop
  const myLocation = async () => {
    getUserPosition();
    const APIKEY = import.meta.env.VITE_API_KEY_CURRENT;
    console.log(APIKEY);
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

  if (userPosition.latitude == 0) {
    myLocation();
  }
  // FIXME Set the location first to read the component return
  return (
    <>
      <div>
        <button onClick={() => myLocation()}>Set your location</button>
      </div>

      {/* Header container */}
      <div className="border-2 m-2 w-auto border-black flex min-h-96 text-lg justify-evenly content-center items-center">
        {/* Image container */}
        <div className="border-2 border-black w-10 h-10">
          <img
            className="w-full h-full content-center items-center"
            src={userPosition.weather[0].icon}
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

export default UserLocationComponent;
