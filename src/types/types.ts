export interface ElevatorData {
  id: string;
  isBusy: boolean;
  currentFloor: number;
  moveToFloor?: number;
}

export interface BuildingData {
  buildingId: number;
  elevators: ElevatorData[];
  floorsCount: number;
  floorsQueue: number[];
}
