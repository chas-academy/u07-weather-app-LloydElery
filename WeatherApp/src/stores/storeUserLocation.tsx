import { create } from "zustand";

type UserLocationStore = {
  latitude: number | null;
  longitude: number | null;
  updateUserLocation: () => void;
};

export const useUserLocationStore = create<UserLocationStore>((set) => ({
  latitude: null,
  longitude: null,

  updateUserLocation() {
    set((state) => ({ latitude: state.latitude }));
    set((state) => ({ longitude: state.longitude }));
  },
}));
