import React from "react";
import { Table } from "./wrappers";
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
}

const Body = ({
  fields,
  items,
  forms,
  onDeleteClick,
  onUpdateClick,
}) => (
  <Table.Body>
    {items.map(item => (
      <Table.Row>
        {fields.map(field => (
          <Table.Cell>
            {getValue(field, item)}
          </Table.Cell>
        ))}
        {(forms.delete || forms.update) && (
          <Table.Cell>
            {forms.update && (
              <Button
                modifiers="primary"
                onClick={() => {
                  onUpdateClick(item)
                }}
              >
                {forms.update.trigger}
              </Button>
            )}&nbsp;
            {forms.delete && (
              <Button
               modifiers="negative"
                onClick={() => {
                  onDeleteClick(item)
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

export default Body;
