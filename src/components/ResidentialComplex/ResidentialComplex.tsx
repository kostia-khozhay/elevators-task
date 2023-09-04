import React, { type FC } from 'react';

import { Building } from 'components/Building/Building';
import { useBuildingElevatorsStore } from 'store/buildingElevatorsStore';

import { Root } from './ResidentialComplex.styled';

export const ResidentialComplex: FC = () => {
  const buildingsData = useBuildingElevatorsStore(state => state.buildingsData);

  return (
    <Root>
      {buildingsData.map(building => (
        <Building key={building.buildingId} building={building} />
      ))}
    </Root>
  );
};
