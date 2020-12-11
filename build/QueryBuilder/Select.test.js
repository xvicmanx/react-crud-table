"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _Select = _interopRequireDefault(require("./Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = new _shallow["default"]();
describe('Select', function () {
  var props = {
    options: [{
      key: 1,
      value: 1,
      text: 'First'
    }, {
      key: 2,
      value: 2,
      text: 'Second'
    }],
    value: 1,
    placeholder: 'Select please',
    onChange: jest.fn()
  };
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_Select["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('notifies on change', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_Select["default"], props));
    result.root.findByType('select').props.onChange(2);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(2);
  });
});