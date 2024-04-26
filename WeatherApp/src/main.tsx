import ReactDOM from "react-dom/client";
import App from "./pages/app/App.tsx";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import UserLocationComponent from "./components/UserLocationComponent.tsx";
import SearchComponent from "./components/SearchComponent.tsx";
import WeatherComponent from "./components/WeatherComponent.tsx";
import Navbar from "./components/Nevbar.tsx";

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
        <main className="w-full sm:max-w-5xl relative">
          <nav>
            <Navbar></Navbar>
          </nav>
          <br />
          <Outlet></Outlet>
        </main>
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
