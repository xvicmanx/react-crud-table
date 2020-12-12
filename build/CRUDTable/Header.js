"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _wrappers = require("./wrappers");

var _helpers = require("./helpers");

var _helpers2 = require("../helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Header = function Header(props) {
  var fields = props.fields,
      sort = props.sort,
      _onClick = props.onClick,
      actionsLabel = props.actionsLabel;
  return /*#__PURE__*/React.createElement(_wrappers.Table.Header, null, /*#__PURE__*/React.createElement(_wrappers.Table.Row, null, fields.map(function (field) {
    return /*#__PURE__*/React.createElement(_wrappers.Table.HeaderCell, {
      key: field.name,
      onClick: function onClick() {
        if (field.sortable) {
          _onClick(field.name, sort.direction);
        }
      }
    }, field.label, " ", sort.field === field.name && (0, _helpers.chevron)(sort.direction));
  }), actionsLabel && /*#__PURE__*/React.createElement(_wrappers.Table.HeaderCell, null, actionsLabel)));
};

Header.defaultProps = {
  fields: [],
  onClick: _helpers2.NO_OP,
  actionsLabel: ''
};
var _default = Header;
exports["default"] = _default;