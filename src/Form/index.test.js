import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import Form from './';

jest.mock('formik', () => ({
  Formik: 'Formik',
}));

jest.mock('./Base', () => ({
  __esModule: true,
  default: 'FormBase',
}));

import { Formik } from 'formik';

const renderer = new ShallowRenderer();

describe('Form', () => {
  let props;

  beforeEach(() => {
    props = {
      data: {
        title: 'Test title',
        fields: [],
      },
      onSubmit: jest.fn(() => Promise.resolve({ success: true })),
      initialValues: { name: 'John' },
    };
  });

  it('renders as expected with the given props', () => {
    const result = renderer.render(<Form {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('notifies on Submit', () => {
    const result = create(<Form {...props} />);

    result.root.findByType(Formik).props.onSubmit();

    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('it renders the internal Form without any issue', () => {
    const result = create(<Form {...props} />);

    result.root.findByType(Formik).props.render({});
  });
});
