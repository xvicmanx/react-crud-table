import React from 'react';
import PropTypes from 'prop-types';

import { Table } from './wrappers';
import { chevron } from './helpers';

const Header = ({ fields, sort, onClick, actionsLabel }) => (
  <Table.Header>
    <Table.Row>
      {fields.map((field) => (
        <Table.HeaderCell
          key={field.name}
          onClick={() => {
            if (field.sortable) {
              onClick(field.name, sort.direction);
            }
          }}
        >
          {field.label} {sort.field === field.name && chevron(sort.direction)}
        </Table.HeaderCell>
      ))}
      {actionsLabel && <Table.HeaderCell>{actionsLabel}</Table.HeaderCell>}
    </Table.Row>
  </Table.Header>
);

Header.propTypes = {
  onClick: PropTypes.func,
  actionsLabel: PropTypes.node,
  fields: PropTypes.instanceOf(Array),
  sort: PropTypes.instanceOf(Array).isRequired,
};

Header.defaultProps = {
  fields: [],
  onClick: () => {},
  actionsLabel: '',
};

export default Header;
