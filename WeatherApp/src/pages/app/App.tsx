// Components
import CurrentWeatherComponent from "../../components/CurrentWeatherComponent";
import SearchComponent from "../../components/SearchComponent";
import ForcastComponent from "../../components/ForcastComponent";

// Hooks
import { useUserLocationStore } from "../../stores/useUserLocationStore";

// Styling
import "./App.css";

// TODO Användes för att ta emot geo location utanför komponenten
const logUserLocation = () => {
  const userLocation = useUserLocationStore.getState().userLocation;
  console.log("UserLocation", userLocation);
};

function App() {
  logUserLocation();

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
      {/* Main container */}
      <div className="flex flex-col border-2 border-black h-screen m-2">
        {/* Current weather Card */}
        <CurrentWeatherComponent></CurrentWeatherComponent>

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
