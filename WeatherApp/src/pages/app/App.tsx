// Components
import SearchComponent from "../../components/SearchComponent";
import ForecastComponent from "../../components/ForcastComponent";

// Hooks
import { useUserLocationStore } from "../../stores/useUserLocationStore";

// Styling
import "./App.css";

// Användes för att ta emot geo location utanför komponenten
const logUserLocation = () => {
  const userLocation = useUserLocationStore.getState().userLocation;
  if (userLocation != null) {
  }
};

function App() {
  logUserLocation();

  return (
    <>
      {/* Main container */}
      <div className=" flex flex-col bg-cover shadow-lg rounde h-full m-2">
        <SearchComponent></SearchComponent>
        {/* Current weather Card */}

        <ForecastComponent></ForecastComponent>
      </div>
    </>
  );
}

export default App;

//TODO Add wind speed for 'metric' and 'imperial'
//FIXME Why does the cloudiness change on unitState?
//FIXME Change font color for nav
//FIXME Change background color
