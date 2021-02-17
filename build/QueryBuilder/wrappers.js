"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SearchRules = exports.RuleBuilder = exports.Container = void 0;

var _bemReactComponentCreator = _interopRequireDefault(require("bem-react-component-creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bcc = (0, _bemReactComponentCreator["default"])('crud-table-query-builder'),
    block = _bcc.block,
    element = _bcc.element;

var Container = block('div');
exports.Container = Container;
Container.displayName = 'Container';
var RuleBuilder = element('div', 'search-rule-builder');
exports.RuleBuilder = RuleBuilder;
RuleBuilder.displayName = 'RuleBuilder';
var SearchRules = element('div', 'search-rules');
exports.SearchRules = SearchRules;
SearchRules.displayName = 'SearchRules';
var _default = {
  Container: Container,
  RuleBuilder: RuleBuilder,
  SearchRules: SearchRules
};
exports["default"] = _default;