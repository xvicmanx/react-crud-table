"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _wrappers = require("./wrappers");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var fields = _ref.fields,
      sort = _ref.sort,
      _onClick = _ref.onClick,
      forms = _ref.forms;

  return _react2.default.createElement(
    _wrappers.Table.Header,
    null,
    _react2.default.createElement(
      _wrappers.Table.Row,
      null,
      fields.map(function (field) {
        return _react2.default.createElement(
          _wrappers.Table.HeaderCell,
          {
            onClick: function onClick() {
              _onClick(field.name, sort.direction);
            }
          },
          sort.field === field.name && (0, _helpers.chevron)(sort.direction),
          field.label
        );
      }),
      (forms.delete || forms.update) && _react2.default.createElement(
        _wrappers.Table.HeaderCell,
        null,
        "Actions"
      )
    )
  );
};

exports.default = Header;