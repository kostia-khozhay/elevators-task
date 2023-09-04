import { renderHook } from '@testing-library/react';

import { BuildingData } from 'types/types';

import { useBuildingElevatorManager } from './useBuildingElevatorManager';

jest.useFakeTimers();

describe('useBuildingElevatorManager', () => {
  const onElevatorMove = jest.fn().mockName('onElevatorMove');
  const onElevatorMoveFinish = jest.fn().mockName('onElevatorMove');

  beforeEach(() => {
    onElevatorMove.mockClear();
    onElevatorMoveFinish.mockClear();
  });

  it('should run the closest free elevator', () => {
    const building: BuildingData = {
      buildingId: 1,
      elevators: [
        { id: '111', isBusy: false, currentFloor: 1 },
        { id: '222', isBusy: false, currentFloor: 2 },
      ],
      floorsCount: 3,
      floorsQueue: [3, 2],
    };

    renderHook(() => useBuildingElevatorManager(building, onElevatorMove, onElevatorMoveFinish));

    expect(onElevatorMove).toBeCalledWith({
      buildingId: 1,
      elevatorId: '222',
      moveToFloor: 3,
      newQueue: [2],
    });

    expect(onElevatorMoveFinish).not.toBeCalled();
    jest.runAllTimers();

    expect(onElevatorMoveFinish).toBeCalledWith({ buildingId: 1, elevatorId: '222' });
  });

  it('should not move the elevator if all are bysy', () => {
    const building: BuildingData = {
      buildingId: 1,
      elevators: [
        { id: '111', isBusy: true, currentFloor: 1 },
        { id: '222', isBusy: true, currentFloor: 2 },
      ],
      floorsCount: 3,
      floorsQueue: [3],
    };

    renderHook(() => useBuildingElevatorManager(building, onElevatorMove, onElevatorMoveFinish));

    expect(onElevatorMove).not.toBeCalled();
    expect(onElevatorMoveFinish).not.toBeCalled();
  });
});
