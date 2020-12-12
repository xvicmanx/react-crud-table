"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Btn = void 0;

var _bemReactComponentCreator = _interopRequireDefault(require("bem-react-component-creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bcc = (0, _bemReactComponentCreator["default"])('crud-button'),
    block = _bcc.block;

var Btn = block('button');
exports.Btn = Btn;
Btn.displayName = 'Button';
var _default = {
  Btn: Btn
};
exports["default"] = _default;