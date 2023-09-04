import { useEffect } from 'react';

import { BuildingElevatorsStore } from 'store/buildingElevatorsStore';
import { BuildingData } from 'types/types';
import { findClosestElevator, getAnimationInfo } from 'utils/utils';

export const useBuildingElevatorManager = (
  building: BuildingData,
  onElevatorMove: BuildingElevatorsStore['moveElevator'],
  onElevatorMovementFinish: BuildingElevatorsStore['finishElevatorMovement'],
) => {
  useEffect(() => {
    if (!building.floorsQueue.length) {
      return;
    }

    const [moveToFloor, ...restQueue] = building.floorsQueue;
    const freeElevators = building.elevators.filter(elevator => !elevator.isBusy);
    if (!freeElevators.length) {
      return;
    }

    const closestElevator = findClosestElevator(moveToFloor, freeElevators);
    if (closestElevator) {
      onElevatorMove({
        buildingId: building.buildingId,
        elevatorId: closestElevator.id,
        newQueue: restQueue,
        moveToFloor,
      });
      const { transitionMs } = getAnimationInfo(closestElevator.currentFloor, moveToFloor);

      setTimeout(() => {
        onElevatorMovementFinish({
          buildingId: building.buildingId,
          elevatorId: closestElevator.id,
        });
      }, transitionMs);
    }
  }, [building]);
};
