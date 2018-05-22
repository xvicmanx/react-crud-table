import React from "react";
import { Table } from "./wrappers";
import { chevron } from './helpers';

const Header = ({ fields, sort, onClick, forms }) => {
  return (
    <Table.Header>
      <Table.Row>
        {fields.map(field => {
          return (
            <Table.HeaderCell
              onClick={() => {
                onClick(field.name, sort.direction);
              }}
            >
              {sort.field === field.name && chevron(sort.direction)}
              {field.label}
            </Table.HeaderCell>
          );
        })}
        {(forms.delete || forms.update) && (
          <Table.HeaderCell>
            Actions
          </Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
  );
};

export default Header;

