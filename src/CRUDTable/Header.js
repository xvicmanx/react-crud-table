import React from 'react';
import PropTypes from 'prop-types';

import { Table } from './wrappers';
import { chevron } from './helpers';

const Header = ({
  fields,
  sort,
  onClick,
  forms,
  actionsLabel,
}) => (
  <Table.Header>
    <Table.Row>
      {fields.map((field) => (
        <Table.HeaderCell
          onClick={() => {
            if (field.sortable) {
              onClick(field.name, sort.direction);
            }
          }}
        >
          {field.label}
          {' '}
          {sort.field === field.name && chevron(sort.direction)}
        </Table.HeaderCell>
      ))}
      {(forms.delete || forms.update) && (
      <Table.HeaderCell>
        {actionsLabel}
      </Table.HeaderCell>
      )}
    </Table.Row>
  </Table.Header>
);

Header.propTypes = {
  onClick: PropTypes.func,
  actionsLabel: PropTypes.node,
  forms: PropTypes.instanceOf(Object),
  fields: PropTypes.instanceOf(Array),
  sort: PropTypes.instanceOf(Array).isRequired,
};

Header.defaultProps = {
  fields: [],
  onClick: () => {},
  actionsLabel: '',
  forms: {},
};

export default Header;
