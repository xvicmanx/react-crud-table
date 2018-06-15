"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _formik = require("formik");

var _wrappers = require("./wrappers");

var _Button = require("../Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_VALIDATE = function DEFAULT_VALIDATE() {
  return {};
};

var BasicForm = function BasicForm(_ref) {
  var data = _ref.data,
      onSubmit = _ref.onSubmit,
      initialValues = _ref.initialValues;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_formik.Formik, {
      enableReinitialize: true,
      initialValues: initialValues,
      validate: data.validate || DEFAULT_VALIDATE,
      onSubmit: onSubmit,
      render: function render(_ref2) {
        var errors = _ref2.errors,
            touched = _ref2.touched,
            error = _ref2.error;
        return _react2.default.createElement(
          _wrappers.Form,
          null,
          data.message && _react2.default.createElement(
            _wrappers.Form.Message,
            null,
            data.message
          ),
          error && _react2.default.createElement(
            _wrappers.Form.ErrorMessage,
            null,
            error
          ),
          data.fields.map(function (field) {
            return _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                _wrappers.Form.Label,
                {
                  htmlFor: field.name
                },
                field.label
              ),
              _react2.default.createElement(_formik.Field, {
                name: field.name,
                placeholder: field.placeholder,
                render: field.render
              }),
              errors[field.name] && touched[field.name] && _react2.default.createElement(
                _wrappers.Form.FieldError,
                null,
                errors[field.name]
              )
            );
          }),
          _react2.default.createElement(
            _Button2.default,
            _extends({
              type: "submit",
              modifiers: "positive"
            }, data.submitButtonProps || {}),
            data.submitText
          )
        );
      }
    })
  );
};

BasicForm.defaultProps = {
  initialValues: {},
  data: {
    message: null,
    fields: [],
    submitText: null
  }
};

exports.default = BasicForm;