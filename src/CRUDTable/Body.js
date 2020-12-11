import React from 'react';
import PropTypes from 'prop-types';

import { Table } from './wrappers';
import Button from '../Button';
import { queryValue } from './helpers';

const getValue = (field, item) => {
  if (typeof field.tableValueResolver === 'string') {
    return queryValue(item, field.tableValueResolver);
  }

  if (typeof field.tableValueResolver === 'function') {
    return field.tableValueResolver(item);
  }

  return item[field.name];
};

const Body = ({
  fields,
  items,
  forms,
  onDeleteClick,
  onUpdateClick,
  actionsLabel,
}) => (
  <Table.Body>
    {items.map((item) => (
      <Table.Row key={item.id}>
        {fields.map((field) => (
          <Table.Cell key={field.name}>
            <Table.CellLabel>{field.label}</Table.CellLabel>
            {getValue(field, item)}
          </Table.Cell>
        ))}
        {(forms.delete || forms.update) && (
          <Table.Cell>
            <Table.CellLabel>{actionsLabel}</Table.CellLabel>
            {forms.update && (
              <Button
                modifiers="primary"
                onClick={() => {
                  onUpdateClick(item);
                }}
              >
                {forms.update.trigger}
              </Button>
            )}
            {' '}
            {forms.delete && (
            <Button
              modifiers="negative"
              onClick={() => {
                onDeleteClick(item);
              }}
            >
              {forms.delete.trigger}
            </Button>
            )}
          </Table.Cell>
        )}
      </Table.Row>
    ))}
  </Table.Body>
);

Body.propTypes = {
  actionsLabel: PropTypes.node,
  forms: PropTypes.instanceOf(Object),
  fields: PropTypes.instanceOf(Array),
  items: PropTypes.instanceOf(Array),
  onDeleteClick: PropTypes.func,
  onUpdateClick: PropTypes.func,
};

Body.defaultProps = {
  fields: [],
  items: [],
  actionsLabel: '',
  forms: {},
  onDeleteClick: () => {},
  onUpdateClick: () => {},
};

export default Body;
