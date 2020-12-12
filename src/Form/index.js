// @flow
import React from 'react';
import { Formik } from 'formik';

import { Form } from './wrappers';
import Button from '../Button';
import { DEFAULT_VALIDATE } from './helpers';
import FormBase from './Base';

export type Props = {
  onSubmit: Function,
  data: Object,
  initialValues: Object,
};

const BasicForm = (props: Props): React$Element<any> => {
  const { data, onSubmit, initialValues } = props;

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={data.validate || DEFAULT_VALIDATE}
        onSubmit={onSubmit}
        render={({ errors, touched, error }) => (
          <FormBase
            data={data}
            errors={errors || {}}
            touched={touched || {}}
            error={error}
          />
        )}
      />
    </div>
  );
};

BasicForm.defaultProps = {
  initialValues: ({}: Object),
  data: {
    message: null,
    fields: ([]: Array<any>),
    submitText: null,
  },
};

export default BasicForm;
