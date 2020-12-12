"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSubmitHandler = void 0;

var _helpers = require("../CRUDTable/helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var onSubmitHandler = function onSubmitHandler(onSubmit, shouldReset, callback) {
  return function (values, _ref) {
    var setError = _ref.setError,
        resetForm = _ref.resetForm,
        setSubmitting = _ref.setSubmitting;
    var reset = Object.keys(values).reduce(function (result, prop) {
      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, prop, ''));
    }, {});
    var result = onSubmit(values);
    return result.then(function () {
      if (shouldReset) {
        resetForm(reset);
      }

      setSubmitting(false);
      callback();
    })["catch"](function (err) {
      setError((0, _helpers.queryValue)(err, 'message', 'Unexpected error'));
      setSubmitting(false);
    });
  };
};

exports.onSubmitHandler = onSubmitHandler;