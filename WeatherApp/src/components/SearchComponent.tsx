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
  const [inputValue, setInputValue]: any = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const APIKEY = import.meta.env.VITE_API_KEY_SEARCH; // API key for search (geocoding-api)

  const handleSubmit = () => {
    if (inputValue.length < 0) {
      alert("Search for a location:");
    }
  };

  const searchLocation = async () => {
    handleSubmit();
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
      {/* Search container */}
      <div className=" flex justify-center">
        {/* Search input */}
        <div className=" content-center">
          <input
            className="primaryButtonSpan  text-white"
            ref={inputRef}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Enter Location"
          />
        </div>
        <div>
          <button
            className="primaryButton"
            disabled={inputValue.length === 0}
            onClick={() => searchInput()}
          >
            <span className="primaryButtonSpan">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
