'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bemReactComponentCreator = require('bem-react-component-creator');

var _bemReactComponentCreator2 = _interopRequireDefault(_bemReactComponentCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _bcc = (0, _bemReactComponentCreator2.default)('crud-table-pagination'),
    block = _bcc.block,
    element = _bcc.element;

var Pagination = exports.Pagination = block('div');

Pagination.Link = element('button', 'link');
Pagination.Prev = element('button', 'previous');
Pagination.Next = element('button', 'next');

exports.default = { Pagination: Pagination };