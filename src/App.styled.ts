import { Typography } from '@mui/material';
import { styled } from '@mui/system';

export const H1 = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
})) as typeof Typography;
