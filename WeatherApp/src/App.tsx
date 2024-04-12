import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const searchterm = ""; // country/city ...q={country}
  const limit = ""; // number of location in the response &limit={limit}
  const zip = ""; // zipcode ...zip?zip={zip}
  const appId = "164e612402e8456b68fbfabfc8c7ff68";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchterm}&limit=${limit}&appid=${appId}`;

  // http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=164e612402e8456b68fbfabfc8c7ff68
  const [count, setCount] = useState(0);

  const weak = [
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <div>
        {weak.map((day: string) => (
          <p>{day}</p>
        ))}
      </div>
      {/* Main container */}
      <div className="flex flex-col border-2 border-black h-screen m-2">
        {/* Header container */}
        <div className="border-2 m-2 w-auto border-black flex h-28 text-lg justify-evenly content-center items-center">
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
              Stockholm
            </h2>
          </div>
          {/* Current Temp container */}
          <div className="border-2 border-black w-10 h-10">
            <strong className="w-full h-full content-center items-center">
              30c
            </strong>
          </div>
        </div>
        {/* Tomorrow container */}
        <div className="border-2 m-2 w-auto border-black flex h-28 text-lg justify-evenly content-center items-center">
          {/* Day container */}
          <div>
            <h3>Friday</h3>
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
        {/* Tomorrow container */}
        <div className="border-2 m-2 w-auto border-black flex h-28 text-lg justify-evenly content-center items-center">
          {/* Day container */}
          <div>
            <h3>Friday</h3>
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
        {/* Tomorrow container */}
        <div className="border-2 m-2 w-auto border-black flex h-28 text-lg justify-evenly content-center items-center">
          {/* Day container */}
          <div>
            <h3>Friday</h3>
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
        {/* Tomorrow container */}
        <div className="border-2 m-2 w-auto border-black flex h-28 text-lg justify-evenly content-center items-center">
          {/* Day container */}
          <div>
            <h3>Friday</h3>
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
      </div>
    </>
  );
}

export default App;
