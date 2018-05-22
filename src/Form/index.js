import React from "react";
import { Formik, Field } from "formik";
import { Form } from "./wrappers";
import Button from '../Button';

const BasicForm = ({
  data,
  onSubmit,
  initialValues,
}) => (
  <div>
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validate={data.validate}
      onSubmit={onSubmit}
      render={({ errors, touched }) => (
        <Form>
          {data.message && (
            <Form.Message>{data.message}</Form.Message>
          )}
          {data.fields.map(field => (
            <div>
              <Form.Label
                htmlFor={field.name}
              >
                {field.label}
              </Form.Label>
              <Field
                name={field.name}
                placeholder={field.placeholder}
                render={field.render}
              />
              {errors[field.name] &&
                touched[field.name] &&
                (
                  <Form.FieldError>
                    {errors[field.name]}
                  </Form.FieldError>
                )
              }
            </div>
          ))}
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

BasicForm.defaultProps = {
  initialValues: {},

};

export default BasicForm;
