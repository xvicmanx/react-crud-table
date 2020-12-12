"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generalValidationError = exports.DEFAULT_VALIDATE = void 0;

var _react = _interopRequireDefault(require("react"));

var _helpers = require("../CRUDTable/helpers");

var _wrappers = require("./wrappers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULT_VALIDATE = function DEFAULT_VALIDATE() {
  return {};
};

exports.DEFAULT_VALIDATE = DEFAULT_VALIDATE;

var generalValidationError = function generalValidationError(payload) {
  var showErrorMessage = Object.keys(payload.errors).reduce(function (acc, key) {
    return acc || payload.touched[key];
  }, false);
  return showErrorMessage && /*#__PURE__*/_react["default"].createElement(_wrappers.Form.ErrorMessage, null, (0, _helpers.queryValue)(payload, 'message', 'There are some errors'));
};

exports.generalValidationError = generalValidationError;