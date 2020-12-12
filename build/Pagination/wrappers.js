"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Pagination = void 0;

var _bemReactComponentCreator = _interopRequireDefault(require("bem-react-component-creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bcc = (0, _bemReactComponentCreator["default"])('crud-table-pagination'),
    block = _bcc.block,
    element = _bcc.element;

var Pagination = block('div');
exports.Pagination = Pagination;
Pagination.displayName = 'Pagination';
Pagination.Link = element('button', 'link');
Pagination.Link.displayName = 'PaginationLink';
Pagination.Prev = element('button', 'previous');
Pagination.Prev.displayName = 'PaginationPrev';
Pagination.Next = element('button', 'next');
Pagination.Next.displayName = 'PaginationNext';
var _default = {
  Pagination: Pagination
};
exports["default"] = _default;