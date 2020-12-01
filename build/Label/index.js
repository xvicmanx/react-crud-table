"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _wrappers = _interopRequireDefault(require("./wrappers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Label = function Label(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_wrappers["default"], null, children);
};

Label.propTypes = {
  children: _propTypes["default"].oneOf([_propTypes["default"].node, _propTypes["default"].arrayOf(_propTypes["default"].node)])
};
var _default = Label;
exports["default"] = _default;