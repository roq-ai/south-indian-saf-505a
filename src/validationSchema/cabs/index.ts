import * as yup from 'yup';

export const cabValidationSchema = yup.object().shape({
  make: yup.string().required(),
  model: yup.string().required(),
  license_plate: yup.string().required(),
  organization_id: yup.string().nullable(),
});
