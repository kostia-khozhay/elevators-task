import ElevatorIcon from '@mui/icons-material/Elevator';
import { styled } from '@mui/system';

import { ELEVATOR_WIDTH, FLOOR_HEIGHT } from 'constants/constants';

export const Root = styled('div')(
  (props: { right: number; bottom: number; transitionMs?: number; translateYInPx?: number }) => ({
    position: 'absolute',
    bottom: props.bottom,
    right: props.right,
    transition: props.transitionMs ? `all ${props.transitionMs}ms ease-in-out` : 'none',
    transform: props.translateYInPx ? `translateY(${props.translateYInPx}px)` : 'none',
  }),
);

export const StyledElevatorIcon = styled(ElevatorIcon)(() => ({
  width: ELEVATOR_WIDTH,
  color: '#1e8ead',
  fontSize: `${FLOOR_HEIGHT / 2}px`,
}));
