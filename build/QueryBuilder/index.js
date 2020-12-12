"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _RuleBuilder = _interopRequireDefault(require("./RuleBuilder"));

var _Rules = _interopRequireDefault(require("./Rules"));

var _wrappers = require("./wrappers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var QueryBuilder = function QueryBuilder(props) {
  var queryRules = props.queryRules,
      fields = props.fields,
      renderRule = props.renderRule,
      onRuleAdded = props.onRuleAdded,
      onRuleRemoved = props.onRuleRemoved;
  return /*#__PURE__*/_react["default"].createElement(_wrappers.Container, null, /*#__PURE__*/_react["default"].createElement(_RuleBuilder["default"], {
    fields: fields,
    onSave: onRuleAdded,
    fieldsSelectPlaceholder: "Select field",
    conditionsSelectPlaceholder: "Select condition"
  }), /*#__PURE__*/_react["default"].createElement(_Rules["default"], {
    queryRules: queryRules,
    onRuleRemoved: onRuleRemoved,
    renderRule: renderRule
  }));
};

var _default = QueryBuilder;
exports["default"] = _default;