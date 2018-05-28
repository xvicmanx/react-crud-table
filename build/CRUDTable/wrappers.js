'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bemReactComponentCreator = require('bem-react-component-creator');

var _bemReactComponentCreator2 = _interopRequireDefault(_bemReactComponentCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _bcc = (0, _bemReactComponentCreator2.default)('crud-table'),
    block = _bcc.block,
    element = _bcc.element;

var Table = exports.Table = block('table');

Table.Row = element('tr', 'row');
Table.HeaderCell = element('th', 'header-cell');
Table.Header = element('thead', 'header');
Table.Body = element('tbody', 'body');
Table.Cell = element('td', 'cell');
Table.CellLabel = element('div', 'cell-label');
Table.Caption = element('div', 'caption');

exports.default = { Table: Table };