// Components
import CurrentWeatherComponent from "../../components/CurrentWeatherComponent";
import SearchComponent from "../../components/SearchComponent";
import ForcastComponent from "../../components/ForcastComponent";

// Styling
import "./App.css";

// Hooks
import { useState } from "react";
import { useUserLocationStore } from "../../stores/storeUserLocation";

// Other
import axios from "axios";

const logUserLocation = () => {
  const userLocation = useUserLocationStore.getState().updateUserLocation;
  console.log("UserLocation", userLocation);
};

function App() {
  const userLocation = useUserLocationStore((state) => {
    state.latitude, state.longitude;
  });

  const [userPosition, setUserPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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

  const [data, setData]: any = useState({});

  const APPKEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org`;

  const geoUrl = `${url}/data/2.5/weather?lat=${userPosition?.latitude}&lon=${userPosition?.longitude}&appid=${APPKEY}`;

  const weak = [
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Gets geo location and weather-information about the location
  const myLocation = () => {
    getUserPosition();
    axios.get(geoUrl).then((response) => {
      setData(response.data);
      let data = response.data;
      console.log(data);
      console.log(data.weather);
      console.log(data.weather[0].main); // Group of weather parameters (Rain, Snow, Clouds etc.)
      console.log(data.weather[0].description); // Weather condition within the group.
      console.log(data.main.temp);
    });
  };

  return (
    <>
      <button onClick={myLocation}>Set your location</button>
      {/* Main container */}
      <div className="flex flex-col border-2 border-black h-screen m-2">
        {/* Header container */}
        <div className="border-2 m-2 w-auto border-black flex min-h-96 text-lg justify-evenly content-center items-center">
          {/* Image container */}
          <div className="border-2 border-black w-10 h-10">
            <img
              className="w-full h-full content-center items-center"
              src=""
              alt=""
            />
          </div>
          {/* Location Name container */}
          <div>
            <h2 className="w-full h-full content-center items-center">
              {data.name}
            </h2>
          </div>
          {/* Current Temp container */}
          <div className="border-2 border-black w-10 h-10">
            <strong className="w-full h-full content-center items-center">
              30c
            </strong>
          </div>
        </div>
        <SearchComponent></SearchComponent>
        <div>
          {weak.map((day: string) => (
            <>
              {/* Tomorrow container */}
              <div className="border-2 m-2 w-auto border-black flex h-28 text-lg justify-evenly content-center items-center">
                {/* Day container */}
                <div>
                  <h3 key={day}>{day}</h3>
                </div>
                {/* Image container */}
                <div className="border-2 border-black w-10 h-10">
                  <img
                    className="w-full h-full content-center items-center"
                    src=""
                    alt=""
                  />
                </div>

                {/* Min-Max temp container */}
                <div>
                  <strong className="w-full h-full content-center items-center">
                    20c - 30c
                  </strong>
                </div>
                {/* Medium Temp container */}
                <div className="flex border-2 border-black w-10 h-10 ">
                  <strong className="w-full h-full content-center items-center">
                    25c
                  </strong>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
