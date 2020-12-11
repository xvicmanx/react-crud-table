"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _helpers = require("./helpers");

var _Button = _interopRequireDefault(require("../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Rules = function Rules(_ref) {
  var queryRules = _ref.queryRules,
      onRuleRemoved = _ref.onRuleRemoved,
      renderRule = _ref.renderRule;
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

Rules.propTypes = {
  queryRules: _propTypes["default"].instanceOf(Array),
  onRuleRemoved: _propTypes["default"].func,
  renderRule: _propTypes["default"].func
};
Rules.defaultProps = {
  renderRule: _helpers.defaultRuleRender,
  queryRules: [],
  onRuleRemoved: function onRuleRemoved() {}
};
var _default = Rules;
exports["default"] = _default;