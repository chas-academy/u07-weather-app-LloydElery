import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Unit {
  unitData: {
    unit: any;
    unitToken: any;
  };
}

const defaultUnit = {
  unit: "metric",
  unitToken: "℃",
};

export const useUnitStore = create<Unit, ["zustand/immer", unknown][]>(
  immer((set) => ({
    unitData: {
      unit: sessionStorage.getItem("unit") || defaultUnit.unit,
      unitToken: sessionStorage.getItem("unitToken") || defaultUnit.unitToken,
    },

    updateUnitValue: (updatedUnitData: any) => {
      set({ unitData: updatedUnitData });
      sessionStorage.setItem("unitData", updatedUnitData);
    },
  }))
);
