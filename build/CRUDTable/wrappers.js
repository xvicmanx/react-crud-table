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
Table.Row = element('tr', 'row');
Table.HeaderCell = element('th', 'header-cell');
Table.Header = element('thead', 'header');
Table.Body = element('tbody', 'body');
Table.Cell = element('td', 'cell');
Table.CellLabel = element('div', 'cell-label');
Table.Caption = element('div', 'caption');
var _default = {
  Table: Table
};
exports["default"] = _default;