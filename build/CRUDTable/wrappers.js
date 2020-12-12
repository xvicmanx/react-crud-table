"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Table = void 0;

var _bemReactComponentCreator = _interopRequireDefault(require("bem-react-component-creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bcc = (0, _bemReactComponentCreator["default"])('crud-table'),
    block = _bcc.block,
    element = _bcc.element;

var Table = block('table');
exports.Table = Table;
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
var _default = {
  Table: Table
};
exports["default"] = _default;