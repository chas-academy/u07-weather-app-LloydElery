import ReactDOM from "react-dom/client";
import App from "./pages/app/App.tsx";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import UserLocationComponent from "./components/UserLocationComponent.tsx";
import SearchComponent from "./components/SearchComponent.tsx";
import WeatherComponent from "./components/WeatherComponent.tsx";

/**
 * Routing structure
 *
 * | App (Home)
 *  | NAV?
 *  | Children
 *    | CurrentWeatherComponent
 *      | Children
 *        | WeatherComponent
 *        | UserLocationComponent - gets user location
 *        | TemperatureComponent - converts temperature
 *        | WeatherDisplayComponent - img
 *    | SearchComponent
 *    | ForcastComponent - Displays information for the coming days
 *      | Children
 *        | SeasonComponent
 *        | DateComponent
 *        | WeatherComponent
 *        | TemperatureComponent
 *        | WeatherDisplayComponent
 * */

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <nav>
          <div className="flex flex-col justify-center content-center flex-wrap">
            <h1 className="text-xl">World Wide Weather</h1>
          </div>
        </nav>
        <br />
        <Outlet></Outlet>
      </>
    ),

    children: [
      {
        path: "/",
        element: (
          <>
            <App></App>,<Outlet></Outlet>
          </>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
