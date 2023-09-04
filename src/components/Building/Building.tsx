import React, { FC, memo } from 'react';

import { BuildingElevator } from 'components/BuildingElevator/BuildingElevator';
import { useBuildingElevatorManager } from 'hooks/useBuildingElevatorManager';
import { useBuildingElevatorsStore } from 'store/buildingElevatorsStore';
import { BuildingData } from 'types/types';
import { arrayRange } from 'utils/utils';

import { Building as StyledBuilding, Floor, FloorLabel, Queue } from './Building.styled';

interface BuildingProps {
  building: BuildingData;
}

export const Building: FC<BuildingProps> = memo(({ building }) => {
  const requestElevator = useBuildingElevatorsStore(state => state.requestElevator);
  const onElevatorMove = useBuildingElevatorsStore(state => state.moveElevator);
  const onElevatorMovementFinish = useBuildingElevatorsStore(state => state.finishElevatorMovement);

  const handleElevatorRequest = (buildingId: number, floorNumber: number) => {
    requestElevator({ buildingId, floorNumber });
  };

  useBuildingElevatorManager(building, onElevatorMove, onElevatorMovementFinish);

  return (
    <div>
      Building #{building.buildingId}
      {building.floorsQueue.length && <Queue>Queue: ({building.floorsQueue.join(', ')})</Queue>}
      <StyledBuilding>
        {arrayRange(1, building.floorsCount, 1, true).map(floorNumber => (
          <Floor
            key={floorNumber}
            onClick={() => handleElevatorRequest(building.buildingId, floorNumber)}
          >
            <FloorLabel>Floor #{floorNumber}</FloorLabel>
          </Floor>
        ))}
        {building.elevators.map((elevator, index) => (
          <BuildingElevator key={elevator.id} index={index} elevator={elevator} />
        ))}
      </StyledBuilding>
    </div>
  );
});
