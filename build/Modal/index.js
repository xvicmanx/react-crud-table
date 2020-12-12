"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  return /*#__PURE__*/_react["default"].createElement("div", null, trigger && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    modifiers: "positive",
    onClick: onShow
  }, trigger), /*#__PURE__*/_react["default"].createElement(_wrappers.Container, {
    style: style
  }, /*#__PURE__*/_react["default"].createElement(_wrappers.Container.BG, {
    onClick: onHide
  }), /*#__PURE__*/_react["default"].createElement(_wrappers.Container.Modal, null, title && /*#__PURE__*/_react["default"].createElement(_wrappers.Container.Title, null, title), children)));
};

Modal.propTypes = {
  title: _propTypes["default"].string,
  onHide: _propTypes["default"].func,
  onShow: _propTypes["default"].func,
  children: _propTypes["default"].node,
  trigger: _propTypes["default"].node,
  visible: _propTypes["default"].bool
};
Modal.defaultProps = {
  onHide: function onHide() {},
  onShow: function onShow() {},
  title: '',
  children: null,
  trigger: null,
  visible: false
};
var _default = Modal;
exports["default"] = _default;