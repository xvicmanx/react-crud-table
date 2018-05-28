'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleBuilder = exports.Container = undefined;

var _bemReactComponentCreator = require('bem-react-component-creator');

var _bemReactComponentCreator2 = _interopRequireDefault(_bemReactComponentCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _bcc = (0, _bemReactComponentCreator2.default)('crud-table-query-builder'),
    block = _bcc.block,
    element = _bcc.element;

var Container = exports.Container = block('div');
var RuleBuilder = exports.RuleBuilder = element('div', 'search-rule-builder');

exports.default = { Container: Container, RuleBuilder: RuleBuilder };