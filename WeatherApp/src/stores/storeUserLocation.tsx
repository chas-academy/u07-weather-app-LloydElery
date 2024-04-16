import { create } from "zustand";

type UserLocationStore = {
  latitude: number | null;
  longitude: number | null;
  getUserLocation: () => void;
  updateUserLocation: () => void;
};

export const useUserLocationStore = create<UserLocationStore>((set) => ({
  latitude: null,
  longitude: null,
  getUserLocation() {
    set((state) => ({ latitude: state.latitude }));
    set((state) => ({ longitude: state.longitude }));
  },
  updateUserLocation() {
    set((state) => ({ latitude: state.latitude }));
    set((state) => ({ longitude: state.longitude }));
  },
}));
