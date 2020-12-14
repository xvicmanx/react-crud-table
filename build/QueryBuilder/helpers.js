"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.inputForType = exports.getDefaultConditionForType = exports.conditionsForType = exports.defaultRuleRender = exports.mapFieldsToOptions = exports.isBoolean = exports.isRuleComplete = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDatetime = _interopRequireDefault(require("react-datetime"));

var _helpers = require("../helpers");

var _Label = _interopRequireDefault(require("../Label"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var styles = {
  label: {
    marginBottom: '5px'
  }
};

var Input = function Input(props) {
  return /*#__PURE__*/_react["default"].createElement("input", props);
};

var isRuleComplete = function isRuleComplete(rule) {
  var condition = rule.condition,
      value = rule.value,
      field = rule.field;
  return condition !== '' && value !== '' && field !== '';
};

exports.isRuleComplete = isRuleComplete;

var isBoolean = function isBoolean(type) {
  return type === 'boolean';
};

exports.isBoolean = isBoolean;

var mapFieldsToOptions = function mapFieldsToOptions(fields) {
  return fields.map(function (x) {
    return {
      text: x.label,
      value: x.value,
      key: x.value
    };
  });
};

exports.mapFieldsToOptions = mapFieldsToOptions;

var defaultRuleRender = function defaultRuleRender(rule) {
  if (isBoolean(rule.type)) {
    return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_Label["default"], {
      style: styles.label
    }, rule.condition), "\xA0", /*#__PURE__*/_react["default"].createElement(_Label["default"], {
      style: styles.label
    }, rule.label));
  }

  return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_Label["default"], {
    style: styles.label
  }, rule.label), "\xA0", /*#__PURE__*/_react["default"].createElement(_Label["default"], {
    style: styles.label
  }, _constants.CONDITIONS_LABEL[rule.condition]), "\xA0", /*#__PURE__*/_react["default"].createElement(_Label["default"], {
    style: styles.label
  }, rule.value));
};

exports.defaultRuleRender = defaultRuleRender;

var conditionsForType = function conditionsForType(type) {
  var result;

  switch (type) {
    case 'number':
    case 'date':
      result = [_constants.CONDITIONS.EQUALS_TO, _constants.CONDITIONS.LESS_THAN, _constants.CONDITIONS.GREATER_THAN, _constants.CONDITIONS.LESS_OR_EQUALS_THAN, _constants.CONDITIONS.GREATER_OR_EQUALS_THAN, _constants.CONDITIONS.IS_NOT_EQUALS_TO, _constants.CONDITIONS.IS_NOT_LESS_THAN, _constants.CONDITIONS.IS_NOT_GREATER_THAN, _constants.CONDITIONS.IS_NOT_LESS_OR_EQUALS_THAN, _constants.CONDITIONS.IS_NOT_GREATER_OR_EQUALS_THAN];
      break;

    case 'boolean':
      result = [_constants.CONDITIONS.IS, _constants.CONDITIONS.IS_NOT];
      break;

    default:
      result = [_constants.CONDITIONS.CONTAINS, _constants.CONDITIONS.EQUALS_TO, _constants.CONDITIONS.BEGINS_WITH, _constants.CONDITIONS.ENDS_WITH, _constants.CONDITIONS.IS_NOT_EQUALS_TO, _constants.CONDITIONS.DOES_NOT_BEGIN_WITH, _constants.CONDITIONS.DOES_NOT_END_WITH, _constants.CONDITIONS.DOES_NOT_CONTAIN];
      break;
  }

  return result.map(function (r) {
    return {
      value: r,
      text: _constants.CONDITIONS_LABEL[r],
      key: r
    };
  });
};

exports.conditionsForType = conditionsForType;

var getDefaultConditionForType = function getDefaultConditionForType(type) {
  switch (type) {
    case 'number':
      return _constants.CONDITIONS.EQUALS_TO;

    case 'date':
      return _constants.CONDITIONS.GREATER_OR_EQUALS_THAN;

    default:
      return _constants.CONDITIONS.CONTAINS;
  }
};

exports.getDefaultConditionForType = getDefaultConditionForType;

var inputForType = function inputForType(type, props) {
  switch (type) {
    case 'number':
      return /*#__PURE__*/_react["default"].createElement(Input, _extends({
        type: "number"
      }, props));

    case 'boolean':
      return /*#__PURE__*/_react["default"].createElement(Input, _extends({}, props, {
        type: "checkbox",
        onClick: function onClick(evt) {
          props.onChange(_objectSpread(_objectSpread({}, evt), {}, {
            currentTarget: _objectSpread(_objectSpread({}, evt.currentTarget), {}, {
              value: evt.currentTarget.checked
            })
          }));
        },
        onChange: _helpers.NO_OP
      }));

    case 'date':
      return /*#__PURE__*/_react["default"].createElement(_reactDatetime["default"], _extends({}, props, {
        className: "ui input",
        dateFormat: "YYYY-MM-DD",
        timeFormat: "hh:mm A",
        onChange: function onChange(data) {
          props.onChange({
            currentTarget: {
              value: data.format('YYYY-MM-DD hh:mm A')
            }
          });
        }
      }));

    default:
      return /*#__PURE__*/_react["default"].createElement(Input, _extends({
        type: "text"
      }, props));
  }
};

exports.inputForType = inputForType;
var _default = {
  defaultRuleRender: defaultRuleRender,
  conditionsForType: conditionsForType,
  getDefaultConditionForType: getDefaultConditionForType,
  inputForType: inputForType,
  mapFieldsToOptions: mapFieldsToOptions,
  isBoolean: isBoolean,
  isRuleComplete: isRuleComplete
};
exports["default"] = _default;