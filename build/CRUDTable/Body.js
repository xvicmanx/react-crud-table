"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _helpers = require("./helpers");

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Body = function Body(_ref) {
  var fields = _ref.fields,
      items = _ref.items,
      onDeleteClick = _ref.onDeleteClick,
      onUpdateClick = _ref.onUpdateClick,
      actionsLabel = _ref.actionsLabel,
      updateTrigger = _ref.updateTrigger,
      deleteTrigger = _ref.deleteTrigger;
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

Body.propTypes = {
  actionsLabel: _propTypes["default"].node,
  updateTrigger: _propTypes["default"].node,
  deleteTrigger: _propTypes["default"].node,
  fields: _propTypes["default"].instanceOf(Array),
  items: _propTypes["default"].instanceOf(Array),
  onDeleteClick: _propTypes["default"].func,
  onUpdateClick: _propTypes["default"].func
};
Body.defaultProps = {
  fields: [],
  items: [],
  actionsLabel: '',
  onDeleteClick: function onDeleteClick() {},
  onUpdateClick: function onUpdateClick() {},
  updateTrigger: null,
  deleteTrigger: null
};
var _default = Body;
exports["default"] = _default;