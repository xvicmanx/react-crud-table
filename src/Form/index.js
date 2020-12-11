import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Form } from './wrappers';
import Button from '../Button';

const DEFAULT_VALIDATE = () => ({});

const generalValidationError = ({ touched, errors, message }) => {
  const fieldsTouched = touched || {};
  const showErrorMessage = Object.keys(errors || {}).reduce(
    (acc, key) => acc || fieldsTouched[key],
    false
  );
  return (
    showErrorMessage && (
      <Form.ErrorMessage>
        {message || 'There are some errors'}
      </Form.ErrorMessage>
    )
  );
};

const BasicForm = ({ data, onSubmit, initialValues }) => (
  <div>
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validate={data.validate || DEFAULT_VALIDATE}
      onSubmit={onSubmit}
      render={({ errors, touched, error }) => (
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
          <Button
            type="submit"
            modifiers="positive"
            {...(data.submitButtonProps || {})}
          >
            {data.submitText}
          </Button>
        </Form>
      )}
    />
  </div>
);

BasicForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object),
  initialValues: PropTypes.instanceOf(Object),
};

BasicForm.defaultProps = {
  initialValues: {},
  data: {
    message: null,
    fields: [],
    submitText: null,
  },
};

export default BasicForm;
