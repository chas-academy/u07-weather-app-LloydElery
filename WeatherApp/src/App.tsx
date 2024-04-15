import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
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
  const [location, setlocation] = useState(""); // country/city ...q={country}
  const position = "";

  const appId = "164e612402e8456b68fbfabfc8c7ff68";
  const url = `https://api.openweathermap.org`;
  const searchUrl = `${url}/geo/1.0/direct?q=${location}&limit=1&appid=${appId}`;
  const geoUrl = `${url}/data/2.5/weather?lat=${userPosition?.latitude}&lon=${userPosition?.longitude}&appid=${appId}`;

  const weak = [
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const searchLocation = (event: any) => {
    if (event.key === "Enter") {
      axios.get(searchUrl).then((response) => {
        setData(response.data);
        let data = response.data[0];
        console.log("searchLocation: " + data);
      });
      setlocation(""); // Removes the searchword from the inputfield
    }
  };

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
        {/* Search container */}
        <div className="flex content-center justify-center items-center">
          {/* Search icon container */}
          <div className="border-2 border-black w-7 h-7">
            {/* Search icon */}
            <img
              className="w-full h-full justify-center content-center"
              src=""
              alt=""
            />
          </div>
          {/* Search input */}
          <input
            className="border-2 border-black"
            value={location}
            onChange={(event) => setlocation(event.target.value)}
            onKeyUp={searchLocation}
            type="text"
            placeholder="Enter Location"
          />
        </div>
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
