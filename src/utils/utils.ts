import { ELEVATOR_ONE_FLOOR_SPEED_IN_MS, FLOOR_HEIGHT } from 'constants/constants';
import { ElevatorData } from 'types/types';

export const arrayRange = (
  start: number,
  stop: number,
  step: number = 1,
  reverse: boolean = false,
) => {
  const range = Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

  if (reverse) {
    return range.reverse();
  }
  return range;
};

export const findClosestElevator = (goal: number, elevators: ElevatorData[]) => {
  return elevators.reduce((prev, curr) => {
    return Math.abs(curr?.currentFloor - goal) < Math.abs(prev?.currentFloor - goal) ? curr : prev;
  });
};

export const getAnimationInfo = (currentFloor: number, moveToFloor: number) => {
  const movementFloors = Math.abs(currentFloor - moveToFloor);
  const movementInPx = movementFloors * FLOOR_HEIGHT;
  const translateY = currentFloor > moveToFloor ? movementInPx : -movementInPx;
  const transitionMs = movementFloors * ELEVATOR_ONE_FLOOR_SPEED_IN_MS;

  return { translateY, transitionMs };
};
