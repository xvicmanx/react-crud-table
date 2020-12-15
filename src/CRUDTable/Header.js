// @flow
import * as React from 'react';

import { Table } from './wrappers';
import { chevron, toggleDirection } from './helpers';
import { NO_OP } from '../helpers';
import Select from '../Select';
import { SORT_DIRECTIONS } from './constants';

type Field = {
  name: string,
  label: string,
  sortable?: boolean,
};

type Sort = {
  field: string,
  direction: 'descending' | 'ascending',
};

const mapFieldsToOptions = (fields: Array<Field>) =>
  fields.map((x) => ({
    text: x.label,
    value: x.name,
    key: x.name,
  }));

const sortDirectionsOptions = Object.keys(SORT_DIRECTIONS).map((k) => ({
  text: SORT_DIRECTIONS[k],
  value: SORT_DIRECTIONS[k],
  key: k,
}));

export type Props = {
  onChange: Function,
  actionsLabel: number | string | React.Element<any> | Array<any>,
  fields: Array<Field>,
  sort: Sort,
};

const Header = (props: Props): React.Element<any> => {
  const { fields, sort, onChange, actionsLabel } = props;
  const sortableFields = fields.filter((field) => field.sortable);

  return (
    <Table.Header>
      <Table.Row modifiers="fields">
        {fields.map((field) => (
          <Table.HeaderCell
            key={field.name}
            onClick={() => {
              if (field.sortable) {
                const newDirection = toggleDirection(
                  sort.direction,
                  field.name === sort.field
                );
                onChange(field.name, newDirection);
              }
            }}
          >
            {field.label} {sort.field === field.name && chevron(sort.direction)}
          </Table.HeaderCell>
        ))}
        {actionsLabel && <Table.HeaderCell>{actionsLabel}</Table.HeaderCell>}
      </Table.Row>
      {sortableFields.length > 0 && (
        <Table.Row modifiers="sorter">
          <Table.HeaderCell colSpan={fields.length + +!!actionsLabel}>
            Sort by: <br />
            <Select
              placeholder="Select field"
              options={mapFieldsToOptions(sortableFields)}
              value={sort.field}
              onChange={(evt) => {
                const { value } = evt.currentTarget;
                if (value) {
                  onChange(value, sort.direction);
                }
              }}
            />{' '}
            <Select
              placeholder="Select direction"
              options={sortDirectionsOptions}
              value={sort.direction}
              onChange={(evt) => {
                const { value } = evt.currentTarget;
                if (value) {
                  onChange(sort.field, value);
                }
              }}
            />
          </Table.HeaderCell>
        </Table.Row>
      )}
    </Table.Header>
  );
};

Header.defaultProps = {
  fields: ([]: Array<Object>),
  onChange: NO_OP,
  actionsLabel: '',
};

export default Header;
