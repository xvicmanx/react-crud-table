"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _helpers = require("./helpers");

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

var _helpers2 = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Body = function Body(props) {
  var fields = props.fields,
      items = props.items,
      onDeleteClick = props.onDeleteClick,
      onUpdateClick = props.onUpdateClick,
      actionsLabel = props.actionsLabel,
      updateTrigger = props.updateTrigger,
      deleteTrigger = props.deleteTrigger;
  return /*#__PURE__*/React.createElement(_wrappers.Table.Body, null, items.map(function (item) {
    return /*#__PURE__*/React.createElement(_wrappers.Table.Row, {
      key: item.id
    }, fields.map(function (field) {
      return /*#__PURE__*/React.createElement(_wrappers.Table.Cell, {
        key: field.name
      }, /*#__PURE__*/React.createElement(_wrappers.Table.CellLabel, null, field.label), (0, _helpers.getTableFieldValue)(field, item));
    }), (updateTrigger || deleteTrigger) && /*#__PURE__*/React.createElement(_wrappers.Table.Cell, null, /*#__PURE__*/React.createElement(_wrappers.Table.CellLabel, null, actionsLabel), updateTrigger && /*#__PURE__*/React.createElement(_Button["default"], {
      modifiers: "primary",
      onClick: function onClick() {
        onUpdateClick(item);
        (0, _helpers.scrollToTop)();
      }
    }, updateTrigger), ' ', deleteTrigger && /*#__PURE__*/React.createElement(_Button["default"], {
      modifiers: "negative",
      onClick: function onClick() {
        onDeleteClick(item);
        (0, _helpers.scrollToTop)();
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