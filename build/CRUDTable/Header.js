"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _wrappers = require("./wrappers");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Header = function Header(_ref) {
  var fields = _ref.fields,
      sort = _ref.sort,
      _onClick = _ref.onClick,
      actionsLabel = _ref.actionsLabel;
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

Header.propTypes = {
  onClick: _propTypes["default"].func,
  actionsLabel: _propTypes["default"].node,
  fields: _propTypes["default"].instanceOf(Array),
  sort: _propTypes["default"].instanceOf(Array).isRequired
};
Header.defaultProps = {
  fields: [],
  onClick: function onClick() {},
  actionsLabel: ''
};
var _default = Header;
exports["default"] = _default;