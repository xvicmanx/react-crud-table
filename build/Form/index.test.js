"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _ = _interopRequireDefault(require("./"));

var _formik = require("formik");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('formik', function () {
  return {
    Formik: 'Formik'
  };
});
jest.mock('./Base', function () {
  return {
    __esModule: true,
    "default": 'FormBase'
  };
});
var renderer = new _shallow["default"]();
describe('Form', function () {
  var props;
  beforeEach(function () {
    props = {
      data: {
        title: 'Test title',
        fields: []
      },
      onSubmit: jest.fn(function () {
        return Promise.resolve({
          success: true
        });
      }),
      initialValues: {
        name: 'John'
      }
    };
  });
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    expect(result).toMatchSnapshot();
  });
  it('notifies on Submit', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_formik.Formik).props.onSubmit();
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });
  it('it renders the internal Form without any issue', function () {
    var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], props));
    result.root.findByType(_formik.Formik).props.render({});
  });
});