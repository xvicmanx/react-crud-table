"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteForm = exports.UpdateForm = exports.CreateForm = exports.Field = exports.Fields = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _CRUDTable = require("./CRUDTable");

var _CRUDTable2 = _interopRequireDefault(_CRUDTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fields = exports.Fields = _CRUDTable.Fields;
var Field = exports.Field = _CRUDTable.Field;
var CreateForm = exports.CreateForm = _CRUDTable.CreateForm;
var UpdateForm = exports.UpdateForm = _CRUDTable.UpdateForm;
var DeleteForm = exports.DeleteForm = _CRUDTable.DeleteForm;

exports.default = _CRUDTable2.default;