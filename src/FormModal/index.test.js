import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import FormModal from './';
import Modal from '../Modal';
import Form from '../Form';

jest.mock('./helpers');

import { onSubmitHandler } from './helpers';

const renderer = new ShallowRenderer();

describe('FormFormModal', () => {
  let props;

  beforeEach(() => {
    props = {
      trigger: 'Open',
      data: {
        title: 'Test title',
        fields: [],
      },
      onVisibilityChange: jest.fn(),
      onSubmit: jest.fn(() => Promise.resolve({ success: true })),
      shouldReset: false,
      visible: true,
      initialValues: { name: 'John' },
    };

    onSubmitHandler.mockClear().mockImplementation((a, b, c) => {
      return (v) => {
        a(v);
        c();
      };
    });
  });

  it('renders as expected with the given props', () => {
    const result = renderer.render(<FormModal {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('notifies when opened', () => {
    const result = create(<FormModal {...props} />);

    result.root.findByType(Modal).props.onShow();
    expect(props.onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(props.onVisibilityChange).toHaveBeenCalledWith(true);
  });

  it('notifies when opened', () => {
    const result = create(<FormModal {...props} />);

    result.root.findByType(Modal).props.onHide();
    expect(props.onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(props.onVisibilityChange).toHaveBeenCalledWith(false);
  });

  it('notifies on Submit', () => {
    const result = create(<FormModal {...props} />);

    const values = { name: 'John' };
    const payload = {
      setError: jest.fn(),
      resetForm: jest.fn(),
      setSubmitting: jest.fn(),
    };

    result.root.findByType(Form).props.onSubmit(values, payload);

    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith(values);
    expect(props.onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(props.onVisibilityChange).toHaveBeenCalledWith(false);
  });
});
