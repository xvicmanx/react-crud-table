import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-table');

export const Table = block('table');

Table.displayName = 'Table';

Table.Row = element('tr', 'row');
Table.Row.displayName = 'Row';

Table.HeaderCell = element('th', 'header-cell');
Table.HeaderCell.displayName = 'HeaderCell';

Table.Header = element('thead', 'header');
Table.Header.displayName = 'Header';

Table.Body = element('tbody', 'body');
Table.Body.displayName = 'Body';

Table.Cell = element('td', 'cell');
Table.Cell.displayName = 'Cell';

Table.CellLabel = element('div', 'cell-label');
Table.CellLabel.displayName = 'CellLabel';

Table.Caption = element('div', 'caption');
Table.Caption.displayName = 'Caption';

export default { Table };
