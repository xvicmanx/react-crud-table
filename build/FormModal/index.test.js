"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _ = _interopRequireDefault(require("./"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Form = _interopRequireDefault(require("../Form"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('./helpers');
var renderer = new _shallow["default"]();
describe('FormFormModal', function () {
  var props;
  beforeEach(function () {
    props = {
      trigger: 'Open',
      data: {
        title: 'Test title',
        fields: []
      },
      onVisibilityChange: jest.fn(),
      onSubmit: jest.fn(function () {
        return Promise.resolve({
          success: true
        });
      }),
      shouldReset: false,
      visible: true,
      initialValues: {
        name: 'John'
      }
    };

    _helpers.onSubmitHandler.mockClear().mockImplementation(function (a, b, c) {
      return function (v) {
        a(v);
        c();
      };
    });
  });
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('notifies when opened', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_Modal["default"]).props.onShow();
    expect(props.onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(props.onVisibilityChange).toHaveBeenCalledWith(true);
  });
  it('notifies when opened', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_Modal["default"]).props.onHide();
    expect(props.onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(props.onVisibilityChange).toHaveBeenCalledWith(false);
  });
  it('notifies on Submit', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    var values = {
      name: 'John'
    };
    var payload = {
      setError: jest.fn(),
      resetForm: jest.fn(),
      setSubmitting: jest.fn()
    };
    result.root.findByType(_Form["default"]).props.onSubmit(values, payload);
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith(values);
    expect(props.onVisibilityChange).toHaveBeenCalledTimes(1);
    expect(props.onVisibilityChange).toHaveBeenCalledWith(false);
  });
});