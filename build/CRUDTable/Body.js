"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _wrappers = require("./wrappers");

var _Button = require("../Button");

var _Button2 = _interopRequireDefault(_Button);

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getValue = function getValue(field, item) {
  if (typeof field.tableValueResolver === 'string') {
    return (0, _helpers.queryValue)(item, field.tableValueResolver);
  }

  if (typeof field.tableValueResolver === 'function') {
    return field.tableValueResolver(item);
  }

  return item[field.name];
};

var Body = function Body(_ref) {
  var fields = _ref.fields,
      items = _ref.items,
      forms = _ref.forms,
      onDeleteClick = _ref.onDeleteClick,
      onUpdateClick = _ref.onUpdateClick,
      actionsLabel = _ref.actionsLabel;
  return _react2.default.createElement(
    _wrappers.Table.Body,
    null,
    items.map(function (item) {
      return _react2.default.createElement(
        _wrappers.Table.Row,
        null,
        fields.map(function (field) {
          return _react2.default.createElement(
            _wrappers.Table.Cell,
            null,
            _react2.default.createElement(
              _wrappers.Table.CellLabel,
              null,
              field.label
            ),
            getValue(field, item)
          );
        }),
        (forms.delete || forms.update) && _react2.default.createElement(
          _wrappers.Table.Cell,
          null,
          _react2.default.createElement(
            _wrappers.Table.CellLabel,
            null,
            actionsLabel
          ),
          forms.update && _react2.default.createElement(
            _Button2.default,
            {
              modifiers: "primary",
              onClick: function onClick() {
                onUpdateClick(item);
              }
            },
            forms.update.trigger
          ),
          "\xA0",
          forms.delete && _react2.default.createElement(
            _Button2.default,
            {
              modifiers: "negative",
              onClick: function onClick() {
                onDeleteClick(item);
              }
            },
            forms.delete.trigger
          )
        )
      );
    })
  );
};

exports.default = Body;