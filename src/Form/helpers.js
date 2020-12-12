// @flow

import React from 'react';
import { queryValue } from '../CRUDTable/helpers';

import { Form } from './wrappers';

export const DEFAULT_VALIDATE = (): Object => ({});

type Payload = {
  touched: Object,
  errors: Object,
  message: ?string,
};

export const generalValidationError = (
  payload: Payload
): boolean | React$Element<any> => {
  const showErrorMessage = Object.keys(payload.errors).reduce(
    (acc, key) => acc || payload.touched[key],
    false
  );
  return (
    showErrorMessage && (
      <Form.ErrorMessage>
        {queryValue(payload, 'message', 'There are some errors')}
      </Form.ErrorMessage>
    )
  );
};
