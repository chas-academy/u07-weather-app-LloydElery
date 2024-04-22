// This STORE will handle location information

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Location {
  userLocation: {
    latitude: number | null;
    longitude: number | null;
  };
}

const userLocationIsNull = {
  latitude: 59.334591,
  longitude: 18.06324,
};

export const useUserLocationStore = create<
  Location,
  ["zustand/immer", unknown][]
>(
  immer((set) => ({
    userLocation: {
      latitude: sessionStorage.getItem("userLatitude")
        ? parseFloat(sessionStorage.getItem("userLatitude")!)
        : userLocationIsNull.latitude,
      longitude: sessionStorage.getItem("userLongitude")
        ? parseFloat(sessionStorage.getItem("userLongitude")!)
        : userLocationIsNull.longitude,
    },
    updateUserLocation: (updatedLocation: any) =>
      set({ userLocation: updatedLocation }),
  }))
);
