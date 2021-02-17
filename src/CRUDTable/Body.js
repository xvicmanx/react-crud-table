// @flow

import * as React from 'react';

import { getTableFieldValue, scrollToTop } from './helpers';
import { Table } from './wrappers';
import Button from '../Button';
import { NO_OP } from '../helpers';

export type Props = {
  actionsLabel: number | string | React.Element<any> | Array<any>,
  updateTrigger: number | string | React.Element<any> | Array<any>,
  deleteTrigger: number | string | React.Element<any> | Array<any>,
  fields: Array<Object>,
  items: Array<Object>,
  onDeleteClick: Function,
  onUpdateClick: Function,
};

const Body = (props: Props): React$Element<any> => {
  const {
    fields,
    items,
    onDeleteClick,
    onUpdateClick,
    actionsLabel,
    updateTrigger,
    deleteTrigger,
  } = props;

  return (
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
                    scrollToTop();
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
                    scrollToTop();
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
};

Body.defaultProps = {
  fields: ([]: Array<Object>),
  items: ([]: Array<Object>),
  actionsLabel: '',
  onDeleteClick: NO_OP,
  onUpdateClick: NO_OP,
  updateTrigger: null,
  deleteTrigger: null,
};

export default Body;
