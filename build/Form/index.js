"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _wrappers = require("./wrappers");

var _Button = _interopRequireDefault(require("../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DEFAULT_VALIDATE = function DEFAULT_VALIDATE() {
  return {};
};

var generalValidationError = function generalValidationError(_ref) {
  var touched = _ref.touched,
      errors = _ref.errors,
      message = _ref.message;
  var fieldsTouched = touched || {};
  var showErrorMessage = Object.keys(errors || {}).reduce(function (acc, key) {
    return acc || fieldsTouched[key];
  }, false);
  return showErrorMessage && /*#__PURE__*/_react["default"].createElement(_wrappers.Form.ErrorMessage, null, message || 'There are some errors');
};

var BasicForm = function BasicForm(props) {
  var data = props.data,
      onSubmit = props.onSubmit,
      initialValues = props.initialValues;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
    enableReinitialize: true,
    initialValues: initialValues,
    validate: data.validate || DEFAULT_VALIDATE,
    onSubmit: onSubmit,
    render: function render(_ref2) {
      var errors = _ref2.errors,
          touched = _ref2.touched,
          error = _ref2.error;
      return /*#__PURE__*/_react["default"].createElement(_wrappers.Form, null, data.message && /*#__PURE__*/_react["default"].createElement(_wrappers.Form.Message, null, data.message), error && /*#__PURE__*/_react["default"].createElement(_wrappers.Form.ErrorMessage, null, error), generalValidationError({
        touched: touched,
        errors: errors,
        message: data.generalErrorMessage
      }), data.fields.map(function (field) {
        return /*#__PURE__*/_react["default"].createElement(_wrappers.Form.FieldContainer, {
          key: field.name
        }, /*#__PURE__*/_react["default"].createElement(_wrappers.Form.Label, {
          htmlFor: field.name
        }, field.label), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          name: field.name,
          placeholder: field.placeholder,
          render: field.render,
          type: field.type,
          readOnly: field.readOnly
        }), errors[field.name] && touched[field.name] && /*#__PURE__*/_react["default"].createElement(_wrappers.Form.FieldError, null, errors[field.name]));
      }), generalValidationError({
        touched: touched,
        errors: errors,
        message: data.generalErrorMessage
      }), /*#__PURE__*/_react["default"].createElement(_Button["default"], _extends({
        type: "submit",
        modifiers: "positive"
      }, data.submitButtonProps || {}), data.submitText));
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