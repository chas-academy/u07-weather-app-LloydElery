import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";

const Navbar = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);

  useEffect(() => {}, [userPosition]);
  return (
    <>
      <div className=" bg-gradient-to-b from-[#c9cebd] to-[#50723c] bg-opacity-50 flex flex-col justify-center content-center flex-wrap relative top-0 ">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl relative top-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#8895b3] from-[#151e3f]">
            World Wide <br />
          </span>{" "}
          <span className="flex justify-center">Weather</span>
        </h1>
      </div>
    </>
  );
};

export default Navbar;
