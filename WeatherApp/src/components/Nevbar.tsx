import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

const Navbar = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);

  useEffect(() => {}, [userPosition]);
  return (
    <>
      <div className="flex flex-col justify-center content-center flex-wrap relative top-5">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            World Wide <br />
          </span>{" "}
          <span className="flex justify-center">Weather</span>
        </h1>
      </div>
    </>
  );
};

export default Navbar;
