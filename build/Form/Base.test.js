"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _Base = _interopRequireDefault(require("./Base"));

var _formik = require("formik");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('formik', function () {
  return {
    Field: 'Field'
  };
});
var renderer = new _shallow["default"]();
describe('Form', function () {
  var props;
  beforeEach(function () {
    props = {
      data: {
        title: 'Test title',
        fields: [{
          name: 'name',
          label: 'Label',
          placeholder: 'Write name',
          render: function render() {
            return 'Name';
          },
          type: 'text',
          readOnly: false
        }],
        message: 'Hello world',
        generalErrorMessage: 'General error',
        submitButtonProps: {
          className: 'Cool'
        },
        submitText: 'Submit'
      },
      onSubmit: jest.fn(function () {
        return Promise.resolve({
          success: true
        });
      }),
      initialValues: {
        name: 'John'
      },
      touched: {
        name: true
      },
      errors: {
        name: 'Invalid name'
      },
      error: 'There is an error'
    };
  });
  it('renders as expected with the given props', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_Base["default"], props));
    expect(result).toMatchSnapshot();
  });
});