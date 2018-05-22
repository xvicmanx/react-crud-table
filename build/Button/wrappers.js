'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Btn = undefined;

var _bemReactComponentCreator = require('bem-react-component-creator');

var _bemReactComponentCreator2 = _interopRequireDefault(_bemReactComponentCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _bcc = (0, _bemReactComponentCreator2.default)('crud-button'),
    block = _bcc.block,
    element = _bcc.element;

var Btn = exports.Btn = block('button');

exports.default = {
  Btn: Btn
};