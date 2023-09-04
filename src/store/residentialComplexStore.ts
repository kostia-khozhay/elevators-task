import { create } from 'zustand';

interface BuildingData {
  floors: number;
  elevators: number;
}

interface ResidentialComplexState {
  buildingsCount: number;
  changeBuildingsCount: (count: number) => void;
  buildingsData: BuildingData[];
  changeBuildingsData: (data: BuildingData[]) => void;
}

export const useResidentialComplexState = create<ResidentialComplexState>(set => ({
  buildingsCount: 0,
  buildingsData: [],
  changeBuildingsCount: buildingsCount => {
    set(() => ({ buildingsCount }));
  },
  changeBuildingsData: buildingsData => {
    set(() => ({ buildingsData }));
  },
}));
