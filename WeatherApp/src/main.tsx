import ReactDOM from "react-dom/client";
import App from "./pages/app/App.tsx";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import UserLocationComponent from "./components/UserLocationComponent.tsx";

/**
 * Routing structure
 *
 * | App (Home)
 *  | NAV?
 *  | Children
 *    | CurrentWeatherComponent
 *      | Children
 *        | WeatherComponent
 *        | UserLocationComponent
 *        | TemperatureComponent
 *        | WeatherDisplayComponent
 *    | SearchComponent
 *    | ForcastComponent
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
          <div>
            <h1>Navbar</h1>
            <p>This is the navbar</p>
          </div>
        </nav>
        <br />
        <Outlet></Outlet>
      </>
    ),

    children: [
      {
        path: "/",
        element: <App></App>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
