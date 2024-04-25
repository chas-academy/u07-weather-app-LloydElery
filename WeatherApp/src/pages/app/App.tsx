// Components
import CurrentWeatherComponent from "../../components/CurrentWeatherComponent";
import SearchComponent from "../../components/SearchComponent";
import ForecastComponent from "../../components/ForcastComponent";

// Hooks
import { useUserLocationStore } from "../../stores/useUserLocationStore";

// Styling
import "./App.css";
import backgroundImage from ".../assets/background.svg";
import { useUnitStore } from "../../stores/useUnitStore";

// TODO Användes för att ta emot geo location utanför komponenten
//TODO Add current date in nav
//TODO Add name of location in nav
const logUserLocation = () => {
  const userLocation = useUserLocationStore.getState().userLocation;
  console.log("UserLocation", userLocation);
};

function App() {
  logUserLocation();

  const unitData = useUnitStore((state: any) => state.unitData);

  return (
    <>
      <div>
        <p>Test: {unitData === "imperial" ? "°C" : "°F"}</p>
      </div>
      {/* Main container */}
      <div className="flex flex-col bg-cover shadow-lg rounde h-full m-2">
        <SearchComponent></SearchComponent>
        {/* Current weather Card */}

        <CurrentWeatherComponent></CurrentWeatherComponent>

        <ForecastComponent></ForecastComponent>
      </div>
    </>
  );
}

export default App;
