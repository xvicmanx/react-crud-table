import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import { Table } from './wrappers';
import Button from '../Button';
import Body from './Body';

const renderer = new ShallowRenderer();

describe('Body', () => {
  let props;
  const items = [
    {
      id: 1,
      name: 'John',
      age: 45,
      description: 'I love my family',
    },
    {
      id: 2,
      name: 'Mary',
      age: 35,
      description: 'Nature is beatiful',
    },
  ];

  beforeEach(() => {
    props = {
      onDeleteClick: jest.fn(),
      onUpdateClick: jest.fn(),
      actionsLabel: 'Act',
      updateTrigger: 'Update',
      deleteTrigger: 'Delete',
      items,
      fields: [
        {
          name: 'id',
          label: 'Id',
        },
        {
          name: 'name',
          label: 'Name',
          tableValueResolver: 'name',
        },
        {
          name: 'age',
          label: 'Age',
          tableValueResolver: (item) => `${item.age} years`,
        },
        {
          name: 'description',
          label: 'Description',
        },
      ],
      sort: {
        field: 'name',
        direction: 'ascending',
      },
    };
  });

  it('renders as expected with the given props', () => {
    const result = renderer.render(<Body {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('notifies when clicking trigger buttons', () => {
    const result = create(<Body {...props} />);

    const buttons = result.root.findAllByType(Button);

    buttons[0].props.onClick();
    buttons[1].props.onClick();

    expect(props.onDeleteClick).toHaveBeenCalledTimes(1);
    expect(props.onDeleteClick).toHaveBeenCalledWith(items[0]);

    expect(props.onUpdateClick).toHaveBeenCalledTimes(1);
    expect(props.onUpdateClick).toHaveBeenCalledWith(items[0]);
  });
});
