import React, { type FC, useEffect } from 'react';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { useBuildingElevatorsStore } from 'store/buildingElevatorsStore';
import { useResidentialComplexState } from 'store/residentialComplexStore';
import { arrayRange } from 'utils/utils';

import { BuildingDataContainer } from './ResidentialComplexBuilder.styled';
import { Schema } from './validationSchema';

interface FormType {
  buildingsCount: number;
  buildingsData: BuildingData[];
}

interface BuildingData {
  floors: number;
  elevators: number;
}

export const ResidentialComplexBuilder: FC = () => {
  const changeBuildingsData = useResidentialComplexState(state => state.changeBuildingsData);
  const changeBuildingsCount = useResidentialComplexState(state => state.changeBuildingsCount);
  const changeBuildingElevatorsData = useBuildingElevatorsStore(state => state.changeBuildingsData);

  const {
    control,
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: { buildingsCount: 0, buildingsData: [] },
    resolver: yupResolver(Schema),
  });

  const { fields, replace } = useFieldArray({ name: 'buildingsData', control });
  const watchBuildingsCount = watch('buildingsCount');
  const hasBuildingsCountError = !!errors.buildingsCount?.message;

  useEffect(() => {
    if (!hasBuildingsCountError && watchBuildingsCount) {
      replace(
        new Array(watchBuildingsCount).fill('').map(value => ({ floors: value, elevators: value })),
      );
    }
  }, [hasBuildingsCountError, watchBuildingsCount]);

  const onSubmit: SubmitHandler<FormType> = data => {
    changeBuildingsCount(data.buildingsCount);
    changeBuildingsData(data.buildingsData);
    changeBuildingElevatorsData(
      data.buildingsData.map((data, index) => ({
        buildingId: index + 1,
        elevators: arrayRange(1, data.elevators).map(() => ({
          id: uuidv4(),
          isBusy: false,
          currentFloor: 1,
        })),
        floorsCount: data.floors,
        floorsQueue: [],
      })),
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.buildingsCount?.message}
          helperText={errors.buildingsCount?.message}
          type="number"
          label="Number of buildings"
          variant="outlined"
          {...register('buildingsCount', { valueAsNumber: true })}
        />

        {!hasBuildingsCountError && watchBuildingsCount > 0 && (
          <Typography mt={3} mb={3} align="center" variant="h6" component="h2">
            Buildings configuration:
          </Typography>
        )}

        {!hasBuildingsCountError &&
          fields.map((field, index) => (
            <BuildingDataContainer key={field.id}>
              <div>Building #{index + 1}</div>
              <TextField
                autoFocus={false}
                error={!!errors.buildingsData?.[index]?.floors?.message}
                helperText={errors.buildingsData?.[index]?.floors?.message}
                type="number"
                label="Floors"
                variant="outlined"
                {...register(`buildingsData.${index}.floors`, {
                  valueAsNumber: true,
                })}
              />
              <TextField
                autoFocus={false}
                error={!!errors.buildingsData?.[index]?.elevators?.message}
                helperText={errors.buildingsData?.[index]?.elevators?.message}
                type="number"
                label="Elevators"
                variant="outlined"
                {...register(`buildingsData.${index}.elevators`, {
                  valueAsNumber: true,
                })}
              />
            </BuildingDataContainer>
          ))}

        <Box sx={{ mt: 3 }}>
          <Button type="submit" disabled={!isValid} variant="outlined">
            Apply
          </Button>
        </Box>
      </form>
    </div>
  );
};
