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

export const useUserLocationStore = create<
  Location,
  ["zustand/immer", unknown][]
>(
  immer((set) => ({
    userLocation: {
      latitude: 0,
      longitude: 0,
    },
    updateUserLocation: (updatedLocation: any) =>
      set({ userLocation: updatedLocation }),
  }))
);
