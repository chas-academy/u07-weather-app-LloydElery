import { useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

const Navbar = () => {
  const [weather, setWeather]: any = useState(null);

  return (
    <>
      <div className="flex flex-col justify-center content-center flex-wrap">
        <h1 className="text-xl">World Wide Weather</h1>
      </div>
      {weather && (
        <div className="flex flex-col justify-center content-center flex-wrap">
          <h1 className="text-xl">{weather[0].name}</h1>
        </div>
      )}
    </>
  );
};

export default Navbar;
