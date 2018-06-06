import React from "react";
import { Table } from "./wrappers";
import { chevron } from './helpers';

const Header = ({ fields, sort, onClick, forms, actionsLabel }) => {
  return (
    <Table.Header>
      <Table.Row>
        {fields.map(field => {
          return (
            <Table.HeaderCell
              onClick={() => {
                if (field.sortable) {
                  onClick(field.name, sort.direction);
                }
              }}
            >
             {field.label} {sort.field === field.name && chevron(sort.direction)}
            </Table.HeaderCell>
          );
        })}
        {(forms.delete || forms.update) && (
          <Table.HeaderCell>
            {actionsLabel}
          </Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
  );
};

export default Header;

