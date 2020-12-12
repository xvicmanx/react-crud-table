"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _helpers = require("./helpers");

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

var _helpers2 = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Body = function Body(props) {
  var fields = props.fields,
      items = props.items,
      onDeleteClick = props.onDeleteClick,
      onUpdateClick = props.onUpdateClick,
      actionsLabel = props.actionsLabel,
      updateTrigger = props.updateTrigger,
      deleteTrigger = props.deleteTrigger;
  return /*#__PURE__*/_react["default"].createElement(_wrappers.Table.Body, null, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_wrappers.Table.Row, {
      key: item.id
    }, fields.map(function (field) {
      return /*#__PURE__*/_react["default"].createElement(_wrappers.Table.Cell, {
        key: field.name
      }, /*#__PURE__*/_react["default"].createElement(_wrappers.Table.CellLabel, null, field.label), (0, _helpers.getTableFieldValue)(field, item));
    }), (updateTrigger || deleteTrigger) && /*#__PURE__*/_react["default"].createElement(_wrappers.Table.Cell, null, /*#__PURE__*/_react["default"].createElement(_wrappers.Table.CellLabel, null, actionsLabel), updateTrigger && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      modifiers: "primary",
      onClick: function onClick() {
        onUpdateClick(item);
      }
    }, updateTrigger), ' ', deleteTrigger && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      modifiers: "negative",
      onClick: function onClick() {
        onDeleteClick(item);
      }
    }, deleteTrigger)));
  }));
};

Body.defaultProps = {
  fields: [],
  items: [],
  actionsLabel: '',
  onDeleteClick: _helpers2.NO_OP,
  onUpdateClick: _helpers2.NO_OP,
  updateTrigger: null,
  deleteTrigger: null
};
var _default = Body;
exports["default"] = _default;