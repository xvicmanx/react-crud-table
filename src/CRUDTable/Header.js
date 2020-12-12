// @flow
import * as React from 'react';

import { Table } from './wrappers';
import { chevron } from './helpers';
import { NO_OP } from '../helpers';

export type Props = {
  onClick: Function,
  actionsLabel: number | string | React.Element<any> | Array<any>,
  fields: Array<Object>,
  sort: Object,
};

const Header = (props: Props): React.Element<any> => {
  const { fields, sort, onClick, actionsLabel } = props;

  return (
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
};

Header.defaultProps = {
  fields: ([]: Array<Object>),
  onClick: NO_OP,
  actionsLabel: '',
};

export default Header;
