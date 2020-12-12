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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FormBase = function FormBase(_ref) {
  var data = _ref.data,
      errors = _ref.errors,
      touched = _ref.touched,
      error = _ref.error;
  return /*#__PURE__*/_react["default"].createElement(_wrappers.Form, null, data.message && /*#__PURE__*/_react["default"].createElement(_wrappers.Form.Message, null, data.message), error && /*#__PURE__*/_react["default"].createElement(_wrappers.Form.ErrorMessage, null, error), (0, _helpers.generalValidationError)({
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
  }), (0, _helpers.generalValidationError)({
    touched: touched,
    errors: errors,
    message: data.generalErrorMessage
  }), /*#__PURE__*/_react["default"].createElement(_Button["default"], _extends({
    type: "submit",
    modifiers: "positive"
  }, data.submitButtonProps), data.submitText));
};

var _default = FormBase;
exports["default"] = _default;