import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import FormBase from './Base';

jest.mock('formik', () => ({
  Field: 'Field',
}));

import { Field } from 'formik';

const renderer = new ShallowRenderer();

describe('Form', () => {
  let props;

  beforeEach(() => {
    props = {
      data: {
        title: 'Test title',
        fields: [
          {
            name: 'name',
            label: 'Label',
            placeholder: 'Write name',
            render: () => 'Name',
            type: 'text',
            readOnly: false,
          },
        ],
        message: 'Hello world',
        generalErrorMessage: 'General error',
        submitButtonProps: { className: 'Cool' },
        submitText: 'Submit',
      },
      onSubmit: jest.fn(() => Promise.resolve({ success: true })),
      initialValues: { name: 'John' },
      touched: { name: true },
      errors: {
        name: 'Invalid name',
      },
      error: 'There is an error',
    };
  });

  it('renders as expected with the given props', () => {
    const result = renderer.render(<FormBase {...props} />);
    expect(result).toMatchSnapshot();
  });
});
