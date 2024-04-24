// This COMPONENT will handle location searches from users

import { useEffect, useRef, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

//TODO Why is ´data´ never read?

const SearchComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const [searchterm, setSearchterm]: any = useState(null); // country/city ...q={country}
  const [weather, setWeather]: any = useState(null); // Setter for API fetch requests

  const inputRef = useRef<HTMLInputElement | null>(null);

  const APIKEY = import.meta.env.VITE_API_KEY_SEARCH; // API key for search (geocoding-api)

  const searchLocation = async () => {
    setWeather(null);
    const searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchterm}&limit=1&appid=${APIKEY}`;
    const response = await fetch(searchUrl);
    const result = await response.json();
    setWeather(result);

    setUserPosition({
      latitude: result[0].lat ? result[0].lat : userPosition.latitude,
      longitude: result[0].lon ? result[0].lon : userPosition.longitude,
    });
  };

  const searchInput = () => {
    const userSearch = inputRef.current!.value;
    setSearchterm(userSearch);
  };

  useEffect(() => {
    if (searchterm !== null) {
      searchLocation();
    }
  }, [searchterm]);

  return (
    <>
      {weather && (
        <div className="flex flex-col justify-center content-center flex-wrap">
          <h1 className="text-xl">{weather[0].name}</h1>
        </div>
      )}
      {/* Search container */}
      <div className=" flex content-center justify-center items-center">
        {/* Search input */}
        <div className="relative inline-flex items-center justify-center ">
          <input
            className="primaryButtonSpan m-3 text-white"
            ref={inputRef}
            type="text"
            placeholder="Enter Location"
          />
        </div>
        <div>
          <button className="primaryButton" onClick={() => searchInput()}>
            <span className="primaryButtonSpan">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
