import { create } from 'zustand';

import { BuildingData } from 'types/types';

export interface MoveElevatorStateAction {
  buildingId: number;
  elevatorId: string;
  moveToFloor: number;
  newQueue: number[];
}

export interface FinishElevatorMovementStateAction {
  buildingId: number;
  elevatorId: string;
}

export interface RequestElevatorStateAction {
  buildingId: number;
  floorNumber: number;
}

export interface BuildingElevatorsStore {
  buildingsData: BuildingData[];
  changeBuildingsData: (data: BuildingData[]) => void;
  requestElevator: ({ buildingId, floorNumber }: RequestElevatorStateAction) => void;
  moveElevator: ({
    buildingId,
    elevatorId,
    moveToFloor,
    newQueue,
  }: MoveElevatorStateAction) => void;
  finishElevatorMovement: ({ buildingId, elevatorId }: FinishElevatorMovementStateAction) => void;
}

export const useBuildingElevatorsStore = create<BuildingElevatorsStore>(set => ({
  buildingsData: [],
  changeBuildingsData: buildingsData => {
    set(() => ({ buildingsData }));
  },
  requestElevator: ({ buildingId, floorNumber }) => {
    set(state => ({
      buildingsData: state.buildingsData.map(buildingData => {
        if (buildingData.buildingId === buildingId) {
          return {
            ...buildingData,
            floorsQueue: [...buildingData.floorsQueue, floorNumber],
          };
        }

        return buildingData;
      }),
    }));
  },
  moveElevator: ({ buildingId, elevatorId, moveToFloor, newQueue }) => {
    set(state => ({
      buildingsData: state.buildingsData.map(buildingData => {
        if (buildingData.buildingId === buildingId) {
          return {
            ...buildingData,
            floorsQueue: newQueue,
            elevators: buildingData.elevators.map(elevator => {
              if (elevator.id === elevatorId) {
                return { ...elevator, isBusy: true, moveToFloor };
              }

              return elevator;
            }),
          };
        }

        return buildingData;
      }),
    }));
  },
  finishElevatorMovement: ({ buildingId, elevatorId }) => {
    set(state => ({
      buildingsData: state.buildingsData.map(buildingData => {
        if (buildingData.buildingId === buildingId) {
          return {
            ...buildingData,
            elevators: buildingData.elevators.map(elevator => {
              if (elevator.id === elevatorId) {
                return {
                  ...elevator,
                  isBusy: false,
                  currentFloor: elevator.moveToFloor!,
                  moveToFloor: undefined,
                };
              }

              return elevator;
            }),
          };
        }

        return buildingData;
      }),
    }));
  },
}));
