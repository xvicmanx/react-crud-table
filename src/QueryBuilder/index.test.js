import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import RuleBuilder from './RuleBuilder';
import Rules from './Rules';
import QueryBuilder from './';

const renderer = new ShallowRenderer();

describe('QueryBuilder', () => {
  const rule = {
    field: 'name',
    condition: 'EQUALS_TO',
  };

  const props = {
    fields: [
      {
        name: 'id',
        value: 1,
      },
    ],
    queryRules: [rule],
    renderRule: jest.fn(),
    onRuleAdded: jest.fn(),
    onRuleRemoved: jest.fn(),
    onChange: jest.fn(),
  };

  it('renders as expected with the given props', () => {
    const result = renderer.render(<QueryBuilder {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('notifies when a rule is saved', () => {
    const result = create(<QueryBuilder {...props} />);

    result.root.findByType(RuleBuilder).props.onSave(rule);

    expect(props.onRuleAdded).toHaveBeenCalledTimes(1);
    expect(props.onRuleAdded).toHaveBeenCalledWith(rule);
  });

  it('notifies when a rule is removed', () => {
    const result = create(<QueryBuilder {...props} />);

    result.root.findByType(Rules).props.onRuleRemoved(rule);

    expect(props.onRuleRemoved).toHaveBeenCalledTimes(1);
    expect(props.onRuleRemoved).toHaveBeenCalledWith(rule);
  });
});
