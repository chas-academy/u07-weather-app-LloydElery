// Components
import CurrentWeatherComponent from "../../components/CurrentWeatherComponent";
import SearchComponent from "../../components/SearchComponent";
import ForecastComponent from "../../components/ForcastComponent";

// Hooks
import { useUserLocationStore } from "../../stores/useUserLocationStore";

// Styling
import "./App.css";
import { useUnitStore } from "../../stores/useUnitStore";

// Användes för att ta emot geo location utanför komponenten
const logUserLocation = () => {
  const userLocation = useUserLocationStore.getState().userLocation;
  console.log("UserLocation", userLocation);
};

function App() {
  logUserLocation();

  const unitData = useUnitStore((state: any) => state.unitData);

  return (
    <>
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
