import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import { Table } from './wrappers';
import Header from './Header';

const renderer = new ShallowRenderer();

describe('Header', () => {
  let props;

  beforeEach(() => {
    props = {
      trigger: 'Open',
      title: 'Test title',
      onClick: jest.fn(),
      actionsLabel: 'Act',
      fields: [
        {
          name: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          name: 'age',
          label: 'Age',
          sortable: false,
        },
      ],
      sort: {
        field: 'name',
        direction: 'ascending',
      },
    };
  });

  it('renders as expected with the given props', () => {
    const result = renderer.render(<Header {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('renders as expected with the given props (descending sort)', () => {
    props.sort.direction = 'descending';
    const result = renderer.render(<Header {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('notifies when opened', () => {
    const result = create(<Header {...props} />);

    const cells = result.root.findAllByType(Table.HeaderCell);

    cells[0].props.onClick();
    cells[1].props.onClick();

    expect(props.onClick).toHaveBeenCalledTimes(1);
    expect(props.onClick).toHaveBeenCalledWith('name', 'ascending');
  });
});
