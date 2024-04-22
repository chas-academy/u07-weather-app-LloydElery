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
      latitude: null,
      longitude: null,
    },
    updateUserLocation: (updatedLocation: any) =>
      set({ userLocation: updatedLocation }),
  }))
);
