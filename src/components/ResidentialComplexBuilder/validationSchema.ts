import * as yup from 'yup';

export const Schema = yup
  .object({
    buildingsCount: yup
      .number()
      .typeError('Number of buildings should be a number')
      .required()
      .min(1)
      .max(10),
    buildingsData: yup
      .array()
      .required()
      .of(
        yup.object({
          floors: yup
            .number()
            .typeError('Number of floors should be a number')
            .required()
            .min(2)
            .max(20),
          elevators: yup
            .number()
            .typeError('Number of elevators should be a number')
            .required()
            .min(1)
            .max(4),
        }),
      ),
  })
  .required();
