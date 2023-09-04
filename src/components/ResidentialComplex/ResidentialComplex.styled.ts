import { styled } from '@mui/system';

export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(6),
  alignItems: 'flex-end',
  flexWrap: 'wrap',
}));
