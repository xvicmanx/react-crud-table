"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _RuleBuilder = _interopRequireDefault(require("./RuleBuilder"));

var _Rules = _interopRequireDefault(require("./Rules"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = new _shallow["default"]();
describe('QueryBuilder', function () {
  var rule = {
    field: 'name',
    condition: 'EQUALS_TO'
  };
  var props = {
    fields: [{
      name: 'id',
      value: 1
    }],
    queryRules: [rule],
    renderRule: jest.fn(),
    onRuleAdded: jest.fn(),
    onRuleRemoved: jest.fn(),
    onChange: jest.fn()
  };
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('notifies when a rule is saved', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_RuleBuilder["default"]).props.onSave(rule);
    expect(props.onRuleAdded).toHaveBeenCalledTimes(1);
    expect(props.onRuleAdded).toHaveBeenCalledWith(rule);
  });
  it('notifies when a rule is removed', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_Rules["default"]).props.onRuleRemoved(rule);
    expect(props.onRuleRemoved).toHaveBeenCalledTimes(1);
    expect(props.onRuleRemoved).toHaveBeenCalledWith(rule);
  });
});