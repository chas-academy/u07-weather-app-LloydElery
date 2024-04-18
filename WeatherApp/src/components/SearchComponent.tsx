// This COMPONENT will handle location searches from users

import { useEffect, useState } from "react";

//TODO Why is ´data´ never read?

const SearchComponent = () => {
  const [searchterm, setSearchterm] = useState(""); // country/city ...q={country}
  const [data, setData]: any = useState({}); // Setter for API fetch requests
  const APIKEY = import.meta.env.VITE_API_KEY_SEARCH; // API key for search (geocoding-api)

  const searchLocation = async () => {
    if (searchterm) {
      const searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchterm}&limit=1&appid=${APIKEY}`;
      const response = await fetch(searchUrl);
      const result = await response.json();
      console.log(result);
      setData(result);
    } else {
      return <p>Enter a City, Country or State</p>;
    }
    setSearchterm("");
  };

  useEffect(() => {
    searchLocation();
  }, []);

  return (
    <>
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
          value={searchterm}
          onChange={(event) => setSearchterm(event.target.value)}
          type="text"
          placeholder="Enter Location"
        />
        <button onClick={() => searchLocation()}>Search</button>
      </div>
    </>
  );
};

export default SearchComponent;
