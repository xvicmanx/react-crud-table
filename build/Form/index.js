"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

var _helpers = require("./helpers");

var _Base = _interopRequireDefault(require("./Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BasicForm = function BasicForm(props) {
  var data = props.data,
      onSubmit = props.onSubmit,
      initialValues = props.initialValues;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
    enableReinitialize: true,
    initialValues: initialValues,
    validate: data.validate || _helpers.DEFAULT_VALIDATE,
    onSubmit: onSubmit,
    render: function render(_ref) {
      var errors = _ref.errors,
          touched = _ref.touched,
          error = _ref.error;
      return /*#__PURE__*/_react["default"].createElement(_Base["default"], {
        data: data,
        errors: errors || {},
        touched: touched || {},
        error: error
      });
    }
  }));
};

BasicForm.defaultProps = {
  initialValues: {},
  data: {
    message: null,
    fields: [],
    submitText: null
  }
};
var _default = BasicForm;
exports["default"] = _default;