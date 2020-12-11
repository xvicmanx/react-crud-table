"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _Button = _interopRequireDefault(require("../Button"));

var _Rules = _interopRequireDefault(require("./Rules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = new _shallow["default"]();
describe('Rules', function () {
  var props = {
    queryRules: [{
      field: 'name',
      condition: 'EQUALS_TO'
    }],
    renderRule: jest.fn(function (x) {
      return "".concat(x.field, " ... ").concat(x.condition);
    }),
    onRuleRemoved: jest.fn()
  };
  it('renders as expected when no props are passed', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_Rules["default"], null));
    expect(result).toMatchSnapshot();
  });
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_Rules["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('notifies when a rule is removed', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_Rules["default"], props));
    result.root.findByType(_Button["default"]).props.onClick();
    expect(props.onRuleRemoved).toHaveBeenCalledTimes(1);
    expect(props.onRuleRemoved).toHaveBeenCalledWith(props.queryRules[0]);
  });
});