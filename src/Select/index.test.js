import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import Select from '.';

const renderer = new ShallowRenderer();

describe('Select', () => {
  const props = {
    options: [
      {
        key: 1,
        value: 1,
        text: 'First',
      },
      {
        key: 2,
        value: 2,
        text: 'Second',
      },
    ],
    value: 1,
    placeholder: 'Select please',
    onChange: jest.fn(),
  };

  it('renders as expected with the given props', () => {
    const result = renderer.render(<Select {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('notifies on change', () => {
    const result = create(<Select {...props} />);

    result.root.findByType('select').props.onChange(2);

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(2);
  });
});
