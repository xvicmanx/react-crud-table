"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _wrappers = _interopRequireDefault(require("./wrappers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Label = function Label(props) {
  var children = props.children;
  return /*#__PURE__*/_react["default"].createElement(_wrappers["default"], null, children);
};

var _default = Label;
exports["default"] = _default;