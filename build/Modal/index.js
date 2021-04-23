"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getDisplay = function getDisplay(visible) {
  return visible ? 'block' : 'none';
};

var Modal = function Modal(props) {
  var children = props.children,
      trigger = props.trigger,
      title = props.title,
      visible = props.visible,
      onHide = props.onHide,
      onShow = props.onShow;
  var style = {
    display: getDisplay(visible)
  };
  return /*#__PURE__*/React.createElement("div", null, trigger && /*#__PURE__*/React.createElement(_Button["default"], {
    modifiers: "positive,modal-trigger",
    onClick: onShow
  }, trigger), /*#__PURE__*/React.createElement(_wrappers.Container, {
    style: style
  }, /*#__PURE__*/React.createElement(_wrappers.Container.BG, {
    onClick: onHide
  }), /*#__PURE__*/React.createElement(_wrappers.Container.Modal, null, /*#__PURE__*/React.createElement(_Button["default"], {
    modifiers: "circular,close",
    onClick: onHide
  }, "X"), title && /*#__PURE__*/React.createElement(_wrappers.Container.Title, null, title), children)));
};

Modal.defaultProps = {
  onHide: _helpers.NO_OP,
  onShow: _helpers.NO_OP,
  title: '',
  children: null,
  trigger: null,
  visible: false
};
var _default = Modal;
exports["default"] = _default;