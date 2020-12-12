"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var renderer = new _shallow["default"]();
describe('Modal', function () {
  var props = {
    trigger: 'Open',
    title: 'Test title',
    onShow: jest.fn(),
    onHide: jest.fn(),
    visible: true
  };
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], _extends({}, props, {
      visible: false
    }), "Test"));
    expect(result).toMatchSnapshot();
  });
  it('notifies when opened', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_Button["default"]).props.onClick();
    expect(props.onShow).toHaveBeenCalledTimes(1);
  });
  it('notifies when closed', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_wrappers.Container.BG).props.onClick();
    expect(props.onHide).toHaveBeenCalledTimes(1);
  });
});