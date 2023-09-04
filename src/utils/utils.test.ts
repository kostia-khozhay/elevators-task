import { ElevatorData } from 'types/types';

import { arrayRange, findClosestElevator } from './utils';

describe('utils', () => {
  describe('arrayRange', () => {
    it('should generate an array with a range of numbers', () => {
      expect(arrayRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should generate an array with a reversed range of numbers when "reverse" is true', () => {
      expect(arrayRange(1, 5, 1, true)).toEqual([5, 4, 3, 2, 1]);
    });

    it('should generate an array with a range of numbers with a specified step', () => {
      expect(arrayRange(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
    });
  });

  describe('findClosestElevator', () => {
    const elevatorIn2Floor: ElevatorData = {
      id: 'elevatorIn2Floor',
      isBusy: false,
      currentFloor: 2,
    };

    const elevatorIn5Floor: ElevatorData = {
      id: 'elevatorIn5Floor',
      isBusy: false,
      currentFloor: 5,
    };

    const elevatorIn8Floor: ElevatorData = {
      id: 'elevatorIn8Floor',
      isBusy: false,
      currentFloor: 8,
    };

    const elevators: ElevatorData[] = [elevatorIn5Floor, elevatorIn8Floor, elevatorIn2Floor];

    it('should return the closest elevator when there is only one elevator', () => {
      const goalFloor = 3;
      const closestElevator = findClosestElevator(goalFloor, [elevatorIn5Floor]);

      expect(closestElevator).toBe(elevatorIn5Floor);
    });

    it('should return the closest elevator among multiple elevators', () => {
      const goalFloor = 6;
      const closestElevator = findClosestElevator(goalFloor, elevators);

      expect(closestElevator).toBe(elevatorIn5Floor);
    });
  });
});
