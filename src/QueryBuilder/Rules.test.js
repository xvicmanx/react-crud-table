import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import Button from '../Button';
import Rules from './Rules';

const renderer = new ShallowRenderer();

describe('Rules', () => {
  const props = {
    queryRules: [
      {
        field: 'name',
        condition: 'EQUALS_TO',
      },
    ],
    renderRule: jest.fn((x) => `${x.field} ... ${x.condition}`),
    onRuleRemoved: jest.fn(),
  };

  it('renders as expected when no props are passed', () => {
    const result = renderer.render(<Rules />);
    expect(result).toMatchSnapshot();
  });

  it('renders as expected with the given props', () => {
    const result = renderer.render(<Rules {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('notifies when a rule is removed', () => {
    const result = create(<Rules {...props} />);

    result.root.findByType(Button).props.onClick();

    expect(props.onRuleRemoved).toHaveBeenCalledTimes(1);
    expect(props.onRuleRemoved).toHaveBeenCalledWith(props.queryRules[0]);
  });
});
