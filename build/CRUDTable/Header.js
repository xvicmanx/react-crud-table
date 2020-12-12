"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _wrappers = require("./wrappers");

var _helpers = require("./helpers");

var _helpers2 = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(props) {
  var fields = props.fields,
      sort = props.sort,
      _onClick = props.onClick,
      actionsLabel = props.actionsLabel;
  return /*#__PURE__*/_react["default"].createElement(_wrappers.Table.Header, null, /*#__PURE__*/_react["default"].createElement(_wrappers.Table.Row, null, fields.map(function (field) {
    return /*#__PURE__*/_react["default"].createElement(_wrappers.Table.HeaderCell, {
      key: field.name,
      onClick: function onClick() {
        if (field.sortable) {
          _onClick(field.name, sort.direction);
        }
      }
    }, field.label, " ", sort.field === field.name && (0, _helpers.chevron)(sort.direction));
  }), actionsLabel && /*#__PURE__*/_react["default"].createElement(_wrappers.Table.HeaderCell, null, actionsLabel)));
};

Header.defaultProps = {
  fields: [],
  onClick: _helpers2.NO_OP,
  actionsLabel: ''
};
var _default = Header;
exports["default"] = _default;