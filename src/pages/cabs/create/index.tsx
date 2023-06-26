import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCab } from 'apiSdk/cabs';
import { Error } from 'components/error';
import { cabValidationSchema } from 'validationSchema/cabs';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { CabInterface } from 'interfaces/cab';

function CabCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CabInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCab(values);
      resetForm();
      router.push('/cabs');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CabInterface>({
    initialValues: {
      make: '',
      model: '',
      license_plate: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: cabValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Cab
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="make" mb="4" isInvalid={!!formik.errors?.make}>
            <FormLabel>Make</FormLabel>
            <Input type="text" name="make" value={formik.values?.make} onChange={formik.handleChange} />
            {formik.errors.make && <FormErrorMessage>{formik.errors?.make}</FormErrorMessage>}
          </FormControl>
          <FormControl id="model" mb="4" isInvalid={!!formik.errors?.model}>
            <FormLabel>Model</FormLabel>
            <Input type="text" name="model" value={formik.values?.model} onChange={formik.handleChange} />
            {formik.errors.model && <FormErrorMessage>{formik.errors?.model}</FormErrorMessage>}
          </FormControl>
          <FormControl id="license_plate" mb="4" isInvalid={!!formik.errors?.license_plate}>
            <FormLabel>License Plate</FormLabel>
            <Input
              type="text"
              name="license_plate"
              value={formik.values?.license_plate}
              onChange={formik.handleChange}
            />
            {formik.errors.license_plate && <FormErrorMessage>{formik.errors?.license_plate}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'cab',
  operation: AccessOperationEnum.CREATE,
})(CabCreatePage);
