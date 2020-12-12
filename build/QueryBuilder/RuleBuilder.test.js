"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _Button = _interopRequireDefault(require("../Button"));

var _Select = _interopRequireDefault(require("./Select"));

var _RuleBuilder = _interopRequireDefault(require("./RuleBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = new _shallow["default"]();
describe('RuleBuilder', function () {
  var props;
  beforeEach(function () {
    props = {
      fields: [{
        name: 'name',
        type: 'text',
        text: 'Name',
        value: 'name'
      }, {
        name: 'active',
        type: 'boolean',
        text: 'Active',
        value: 'active'
      }, {
        name: 'age',
        text: 'Age',
        type: 'number',
        value: 'age'
      }],
      conditionsSelectPlaceholder: 'Select cond',
      fieldsSelectPlaceholder: 'Select f',
      onSave: jest.fn()
    };
  });
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_RuleBuilder["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('can select a text field condition', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_RuleBuilder["default"], props));
    var selects = result.root.findAllByType(_Select["default"]);
    selects[0].props.onChange({
      currentTarget: {
        value: 'name'
      }
    });
    selects[1].props.onChange({
      currentTarget: {
        value: 'CONTAINS'
      }
    });
    result.root.findByType(_Button["default"]).props.onClick();
    result.root.findByType('input').props.onChange({
      currentTarget: {
        value: 'Foo'
      }
    });
    result.root.findByType(_Button["default"]).props.onClick();
    expect(props.onSave).toHaveBeenCalledTimes(1);
    expect(props.onSave).toHaveBeenCalledWith({
      collection: '',
      condition: 'CONTAINS',
      field: 'name',
      label: '',
      type: 'text',
      value: 'Foo'
    });
  });
  it('can select a number field condition', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_RuleBuilder["default"], props));
    var selects = result.root.findAllByType(_Select["default"]);
    selects[0].props.onChange({
      currentTarget: {
        value: 'age'
      }
    });
    selects[1].props.onChange({
      currentTarget: {
        value: 'EQUALS_TO'
      }
    });
    result.root.findByType('input').props.onChange({
      currentTarget: {
        value: 20
      }
    });
    result.root.findByType(_Button["default"]).props.onClick();
    expect(props.onSave).toHaveBeenCalledTimes(1);
    expect(props.onSave).toHaveBeenCalledWith({
      collection: '',
      condition: 'EQUALS_TO',
      field: 'age',
      label: '',
      type: 'number',
      value: 20
    });
  });
  it('can select a boolean field condition', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_RuleBuilder["default"], props));
    var selects = result.root.findAllByType(_Select["default"]);
    selects[0].props.onChange({
      currentTarget: {
        value: 'active'
      }
    });
    result.root.findByType('input').props.onClick({
      currentTarget: {
        checked: true
      }
    });
    result.root.findByType(_Button["default"]).props.onClick();
    expect(props.onSave).toHaveBeenCalledTimes(1);
    expect(props.onSave).toHaveBeenCalledWith({
      collection: '',
      condition: 'IS',
      field: 'active',
      label: '',
      type: 'boolean',
      value: true
    });
  });
});