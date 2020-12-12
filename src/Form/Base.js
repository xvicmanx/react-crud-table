// @flow
import React from 'react';
import { Formik, Field } from 'formik';

import { Form } from './wrappers';
import Button from '../Button';

import { DEFAULT_VALIDATE, generalValidationError } from './helpers';

type FieldData = {
  name: string,
  label: string,
  placeholder?: string,
  render?: Function | string,
  type?: string,
  readOnly?: boolean,
};

type FormBaseProps = {
  touched: Object,
  errors: Object,
  data: {
    message?: string,
    generalErrorMessage?: string,
    fields: Array<FieldData>,
    submitButtonProps: Object,
    submitText: string,
  },
  error: ?string,
};

const FormBase = ({
  data,
  errors,
  touched,
  error,
}: FormBaseProps): React$Element<any> => (
  <Form>
    {data.message && <Form.Message>{data.message}</Form.Message>}
    {error && <Form.ErrorMessage>{error}</Form.ErrorMessage>}
    {generalValidationError({
      touched,
      errors,
      message: data.generalErrorMessage,
    })}
    {data.fields.map((field) => (
      <Form.FieldContainer key={field.name}>
        <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
        <Field
          name={field.name}
          placeholder={field.placeholder}
          render={field.render}
          type={field.type}
          readOnly={field.readOnly}
        />
        {errors[field.name] && touched[field.name] && (
          <Form.FieldError>{errors[field.name]}</Form.FieldError>
        )}
      </Form.FieldContainer>
    ))}
    {generalValidationError({
      touched,
      errors,
      message: data.generalErrorMessage,
    })}
    <Button type="submit" modifiers="positive" {...data.submitButtonProps}>
      {data.submitText}
    </Button>
  </Form>
);

export default FormBase;
