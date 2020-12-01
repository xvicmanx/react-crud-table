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
  var queries = _ref.queries,
      onRuleRemoved = _ref.onRuleRemoved,
      renderRule = _ref.renderRule;
  return queries.length > 0 && /*#__PURE__*/_react["default"].createElement("div", null, queries.map(function (rule) {
    var renderer = renderRule || _helpers.defaultRuleRender;
    return /*#__PURE__*/_react["default"].createElement("div", null, renderer(rule), "\xA0\xA0", /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      onClick: function onClick() {
        onRuleRemoved(rule);
      },
      modifiers: "negative,circular"
    }, "X"));
  }), /*#__PURE__*/_react["default"].createElement("br", null));
};

Rules.propTypes = {
  queries: _propTypes["default"].instanceOf(Array).isRequired,
  onRuleRemoved: _propTypes["default"].func.isRequired,
  renderRule: _propTypes["default"].func.isRequired
};
var _default = Rules;
exports["default"] = _default;