import React from 'react';
import PropTypes from 'prop-types';

import { getTableFieldValue } from './helpers';
import { Table } from './wrappers';
import Button from '../Button';

const Body = ({
  fields,
  items,
  onDeleteClick,
  onUpdateClick,
  actionsLabel,
  updateTrigger,
  deleteTrigger,
}) => (
  <Table.Body>
    {items.map((item) => (
      <Table.Row key={item.id}>
        {fields.map((field) => (
          <Table.Cell key={field.name}>
            <Table.CellLabel>{field.label}</Table.CellLabel>
            {getTableFieldValue(field, item)}
          </Table.Cell>
        ))}
        {(updateTrigger || deleteTrigger) && (
          <Table.Cell>
            <Table.CellLabel>{actionsLabel}</Table.CellLabel>
            {updateTrigger && (
              <Button
                modifiers="primary"
                onClick={() => {
                  onUpdateClick(item);
                }}
              >
                {updateTrigger}
              </Button>
            )}{' '}
            {deleteTrigger && (
              <Button
                modifiers="negative"
                onClick={() => {
                  onDeleteClick(item);
                }}
              >
                {deleteTrigger}
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
  updateTrigger: PropTypes.node,
  deleteTrigger: PropTypes.node,
  fields: PropTypes.instanceOf(Array),
  items: PropTypes.instanceOf(Array),
  onDeleteClick: PropTypes.func,
  onUpdateClick: PropTypes.func,
};

Body.defaultProps = {
  fields: [],
  items: [],
  actionsLabel: '',
  onDeleteClick: () => {},
  onUpdateClick: () => {},
  updateTrigger: null,
  deleteTrigger: null,
};

export default Body;
