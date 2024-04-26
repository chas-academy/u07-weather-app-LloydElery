import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Unit {
  unitData: any;
}

const defaultUnit = {
  unitData: "metric",
};

export const useUnitStore = create<Unit, ["zustand/immer", unknown][]>(
  immer((set) => ({
    unitData: sessionStorage.getItem("unitData") || defaultUnit,

    updateUnitValue: (updatedUnitData: any) => {
      set({ unitData: updatedUnitData });
      sessionStorage.setItem("unitData", updatedUnitData);
    },
  }))
);
