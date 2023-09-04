import React, { type FC } from 'react';
import { Container, Typography } from '@mui/material';

import { ResidentialComplex } from 'components/ResidentialComplex/ResidentialComplex';
import { ResidentialComplexBuilder } from 'components/ResidentialComplexBuilder/ResidentialComplexBuilder';

const App: FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography mt={3} mb={1} align="center" variant="h5" component="h1">
        Residential Complex
      </Typography>
      <ResidentialComplexBuilder />
      <ResidentialComplex />
    </Container>
  );
};

export default App;
