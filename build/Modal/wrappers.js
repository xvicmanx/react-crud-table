'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = undefined;

var _bemReactComponentCreator = require('bem-react-component-creator');

var _bemReactComponentCreator2 = _interopRequireDefault(_bemReactComponentCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _bcc = (0, _bemReactComponentCreator2.default)('crud-modal-wrapper'),
    block = _bcc.block,
    element = _bcc.element;

var Container = exports.Container = block('div');
Container.BG = element('div', 'background');
Container.Modal = element('div', 'modal');
Container.Title = element('h3', 'title');

exports.default = {
  Container: Container
};