import ReactDOM from "react-dom/client";
import App from "./pages/app/App.tsx";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import UserGeoLocation from "./components/UserGeoLocation.tsx";

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
          <ul>
            <li>
              <Link to={"location"}>Location</Link>
            </li>
          </ul>
        </nav>
        <br />
        <Outlet></Outlet>
      </>
    ),

    children: [
      {
        path: "location",
        element: <App></App>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
