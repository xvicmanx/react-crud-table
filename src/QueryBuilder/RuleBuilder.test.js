import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import DateTime from 'react-datetime';
import Button from '../Button';
import Select from '../Select';
import RuleBuilder from './RuleBuilder';

const renderer = new ShallowRenderer();

describe('RuleBuilder', () => {
  let props;

  beforeEach(() => {
    props = {
      fields: [
        {
          name: 'name',
          type: 'text',
          text: 'Name',
          value: 'name',
        },
        {
          name: 'active',
          type: 'boolean',
          text: 'Active',
          value: 'active',
        },
        {
          name: 'age',
          text: 'Age',
          type: 'number',
          value: 'age',
        },
        {
          name: 'date',
          text: 'Date',
          type: 'date',
          value: 'date',
        },
      ],
      conditionsSelectPlaceholder: 'Select cond',
      fieldsSelectPlaceholder: 'Select f',
      onSave: jest.fn(),
    };
  });

  it('renders as expected with the given props', () => {
    const result = renderer.render(<RuleBuilder {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('can select a text field condition', () => {
    const result = create(<RuleBuilder {...props} />);

    const selects = result.root.findAllByType(Select);
    selects[0].props.onChange({
      currentTarget: {
        value: 'name',
      },
    });

    selects[1].props.onChange({
      currentTarget: {
        value: 'CONTAINS',
      },
    });

    result.root.findByType(Button).props.onClick();

    result.root.findByType('input').props.onChange({
      currentTarget: {
        value: 'Foo',
      },
    });

    result.root.findByType(Button).props.onClick();

    expect(props.onSave).toHaveBeenCalledTimes(1);
    expect(props.onSave).toHaveBeenCalledWith({
      collection: '',
      condition: 'CONTAINS',
      field: 'name',
      label: '',
      type: 'text',
      value: 'Foo',
    });
  });

  it('can select a number field condition', () => {
    const result = create(<RuleBuilder {...props} />);

    const selects = result.root.findAllByType(Select);
    selects[0].props.onChange({
      currentTarget: {
        value: 'age',
      },
    });

    selects[1].props.onChange({
      currentTarget: {
        value: 'EQUALS_TO',
      },
    });

    result.root.findByType('input').props.onChange({
      currentTarget: {
        value: 20,
      },
    });

    result.root.findByType(Button).props.onClick();

    expect(props.onSave).toHaveBeenCalledTimes(1);
    expect(props.onSave).toHaveBeenCalledWith({
      collection: '',
      condition: 'EQUALS_TO',
      field: 'age',
      label: '',
      type: 'number',
      value: 20,
    });
  });

  it('can select a boolean field condition', () => {
    const result = create(<RuleBuilder {...props} />);

    const selects = result.root.findAllByType(Select);
    selects[0].props.onChange({
      currentTarget: {
        value: 'active',
      },
    });

    result.root.findByType('input').props.onClick({
      currentTarget: {
        checked: true,
      },
    });

    result.root.findByType(Button).props.onClick();

    expect(props.onSave).toHaveBeenCalledTimes(1);
    expect(props.onSave).toHaveBeenCalledWith({
      collection: '',
      condition: 'IS',
      field: 'active',
      label: '',
      type: 'boolean',
      value: true,
    });
  });

  it('can select a date field condition', () => {
    const result = create(<RuleBuilder {...props} />);

    const selects = result.root.findAllByType(Select);
    selects[0].props.onChange({
      currentTarget: {
        value: 'date',
      },
    });

    selects[1].props.onChange({
      currentTarget: {
        value: 'GREATER_OR_EQUALS_THAN',
      },
    });

    result.root.findByType(DateTime).props.onChange({
      format: () => '2018-10-01 10:30',
    });

    result.root.findByType(Button).props.onClick();

    expect(props.onSave).toHaveBeenCalledTimes(1);
    expect(props.onSave).toHaveBeenCalledWith({
      collection: '',
      condition: 'GREATER_OR_EQUALS_THAN',
      field: 'date',
      label: '',
      type: 'date',
      value: '2018-10-01 10:30',
    });
  });
});
