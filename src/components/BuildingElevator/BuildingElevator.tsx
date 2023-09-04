import React, { type FC, memo, useMemo } from 'react';

import { ELEVATOR_WIDTH, FLOOR_HEIGHT } from 'constants/constants';
import { ElevatorData } from 'types/types';
import { getAnimationInfo } from 'utils/utils';

import { Root, StyledElevatorIcon } from './BuildingElevator.styled';

interface BuildingElevatorProps {
  index: number;
  elevator: ElevatorData;
}

export const BuildingElevator: FC<BuildingElevatorProps> = memo(({ elevator, index }) => {
  const { translateY, transitionMs } = useMemo(() => {
    if (!elevator.moveToFloor) {
      return { translateY: undefined, transitionMs: undefined };
    }

    return getAnimationInfo(elevator.currentFloor, elevator.moveToFloor);
  }, [elevator.currentFloor, elevator.moveToFloor]);

  return (
    <Root
      right={index * ELEVATOR_WIDTH}
      translateYInPx={translateY}
      transitionMs={transitionMs}
      bottom={(elevator.currentFloor - 1) * FLOOR_HEIGHT}
    >
      <StyledElevatorIcon />
    </Root>
  );
});
