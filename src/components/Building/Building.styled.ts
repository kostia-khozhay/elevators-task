import { styled } from '@mui/system';

import { FLOOR_HEIGHT } from 'constants/constants';

export const Building = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 370,
  border: '1px solid #bbbbbb',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  borderRadius: theme.spacing(1),
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
}));

export const Queue = styled('span')(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export const Floor = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: FLOOR_HEIGHT,
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(241,241,241,0.87)',
  '&:nth-of-type(even)': {
    backgroundColor: '#e0e0e0',
  },
  '&:hover': {
    '&:nth-of-type(even)': {
      backgroundColor: 'rgba(187,187,187,0.71)',
    },
    cursor: 'pointer',
    backgroundColor: 'rgba(241,241,241,0.37)',
  },
}));

export const FloorLabel = styled('div')(() => ({
  opacity: 0.3,
}));
