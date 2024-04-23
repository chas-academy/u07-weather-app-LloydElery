// Components
import CurrentWeatherComponent from "../../components/CurrentWeatherComponent";
import SearchComponent from "../../components/SearchComponent";
import ForecastComponent from "../../components/ForcastComponent";

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

  return (
    <>
      {/* Main container */}
      <div className="flex flex-col border-2 border-black h-screen m-2">
        {/* Current weather Card */}
        <div className="border-2 m-2 w-auto border-black flex min-h-96 text-lg justify-evenly content-center items-center">
          <CurrentWeatherComponent></CurrentWeatherComponent>
        </div>

        <SearchComponent></SearchComponent>

        <ForecastComponent></ForecastComponent>
      </div>
    </>
  );
}

export default App;
