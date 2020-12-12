"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Container = void 0;

var _bemReactComponentCreator = _interopRequireDefault(require("bem-react-component-creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bcc = (0, _bemReactComponentCreator["default"])('crud-modal-wrapper'),
    block = _bcc.block,
    element = _bcc.element;

var Container = block('div');
exports.Container = Container;
Container.displayName = 'Wrapper';
Container.BG = element('div', 'background');
Container.BG.displayName = 'Background';
Container.Modal = element('div', 'modal');
Container.Modal.displayName = 'Modal';
Container.Title = element('h3', 'title');
Container.Title.displayName = 'Title';
var _default = {
  Container: Container
};
exports["default"] = _default;