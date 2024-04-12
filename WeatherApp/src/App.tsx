import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData]: any = useState({});
  const [location, setlocation] = useState(""); // country/city ...q={country}

  const limit = 1; // number of location in the response &limit={limit}
  const appId = "164e612402e8456b68fbfabfc8c7ff68";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${appId}`;

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
      axios.get(url).then((response) => {
        setData(response.data);
        let data = response.data[0];
        console.log(data);
      });
      setlocation(""); // Removes the searchword from the inputfield
    }
  };

  return (
    <>
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
