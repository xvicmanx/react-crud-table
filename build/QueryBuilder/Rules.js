"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _helpers = require("./helpers");

var _Button = _interopRequireDefault(require("../Button"));

var _helpers2 = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Rules = function Rules(props) {
  var queryRules = props.queryRules,
      onRuleRemoved = props.onRuleRemoved,
      renderRule = props.renderRule;
  return /*#__PURE__*/_react["default"].createElement("div", null, queryRules.map(function (rule) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "".concat(rule.field, ":").concat(rule.condition)
    }, renderRule(rule), '  ', /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      onClick: function onClick() {
        onRuleRemoved(rule);
      },
      modifiers: "negative,circular"
    }, "X"));
  }), /*#__PURE__*/_react["default"].createElement("br", null));
};

Rules.defaultProps = {
  renderRule: _helpers.defaultRuleRender,
  queryRules: [],
  onRuleRemoved: _helpers2.NO_OP
};
var _default = Rules;
exports["default"] = _default;